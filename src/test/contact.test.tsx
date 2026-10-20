import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/contact-form";
import { contactSchema, FORM_ENDPOINT } from "@/lib/quote";
import { sendContact } from "@/lib/contact";

const data = { name: "Pessoa Teste", email: "teste@example.com", phone: "(11) 99999-9999", message: "Mensagem de teste, sem envio real." };
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("Contact rules", () => {
  it("requires name, email, phone and message", () => {
    for (const key of Object.keys(data)) expect(contactSchema.safeParse({ ...data, [key]: "" }).success).toBe(false);
  });
  it("rejects malformed email and phone", () => {
    expect(contactSchema.safeParse({ ...data, email: "invalid" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...data, phone: "javascript:alert(1)" }).success).toBe(false);
  });
  it("sends the four fields to the specified FormSubmit owner", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: "true" })));
    await sendContact(data, fetcher);
    expect(FORM_ENDPOINT).toBe("https://formsubmit.co/ajax/abel@energyproducoes.com.br");
    expect(fetcher.mock.calls[0]?.[0]).toBe(FORM_ENDPOINT);
    const payload = JSON.parse(String(fetcher.mock.calls[0]?.[1]?.body));
    expect(payload["Nome"]).toBe(data.name);
    expect(payload["E-mail"]).toBe(data.email);
    expect(payload["Telefone/WhatsApp"]).toBe(data.phone);
    expect(payload["Mensagem"]).toBe(data.message);
    expect(payload._replyto).toBe(data.email);
    expect(Object.keys(payload).filter((key) => !key.startsWith("_"))).toHaveLength(4);
  });
  it("rejects invalid input before sending externally", async () => {
    const fetcher = vi.fn<typeof fetch>();
    await expect(sendContact({ ...data, email: "bad" }, fetcher)).rejects.toThrow();
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("does not treat a rejected response as success", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: "false" })));
    await expect(sendContact(data, fetcher)).rejects.toThrow();
  });
});

describe("Contact form", () => {
  it("shows a success message after the owner endpoint acknowledges the message", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: "true" })));
    vi.stubGlobal("fetch", fetcher);
    render(<ContactForm />);
    for (const [key, value] of Object.entries(data)) {
      const field = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${key}"]`);
      if (!field) throw new Error(`Missing contact input: ${key}`);
      fireEvent.change(field, { target: { value } });
    }
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    await waitFor(() => expect(screen.getByRole("status")).toBeDefined());
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(JSON.parse(String(fetcher.mock.calls[0]?.[1]?.body))["Mensagem"]).toBe(data.message);
  });
});
