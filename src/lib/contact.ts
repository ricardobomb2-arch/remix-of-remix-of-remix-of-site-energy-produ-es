import { contactSchema, postToFormSubmit } from "./quote";

const contactLabels: Record<string, string> = { name: "Nome", email: "E-mail", phone: "Telefone/WhatsApp", message: "Mensagem" };

export async function sendContact(input: unknown, fetcher: typeof fetch = fetch) {
  const data = contactSchema.parse(input);
  const values: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) values[contactLabels[key] ?? key] = value;
  await postToFormSubmit("Contato — Energy Produções", values, data.email, fetcher);
}
