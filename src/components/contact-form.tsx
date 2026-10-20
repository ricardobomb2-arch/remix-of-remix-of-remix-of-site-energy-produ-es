import { useRef, useState, type FormEvent } from "react";
import { Check, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/quote";
import { sendContact } from "@/lib/contact";

const initial: Record<string, string> = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  function update(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSendError("");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      requestAnimationFrame(() => document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus());
      return;
    }
    setErrors({});
    setSending(true);
    try { await sendContact(values); setSuccess(true); requestAnimationFrame(() => heading.current?.focus()); }
    catch { setSendError("Não foi possível enviar. Tente novamente."); }
    finally { setSending(false); }
  }
  function field(key: string, label: string, options: { type?: string; multiline?: boolean; max?: number; autoComplete?: string } = {}) {
    const props = {
      id: `contact-${key}`, name: key, value: values[key] ?? "", required: true,
      maxLength: options.max ?? 200, autoComplete: options.autoComplete,
      "aria-invalid": Boolean(errors[key]), "aria-describedby": errors[key] ? `error-${key}` : undefined,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(key, event.target.value),
      className: "mt-2 min-h-12 bg-card/50",
    };
    return <div key={key} className={options.multiline ? "sm:col-span-2" : ""}>
      <label htmlFor={props.id} className="text-sm font-medium">{label}</label>
      {options.multiline ? <Textarea {...props} rows={4} /> : <Input {...props} type={options.type ?? "text"} />}
      {errors[key] && <p id={`error-${key}`} className="mt-2 text-sm text-destructive">{errors[key]}</p>}
    </div>;
  }
  if (success) return <div role="status" className="py-12">
    <Check className="mb-6 h-10 w-10 text-primary" />
    <h2 ref={heading} tabIndex={-1} className="font-display text-3xl font-semibold outline-none">Mensagem enviada com sucesso.</h2>
  </div>;
  return <form onSubmit={submit} noValidate aria-label="Formulário de contato" aria-busy={sending}>
    <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
      {field("name", "Nome", { max: 100, autoComplete: "name" })}
      {field("email", "E-mail", { type: "email", max: 255, autoComplete: "email" })}
      {field("phone", "Telefone/WhatsApp", { type: "tel", max: 30, autoComplete: "tel" })}
      {field("message", "Mensagem", { multiline: true, max: 3000 })}
    </div>
    <p className="mt-8 text-xs leading-relaxed text-muted-foreground">Seus dados serão enviados pelo FormSubmit para responder à sua mensagem, conforme a LGPD.</p>
    {sendError && <p role="alert" className="mt-5 text-sm text-destructive">{sendError}</p>}
    <div className="mt-8 border-t border-border pt-6">
      <Button type="submit" disabled={sending} className="h-12 rounded-full bg-gradient-primary px-6 shadow-glow">
        {sending ? <><LoaderCircle className="animate-spin motion-reduce:animate-none" /> Enviando...</> : <>Enviar mensagem <Send /></>}
      </Button>
    </div>
  </form>;
}
