import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuoteForm } from "@/components/quote-form";
import { FORM_ENDPOINT, quoteSchema, sendQuote, SERVICES } from "@/lib/quote";

const common = { name: "Pessoa Teste", email: "teste@example.com", phone: "(11) 99999-9999", message: "Solicitação de teste, sem envio real." };
const video = { product: "Evento", audience: "Convidados", writer: "sim", narrator: "não", cameras: "2", days: "1", location: "externa", animation: "sim", makeup: "não", vision: "Registro do evento com duração total de cinco minutos." };
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("Quote rules", () => {
  it("accepts only the four requested services", () => {
    expect(SERVICES).toEqual(["Vídeo", "Foto", "Conversão de fitas", "Transmissão ao vivo"]);
    expect(quoteSchema.safeParse({ ...common, service: "Som" }).success).toBe(false);
  });
  it.each(["Foto", "Conversão de fitas", "Transmissão ao vivo"])("does not require video fields for %s", (service) => {
    expect(quoteSchema.safeParse({ ...common, service }).success).toBe(true);
  });
  it.each(Object.keys(video))("requires the video field %s for Vídeo", (key) => {
    expect(quoteSchema.safeParse({ ...common, ...video, service: "Vídeo", [key]: "" }).success).toBe(false);
  });
  it("requires common contact fields", () => {
    for (const key of Object.keys(common)) expect(quoteSchema.safeParse({ ...common, service: "Foto", [key]: "" }).success).toBe(false);
  });
  it("rejects malformed email, phone and camera counts", () => {
    expect(quoteSchema.safeParse({ ...common, service: "Foto", email: "invalid" }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...common, service: "Foto", phone: "javascript:alert(1)" }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...common, ...video, service: "Vídeo", cameras: "-1" }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...common, ...video, service: "Vídeo", days: "1.5" }).success).toBe(false);
  });
  it("sends validated fields to the specified FormSubmit owner", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: "true" })));
    await sendQuote({ ...common, ...video, service: "Vídeo" }, fetcher);
    expect(FORM_ENDPOINT).toBe("https://formsubmit.co/ajax/abel@energyproducoes.com.br");
    const call = fetcher.mock.calls[0];
    expect(call?.[0]).toBe(FORM_ENDPOINT);
    const payload = JSON.parse(String(call?.[1]?.body));
    expect(payload["Tipo de serviço"]).toBe("Vídeo");
    expect(payload["Quantas câmeras"]).toBe("2");
    expect(payload["Precisa de roteirista?"]).toBe("sim");
    expect(payload._replyto).toBe(common.email);
    expect(Object.keys(payload).filter((key) => !key.startsWith("_"))).toHaveLength(15);
  });
  it("rejects invalid input before sending externally", async () => {
    const fetcher = vi.fn<typeof fetch>();
    await expect(sendQuote({ ...common, service: "Foto", email: "bad" }, fetcher)).rejects.toThrow();
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("does not treat a rejected response as success", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: "false" })));
    await expect(sendQuote({ ...common, service: "Foto" }, fetcher)).rejects.toThrow();
  });
  it("strips stale video fields when changing service", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: true })));
    await sendQuote({ ...common, ...video, service: "Foto" }, fetcher);
    expect(JSON.parse(String(fetcher.mock.calls[0]?.[1]?.body))["Quantas câmeras"]).toBeUndefined();
  });
});

describe("Quote wizard", () => {
  it("submits a Foto request from service selection to successful API acknowledgement", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: "true" })));
    vi.stubGlobal("fetch", fetcher);
    render(<QuoteForm />);
    fireEvent.click(screen.getByRole("radio", { name: "Foto" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: common.name } });
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: common.email } });
    fireEvent.change(screen.getByLabelText("Telefone/WhatsApp"), { target: { value: common.phone } });
    fireEvent.change(screen.getByLabelText("Mensagem"), { target: { value: common.message } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar orçamento" }));
    await waitFor(() => expect(screen.getByRole("status")).toBeDefined());
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(JSON.parse(String(fetcher.mock.calls[0]?.[1]?.body))["E-mail"]).toBe(common.email);
  });
  it("keeps all video answers across wizard steps and sends them", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: "true" })));
    vi.stubGlobal("fetch", fetcher);
    render(<QuoteForm />);
    fireEvent.click(screen.getByRole("radio", { name: "Vídeo" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    for (const [key, value] of Object.entries(video)) {
      const field = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${key}"]${["writer", "narrator", "location", "animation", "makeup"].includes(key) ? `[value="${value}"]` : ""}`);
      if (!field) throw new Error(`Missing video input: ${key}`);
      if (field.type === "radio") fireEvent.click(field);
      else fireEvent.change(field, { target: { value } });
    }
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    for (const [key, value] of Object.entries(common)) {
      const field = document.querySelector(`[name="${key}"]`);
      if (!field) throw new Error(`Missing contact input: ${key}`);
      fireEvent.change(field, { target: { value } });
    }
    fireEvent.click(screen.getByRole("button", { name: "Enviar orçamento" }));
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    expect(JSON.parse(String(fetcher.mock.calls[0]?.[1]?.body))["Como você imagina o vídeo e qual a duração total"]).toBe(video.vision);
    await waitFor(() => expect(screen.getByRole("status")).toBeDefined());
  });
});