import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award } from "lucide-react";
import { Reveal, WHATSAPP_URL, pageHead } from "@/components/site";
import { SplitText } from "@/components/site-motion";

const HERO = "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80";
const SIDE = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80";

export const Route = createFileRoute("/sobre")({
  head: () =>
    pageHead(
      "Sobre — Nossa história",
      "Fundada em 1989, a Energy Produções cuida de toda a comunicação visual e sonora da sua marca: do logotipo ao comercial de TV.",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&h=630&q=80",
    ),
  component: Sobre,
});

const STORY = [
  "Fundada em 1989, a Energy Produções começou na filmagem, fotografia e sonorização de eventos.",
  "Acompanhou cada mudança do mercado: das apresentações multimídia em CD-ROM e programação à criação de sites e domínios, sempre investindo em tecnologia.",
  "Hoje cuida de toda a comunicação visual e sonora da sua marca: do logotipo ao comercial de TV, passando por vídeos institucionais, vinhetas, jingles, fotografia e peças promocionais.",
  "Reconhecida como Profissional do Ano em 1989, 1991 e 1992, a equipe vive em constante atualização e também orienta cada cliente no marketing, porque um bom produto precisa ser bem apresentado para vender.",
];

const CLIENTS = ["Banco do Brasil", "BBTUR", "Banco Itaú", "Banco Santander", "Banespa", "Banco BCN", "Itautec", "Samsung", "Rhodia Pharma", "Schering-Plough", "Bristol-Myers Squibb", "Sanus Farmacêutica", "Eurofarma", "Kibon", "Fuji", "Kodak", "Vigor", "Tec-Toy", "TransLine", "Agip Liquigás", "ABA (Associação Brasileira de Anunciantes)", "Construtel", "Citec do Brasil", "NET Filmes e Vídeo", "Itavema Veículos", "Protam", "Biotronik", "Instituto Metodista", "FILM", "VT CINE", "Racine", "Idea", "Popai Brasil", "Relojoaria Suissa", "IAG", "CONAC", "Associação dos Juízes Classistas", "Yacht Clube de Ilhabela", "Sindicato dos Propagandistas", "2º BPE (Batalhão de Polícia do Exército)", "22º Batalhão Logístico", "ROTA", "CPOR", "AT&T Latin America", "Nike do Brasil", "AES Eletropaulo", "SPTurismo"];

const SERVICES = ["Filmes e cinema 16mm", "Vídeos institucionais e promocionais", "Videoaulas", "Computação gráfica e vinhetas", "Tratamento de imagem", "Videoclipes e video-books", "Edição e finalização", "Legendagem, dublagem, locução e transcrição", "Cópias", "Jingles", "Eventos", "Informática e multimídia", "Repertórios e produção de CDs", "Catálogos", "Digitalização", "Fotografia corporativa e de moda", "Criação e campanhas", "Assessoria de imprensa", "Casting", "Making of de filmes"];

function Sobre() {
  return (
    <>
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <img src={HERO} alt="Câmera de cinema em set de filmagem" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-overlay/75 to-overlay/40" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Sobre</p>
            <SplitText as="h1" className="mt-3 text-5xl font-semibold leading-[0.95] sm:text-7xl md:text-8xl">
              Nossa <span className="text-gradient">história</span>
            </SplitText>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-32">
        <div className="space-y-8">
          {STORY.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className={i === 0 ? "font-display text-2xl leading-snug md:text-3xl" : "text-lg leading-relaxed text-muted-foreground"}>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150} className="md:sticky md:top-28 md:self-start">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img src={SIDE} alt="Equipe em produção audiovisual" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-gradient-primary p-5 text-primary-foreground">
              <Award className="h-6 w-6 shrink-0" />
              <p className="font-medium">Profissional do Ano em 1989, 1991 e 1992</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <Reveal>
          <h2 className="text-4xl font-semibold md:text-6xl">O que <span className="text-gradient">fazemos</span></h2>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s} delay={(i % 6) * 60}>
              <span className="inline-block rounded-full border border-border bg-card px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                {s}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold md:text-5xl">Marcas que já confiaram na Energy</h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {CLIENTS.map((c) => (
              <li key={c} className="flex min-h-24 items-center bg-background px-5 py-6 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground md:text-base">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center md:py-24">
            <div className="absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
            <h2 className="relative mx-auto max-w-3xl text-4xl font-semibold md:text-6xl">
              Tem um projeto em mente? <span className="text-gradient">Fale com a gente.</span>
            </h2>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/orcamento" className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
                Pedir orçamento <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium transition-colors hover:border-whatsapp hover:text-whatsapp">
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
