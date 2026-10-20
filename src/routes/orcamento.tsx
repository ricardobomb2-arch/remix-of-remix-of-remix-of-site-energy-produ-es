import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Reveal, WHATSAPP_URL, pageHead } from "@/components/site";
import { QuoteForm } from "@/components/quote-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/orcamento")({
  head: () => pageHead("Peça seu orçamento", "Vídeo | Foto | Conversão de fitas | Transmissão ao vivo — Energy Produções."),
  component: Orcamento,
});

function Orcamento() {
  return <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
    <Reveal><h1 className="text-4xl font-semibold sm:text-5xl md:text-7xl">Peça seu <span className="text-gradient">orçamento</span></h1></Reveal>
    <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
      <QuoteForm />
      <aside className="border-t border-border pt-8 lg:sticky lg:top-32 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <h2 className="font-display text-2xl font-semibold">Prefere falar direto?</h2>
        <Button asChild variant="outline" className="mt-6 h-auto min-h-12 whitespace-normal rounded-full px-6 py-3 hover:border-whatsapp hover:text-whatsapp">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle /> Chamar no WhatsApp</a>
        </Button>
      </aside>
    </div>
  </section>;
}
