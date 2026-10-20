import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Camera, Lightbulb, MessageCircle } from "lucide-react";
import { Reveal, WHATSAPP_URL, pageHead } from "@/components/site";
import { Button } from "@/components/ui/button";
import { PhotographyGallery, type GalleryPhoto } from "@/components/photography-gallery";
import { PhotographyComparison } from "@/components/photography-comparison";
import cover from "@/assets/photography/cover.jpg.asset.json";
import arquitetura from "@/assets/photography/arquitetura.jpg.asset.json";
import autorais from "@/assets/photography/autorais.jpg.asset.json";
import bandas from "@/assets/photography/bandas.jpg.asset.json";
import ensaios from "@/assets/photography/ensaios.jpg.asset.json";
import eventos from "@/assets/photography/eventos.jpg.asset.json";
import festa from "@/assets/photography/festa-infantil.jpg.asset.json";
import gastronomia from "@/assets/photography/gastronomia.jpg.asset.json";
import crianca from "@/assets/photography/gestante-crianca.jpg.asset.json";
import publicidade from "@/assets/photography/publicidade.jpg.asset.json";

const PHOTOS: GalleryPhoto[] = [
  { category: "Arquitetura", src: arquitetura.url, alt: "Fotografia de arquitetura de edifícios vista de baixo" },
  { category: "Autorais", src: autorais.url, alt: "Composição fotográfica autoral" },
  { category: "Bandas", src: bandas.url, alt: "Show de música ao vivo com plateia" },
  { category: "Ensaios", src: ensaios.url, alt: "Retrato feminino em ensaio fotográfico" },
  { category: "Eventos", src: eventos.url, alt: "Decoração e mesas em evento" },
  { category: "Festa infantil", src: festa.url, alt: "Decoração de festa de aniversário com balões" },
  { category: "Gastronomia", src: gastronomia.url, alt: "Fotografia gastronômica de pratos preparados" },
  { category: "Gestante e criança", src: crianca.url, alt: "Retrato de bebê" },
  { category: "Publicidade", src: publicidade.url, alt: "Fotografia publicitária de relógio" },
];

const SPECIALTIES = ["Corporativo", "institucional", "still de produtos", "moda e fashion", "desfiles", "book", "gestante", "automobilismo", "eventos"];

export const Route = createFileRoute("/fotografia")({
  head: () => pageHead("Fotografia", "Da produção à preparação do set fotográfico. 2 estúdios próprios com fundo infinito temático.", cover.url),
  component: Fotografia,
});

function Fotografia() {
  return (
    <>
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <img src={cover.url} alt="Câmera fotográfica profissional" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-overlay/60 to-overlay/80" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <Reveal>
            <h1 className="break-words text-5xl font-semibold leading-tight tracking-normal text-gradient sm:text-7xl md:text-8xl">Fotografia</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-foreground md:text-2xl">Da produção à preparação do set fotográfico.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 md:gap-16 md:px-8 md:py-16">
          <Reveal>
            <div className="flex items-center gap-3 text-primary"><Camera className="h-5 w-5" /><h2 className="text-xl font-medium tracking-normal">Estrutura</h2></div>
            <p className="mt-5 max-w-lg font-display text-2xl leading-snug md:text-3xl">2 estúdios próprios com fundo infinito temático.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-3 text-primary"><Lightbulb className="h-5 w-5" /><h2 className="text-xl font-medium tracking-normal">Criação</h2></div>
            <p className="mt-5 font-display text-2xl leading-snug md:text-3xl">Produção, roteiro e conceito.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal><h2 className="text-4xl font-semibold tracking-normal md:text-6xl">Especialidades</h2></Reveal>
        <Reveal delay={80}><p className="mt-6 max-w-4xl text-lg leading-relaxed text-muted-foreground">Corporativo, institucional, still de produtos, moda e fashion, desfiles, book, gestante, automobilismo e eventos.</p></Reveal>
        <div className="mt-10 flex flex-wrap gap-3" aria-hidden="true">
          {SPECIALTIES.map((specialty, index) => <Reveal key={specialty} delay={(index % 5) * 60}>
            <span className="inline-block rounded-full border border-border bg-card px-5 py-3 transition-colors hover:border-primary hover:text-primary">{specialty}</span>
          </Reveal>)}
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal><h2 className="mb-10 text-4xl font-semibold tracking-normal md:text-6xl">Antes e depois</h2></Reveal>
          <PhotographyComparison beforeSrc={ensaios.url} alt="Retrato feminino em ensaio fotográfico" />
        </div>
      </section>

      <section className="border-y border-border bg-card/40 py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal><h2 className="text-4xl font-semibold tracking-normal md:text-6xl">Galeria</h2></Reveal>
          <PhotographyGallery photos={PHOTOS} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-normal md:text-6xl">Tem um projeto em mente? <span className="text-gradient">Fale com a gente.</span></h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild className="group h-auto rounded-full bg-gradient-primary px-7 py-3.5 text-base shadow-glow"><Link to="/orcamento">Pedir orçamento <ArrowUpRight className="transition-transform group-hover:rotate-45" /></Link></Button>
              <Button asChild variant="outline" className="h-auto whitespace-normal rounded-full px-7 py-3.5 text-base hover:border-whatsapp hover:text-whatsapp"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle />Chamar no WhatsApp</a></Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
