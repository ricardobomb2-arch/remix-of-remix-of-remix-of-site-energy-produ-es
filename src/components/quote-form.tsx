import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, Send, Video, Camera, CassetteTape, Radio } from "lucide-react";
import type { ZodTypeAny } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, quoteSchema, sendQuote, serviceSchema, SERVICES, videoSchema } from "@/lib/quote";

const icons = [Video, Camera, CassetteTape, Radio];
const initial: Record<string, string> = { service: "", name: "", email: "", phone: "", message: "", product: "", audience: "", writer: "", narrator: "", cameras: "", days: "", location: "", animation: "", makeup: "", vision: "" };

export function QuoteForm() {
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const isVideo = values["service"] === "Vídeo";
  const steps = isVideo ? ["Tipo de serviço", "Vídeo", "Nome, e-mail, telefone/WhatsApp, mensagem"] : ["Tipo de serviço", "Nome, e-mail, telefone/WhatsApp, mensagem"];
  const last = step === steps.length - 1;
  function update(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSendError("");
  }
  function validate(schema: ZodTypeAny) {
    const result = schema.safeParse(values);
    if (result.success) { setErrors({}); return true; }
    const next: Record<string, string> = {};
    for (const issue of result.error.issues) next[String(issue.path[0])] ??= issue.message;
    setErrors(next);
    requestAnimationFrame(() => document.getElementById(`quote-${Object.keys(next)[0]}`)?.focus());
    return false;
  }
  function move(next: number) { setStep(next); setErrors({}); requestAnimationFrame(() => heading.current?.focus()); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    if (!last) {
      if (validate(step === 0 ? serviceSchema : videoSchema)) move(step + 1);
      return;
    }
    if (!validate(contactSchema) || !validate(quoteSchema)) return;
    setSending(true); setSendError("");
    try { await sendQuote(values); setSuccess(true); requestAnimationFrame(() => heading.current?.focus()); }
    catch { setSendError("Não foi possível enviar. Tente novamente."); }
    finally { setSending(false); }
  }
  function field(key: string, label: string, options: { type?: string; multiline?: boolean; max?: number; autoComplete?: string } = {}) {
    const props = {
      id: `quote-${key}`, name: key, value: values[key] ?? "", required: true,
      maxLength: options.max ?? 200, autoComplete: options.autoComplete,
      "aria-invalid": Boolean(errors[key]), "aria-describedby": errors[key] ? `error-${key}` : undefined,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(key, event.target.value),
      className: "mt-2 min-h-12 bg-card/50",
    };
    return <div key={key} className={options.multiline ? "sm:col-span-2" : ""}>
      <label htmlFor={props.id} className="text-sm font-medium">{label}</label>
      {options.multiline ? <Textarea {...props} rows={4} /> : <Input {...props} type={options.type ?? "text"} inputMode={key === "cameras" || key === "days" ? "numeric" : undefined} />}
      {errors[key] && <p id={`error-${key}`} className="mt-2 text-sm text-destructive">{errors[key]}</p>}
    </div>;
  }
  function choice(key: string, label: string, options: readonly string[]) {
    return <fieldset key={key} className="min-w-0">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-3">
        {options.map((option, index) => <label key={option} className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border px-4 transition-colors ${values[key] === option ? "border-primary bg-primary/10" : "border-input bg-card/50 hover:border-primary/50"}`}>
          <input id={index === 0 ? `quote-${key}` : `quote-${key}-${index}`} type="radio" name={key} value={option} checked={values[key] === option} onChange={() => update(key, option)} required aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined} className="accent-primary" />
          {option}
        </label>)}
      </div>
      {errors[key] && <p id={`error-${key}`} className="mt-2 text-sm text-destructive">{errors[key]}</p>}
    </fieldset>;
  }
  if (success) return <div role="status" className="py-12">
    <Check className="mb-6 h-10 w-10 text-primary" />
    <h2 ref={heading} tabIndex={-1} className="font-display text-3xl font-semibold outline-none">Orçamento enviado com sucesso.</h2>
  </div>;
  return <form onSubmit={submit} noValidate aria-label="Peça seu orçamento" aria-busy={sending}>
    <ol aria-label="Etapas" className="mb-10 flex gap-3">
      {steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className="flex-1">
        <div className={`h-1 rounded-full ${index <= step ? "bg-primary" : "bg-border"}`} />
        <span className={`mt-3 block text-xs ${index === step ? "text-primary" : "text-muted-foreground"}`}>{index + 1}</span>
        <span className="sr-only">{label}</span>
      </li>)}
    </ol>
    <h2 ref={heading} tabIndex={-1} className="mb-8 font-display text-2xl font-semibold outline-none">{steps[step]}</h2>
    <fieldset disabled={sending} className="min-w-0 border-0 p-0">
      <legend className="sr-only">{steps[step]}</legend>
      {step === 0 ? <>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = icons[index] ?? Video;
            return <label key={service} className={`relative flex min-h-28 cursor-pointer items-center gap-4 rounded-lg border p-5 transition-colors ${values["service"] === service ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"}`}>
              <input id={index === 0 ? "quote-service" : `quote-service-${index}`} type="radio" name="service" value={service} checked={values["service"] === service} onChange={() => update("service", service)} required className="accent-primary" aria-invalid={Boolean(errors["service"])} aria-describedby={errors["service"] ? "error-service" : undefined} />
              <Icon className="h-6 w-6 shrink-0 text-primary" /><span className="text-sm font-medium">{service}</span>
            </label>;
          })}
        </div>
        {errors["service"] && <p id="error-service" className="mt-3 text-sm text-destructive">Selecione o tipo de serviço.</p>}
      </> : isVideo && step === 1 ? <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        {field("product", "Tipo de produto ou evento")}
        {field("audience", "Público-alvo")}
        {choice("writer", "Precisa de roteirista?", ["sim", "não"])}
        {choice("narrator", "Precisa de locutor?", ["sim", "não"])}
        {field("cameras", "Quantas câmeras", { max: 3 })}
        {field("days", "Quantas diárias de gravação", { max: 3 })}
        {choice("location", "Gravação em estúdio ou externa", ["estúdio", "externa"])}
        {choice("animation", "Precisa de animação do logotipo?", ["sim", "não"])}
        {choice("makeup", "Precisa de maquiagem?", ["sim", "não"])}
        {field("vision", "Como você imagina o vídeo e qual a duração total", { multiline: true, max: 3000 })}
      </div> : <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        {field("name", "Nome", { max: 100, autoComplete: "name" })}
        {field("email", "E-mail", { type: "email", max: 255, autoComplete: "email" })}
        {field("phone", "Telefone/WhatsApp", { type: "tel", max: 30, autoComplete: "tel" })}
        {field("message", "Mensagem", { multiline: true, max: 3000 })}
      </div>}
    </fieldset>
    {last && <p className="mt-8 text-xs leading-relaxed text-muted-foreground">Seus dados serão enviados pelo FormSubmit para atender à sua solicitação de orçamento, conforme a LGPD.</p>}
    {sendError && <p role="alert" className="mt-5 text-sm text-destructive">{sendError}</p>}
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
      {step > 0 ? <Button type="button" variant="ghost" disabled={sending} onClick={() => move(step - 1)} className="rounded-full"><ArrowLeft /> Voltar</Button> : <span />}
      <Button type="submit" disabled={sending} className="h-12 rounded-full bg-gradient-primary px-6 shadow-glow">
        {sending ? <><LoaderCircle className="animate-spin motion-reduce:animate-none" /> Enviando...</> : last ? <>Enviar orçamento <Send /></> : <>Continuar <ArrowRight /></>}
      </Button>
    </div>
  </form>;
}