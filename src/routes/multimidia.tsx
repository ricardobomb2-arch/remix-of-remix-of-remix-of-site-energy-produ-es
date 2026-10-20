import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowUpRight,
  Disc3,
  Film,
  Globe,
  HardDriveDownload,
  Layers,
  MessageCircle,
  Palette,
  ScanLine,
} from "lucide-react";
import webImg from "@/assets/multimidia/web.jpg";
import designImg from "@/assets/multimidia/design.jpg";
import digitalizacaoImg from "@/assets/multimidia/digitalizacao.jpg";
import dvdImg from "@/assets/multimidia/dvd.jpg";
import { Reveal, WHATSAPP_URL, pageHead } from "@/components/site";
import { SplitText } from "@/components/site-motion";

const HERO = "https://images.unsplash.com/photo-1763132646264-4123ae7cf4a6?auto=format&fit=crop&w=1600&q=80";
const VHS = "https://images.unsplash.com/photo-1481137344492-d5a150a97f8b?auto=format&fit=crop&w=1200&q=80";
const HDD = "https://images.unsplash.com/photo-1708264956848-562fe2d9abad?auto=format&fit=crop&w=1200&q=80";

export const Route = createFileRoute("/multimidia")({
  head: () =>
    pageHead(
      "Multimídia",
      "Comunicação em vários formatos para levar sua mensagem de forma clara e objetiva: web, design gráfico, conversão de mídias, digitalização, autoração de DVD e recuperação de dados.",
      "https://images.unsplash.com/photo-1763132646264-4123ae7cf4a6?auto=format&fit=crop&w=1200&h=630&q=80",
    ),
  component: Multimidia,
});

const MIDIAS = [
  "VHS",
  "S-VHS",
  "VHS-C",
  "Mini DV",
  "Betacam",
  "Super 8",
  "16mm",
  "vinil",
  "fita cassete (K-7)",
];

const DIGITAIS = ["Fotos", "Slides", "Negativos 35mm", "Documentos"];
const FORMATS = ["JPEG", "TIF", "TGA", "BMP", "PDF"];

const DVD_FEATURES = ["Menu animado", "Capítulos", "Áudio 2.0 e 5.1", "Legendas", "Seleção de idioma"];
const DVD_SOURCES = ["Betacam", "DVCAM", "HDV", "DV", "Mini-DV", "outros formatos"];
const DVD_STEPS = ["Preparação", "Montagem", "Navegação", "Testes", "Gravação"];

const RECOVERY_FROM = ["HD", "Pendrive", "Cartão de memória", "CD", "DVD"];

