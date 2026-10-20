import { z } from "zod";

export const SERVICES = ["Vídeo", "Foto", "Conversão de fitas", "Transmissão ao vivo"] as const;
const text = (max: number) => z.string().trim().min(1, "Preencha este campo.").max(max, `Use até ${max} caracteres.`);
const yesNo = z.enum(["sim", "não"], { errorMap: () => ({ message: "Selecione sim ou não." }) });
const count = z.string().regex(/^\d{1,3}$/, "Informe um número inteiro positivo.").refine((value) => Number(value) > 0, "Informe um número inteiro positivo.");
export const serviceSchema = z.object({ service: z.enum(SERVICES) });
export const contactSchema = z.object({
  name: text(100),
  email: text(255).email("Informe um e-mail válido."),
  phone: text(30).regex(/^\+?[\d\s().-]+$/, "Informe um telefone válido.").refine((value) => value.replace(/\D/g, "").length >= 8, "Informe um telefone válido."),
  message: text(3000),
});
export const videoSchema = z.object({
  product: text(200), audience: text(200), writer: yesNo, narrator: yesNo,
  cameras: count, days: count,
  location: z.enum(["estúdio", "externa"], { errorMap: () => ({ message: "Selecione estúdio ou externa." }) }),
  animation: yesNo, makeup: yesNo, vision: text(3000),
});
export const quoteSchema = z.discriminatedUnion("service", [
  contactSchema.extend({ service: z.literal("Vídeo") }).merge(videoSchema),
  contactSchema.extend({ service: z.literal("Foto") }),
  contactSchema.extend({ service: z.literal("Conversão de fitas") }),
  contactSchema.extend({ service: z.literal("Transmissão ao vivo") }),
]);
export type Quote = z.infer<typeof quoteSchema>;
export const FORM_ENDPOINT = "https://formsubmit.co/ajax/abel@energyproducoes.com.br";
const labels: Record<string, string> = {
  service: "Tipo de serviço", name: "Nome", email: "E-mail", phone: "Telefone/WhatsApp", message: "Mensagem",
  product: "Tipo de produto ou evento", audience: "Público-alvo", writer: "Precisa de roteirista?", narrator: "Precisa de locutor?",
  cameras: "Quantas câmeras", days: "Quantas diárias de gravação", location: "Gravação em estúdio ou externa",
  animation: "Precisa de animação do logotipo?", makeup: "Precisa de maquiagem?", vision: "Como você imagina o vídeo e qual a duração total",
};
export async function postToFormSubmit(subject: string, values: Record<string, string>, replyTo: string, fetcher: typeof fetch = fetch) {
  const payload: Record<string, string> = { _subject: subject, _template: "table", _replyto: replyTo, _captcha: "false" };
  for (const [key, value] of Object.entries(values)) payload[key] = value;
  const response = await fetcher(FORM_ENDPOINT, {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(30000),
  });
  const result: unknown = await response.json();
  const parsed = z.object({ success: z.union([z.literal(true), z.literal("true")]) }).safeParse(result);
  if (!response.ok || !parsed.success) throw new Error("Não foi possível enviar. Tente novamente.");
}
export async function sendQuote(input: unknown, fetcher: typeof fetch = fetch) {
  const data = quoteSchema.parse(input);
  const values: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) values[labels[key] ?? key] = value;
  await postToFormSubmit("Orçamento — Energy Produções", values, data.email, fetcher);
}