import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MessageCircle, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Reveal, WHATSAPP_URL, pageHead } from "@/components/site";
import { SplitText } from "@/components/site-motion";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3655.630804927391!2d-46.67105772380827!3d-23.6175701636613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1692302441722!5m2!1spt-BR!2sbr";

const SOCIAL = [
  { href: "https://www.facebook.com/energyproducoesoficial/", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/abelenergy/", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/c/EnergyProducoes", label: "YouTube", Icon: Youtube },
  { href: "https://twitter.com/Abel4b3l", label: "X (Twitter)", Icon: Twitter },
];

export const Route = createFileRoute("/contato")({
  head: () =>
    pageHead(
      "Fale com a gente",
      "Fale com a gente: telefone, WhatsApp, e-mail, formulário de contato e redes sociais — Energy Produções.",
    ),
  component: Contato,
});

function Contato() {
  return (
    <>
      {/* CABEÇALHO */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <Reveal>
          <h1 className="text-4xl font-semibold sm:text-5xl md:text-7xl">
            Fale com a <span className="text-gradient">gente</span>
          </h1>
        </Reveal>
      </section>

      {/* FORMULÁRIO + CONTATO DIRETO */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <h2 className="mb-8 font-display text-2xl font-semibold">Formulário de contato</h2>
            <ContactForm />
          </div>
          <aside className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h2 className="font-display text-2xl font-semibold">Telefone e WhatsApp</h2>
            <Button
              asChild
              variant="outline"
              className="mt-6 h-auto min-h-12 whitespace-normal rounded-full px-6 py-3 hover:border-whatsapp hover:text-whatsapp"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> (11) 94736-9785
              </a>
            </Button>
            <h2 className="mt-10 font-display text-2xl font-semibold">E-mail</h2>
            <a
              href="mailto:abel@energyproducoes.com.br"
              className="mt-6 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" /> abel@energyproducoes.com.br
            </a>
          </aside>
        </div>
      </section>

      {/* MAPA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <iframe
              src={MAP_SRC}
              title="Mapa"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[380px] w-full md:h-[520px]"
            />
          </div>
        </Reveal>
      </section>

      {/* REDES SOCIAIS */}
      <section className="border-t border-border bg-card/40 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl">
              <span className="text-gradient">Redes sociais</span>
            </h2>
            <nav aria-label="Redes sociais" className="mt-8 flex flex-wrap justify-center gap-3">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>
    </>
  );
}