function Multimidia() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <img
          src={HERO}
          alt="Pilha de televisores antigos ligados exibindo chiado em ambiente escuro"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-overlay/75 to-overlay/60" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <Reveal>
            <h1 className="text-6xl font-semibold leading-[0.95] sm:text-8xl md:text-9xl">
              <span className="text-gradient">Multimídia</span>
            </h1>
            <p className="mt-6 max-w-2xl font-display text-xl md:text-3xl">
              Comunicação em vários formatos para levar sua mensagem de forma clara e objetiva.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WEB */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
                  <Globe className="h-5 w-5" />
                </span>
                <h2 className="text-4xl font-semibold md:text-6xl">
                  <span className="text-gradient">Web</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Criação de sites pessoais e corporativos.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={webImg}
                alt="Mesa de trabalho com monitor exibindo o layout de um site em criação"
                loading="lazy"
                width={1600}
                height={1072}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DESIGN GRÁFICO */}
      <section className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1fr_1.15fr] md:px-8">
          <Reveal className="md:order-2">
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={designImg}
                alt="Materiais gráficos impressos dispostos sobre uma bancada escura"
                loading="lazy"
                width={1600}
                height={1072}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="md:order-1">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <Palette className="h-5 w-5" />
                </span>
                <h2 className="text-4xl font-semibold md:text-6xl">
                  Design <span className="text-gradient">gráfico</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Materiais para impressão, texturas, cliparts, tratamento de imagem, editoração, catálogos e folhetos.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONVERSÃO DE MÍDIAS */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
              <Film className="h-5 w-5" />
            </span>
            <h2 className="text-4xl font-semibold md:text-6xl">
              Conversão de <span className="text-gradient">mídias</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid items-center gap-12 md:grid-cols-[1fr_1.15fr]">
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={VHS}
                alt="Pilha de fitas VHS antigas guardadas em estante"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-gradient-primary px-5 py-4 font-medium text-primary-foreground">
                Seu acervo analógico em formato digital
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted-foreground">
                VHS, S-VHS, VHS-C, Mini DV, Betacam, Super 8, 16mm, vinil e fita cassete (K-7).
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2">
              {MIDIAS.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 50}>
                  <span className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIGITALIZAÇÃO */}
      <section className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.15fr_1fr] md:px-8">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <ScanLine className="h-5 w-5" />
                </span>
                <h2 className="text-4xl font-semibold md:text-6xl">
                  <span className="text-gradient">Digitalização</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Fotos, slides, negativos 35mm e documentos, de 300 a 9600 dpi (JPEG, TIF, TGA, BMP ou PDF).
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {DIGITAIS.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 50}>
                  <span className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={150}>
              <div className="mt-10 rounded-2xl border border-border bg-background p-6">
                <p className="flex items-center gap-3 font-medium">
                  <HardDriveDownload className="h-5 w-5 shrink-0 text-primary" />
                  De 300 a 9600 dpi
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {FORMATS.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={digitalizacaoImg}
                alt="Slides e negativos 35mm sobre o vidro de um digitalizador"
                loading="lazy"
                width={1600}
                height={1072}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* AUTORAÇÃO DE DVD */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
              <Disc3 className="h-5 w-5" />
            </span>
            <h2 className="text-4xl font-semibold md:text-6xl">
              Autoração de <span className="text-gradient">DVD</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid items-center gap-12 md:grid-cols-[1fr_1.15fr]">
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={dvdImg}
                alt="Disco de DVD ao lado de um estojo aberto, com menu animado ao fundo"
                loading="lazy"
                width={1600}
                height={1072}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Menu animado, capítulos, áudio 2.0 e 5.1, legendas e seleção de idioma, a partir de Betacam, DVCAM,
                HDV, DV, Mini-DV e outros formatos.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {DVD_FEATURES.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 50}>
                  <span className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <h3 className="mt-10 font-display text-xl md:text-2xl">Material de origem</h3>
            </Reveal>
            <div className="mt-5 flex flex-wrap gap-2">
              {DVD_SOURCES.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 50}>
                  <span className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={150}>
              <div className="mt-10 rounded-2xl border border-border bg-card p-6">
                <p className="flex items-center gap-3 font-medium">
                  <Layers className="h-5 w-5 shrink-0 text-primary" />
                  Cuidamos do projeto inteiro
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {DVD_STEPS.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RECUPERAÇÃO DE DADOS */}
      <section className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1fr_1.15fr] md:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={HDD}
                alt="Disco rígido aberto sobre uma superfície escura"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-gradient-primary px-5 py-4 font-medium text-primary-foreground">
                Energy Recovery
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <HardDriveDownload className="h-5 w-5" />
                </span>
                <h2 className="text-4xl font-semibold md:text-6xl">
                  Recuperação de <span className="text-gradient">dados</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Recuperamos arquivos de HD, pendrive, cartão de memória, CD e DVD, inclusive após formatação ou
                exclusão.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {RECOVERY_FROM.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 50}>
                  <span className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={150}>
              <div className="mt-10 rounded-2xl border border-primary/40 bg-background p-6">
                <p className="flex items-start gap-3 font-medium text-foreground">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    Importante: ao perceber o problema, desligue o dispositivo e não tente recuperar sozinho.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center md:py-24">
            <div className="absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
            <h2 className="relative mx-auto max-w-3xl text-4xl font-semibold md:text-6xl">
              Tem um projeto em mente? <span className="text-gradient">Fale com a gente.</span>
            </h2>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/orcamento"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Pedir orçamento <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium transition-colors hover:border-whatsapp hover:text-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
