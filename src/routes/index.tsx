import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Play, X, Award, Zap, Target, Users, MessageCircle } from "lucide-react";
import studio from "@/assets/estudio-panoramica.jpg.asset.json";
import { EnergyLogo, Reveal, WHATSAPP_URL, pageHead } from "@/components/site";
import { CountUp, HeroParallax, SplitText } from "@/components/site-motion";

const IMG = {
  video: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
  foto: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
  multi: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
};

export const Route = createFileRoute("/")({
  head: () => pageHead("Produção audiovisual desde 1989", "Energy Produções: filmagem, fotografia, som e multimídia, da ideia à entrega. São Paulo, desde 1989."),
  component: Index,
});

const TAGS = ["Produção", "Captação", "Edição", "Fotografia", "Transmissão ao vivo", "Motion graphics", "Drone", "Digitalização"];

const SERVICES = [
  { to: "/video", title: "Vídeo", text: "Produção, captação, edição, legendagem, motion graphics e locução.", img: IMG.video, span: "md:col-span-2 md:row-span-2" },
  { to: "/fotografia", title: "Fotografia", text: "Eventos, publicidade, gastronomia, shows, ensaios e arquitetura.", img: IMG.foto, span: "" },
  { to: "/multimidia", title: "Multimídia", text: "Transmissão ao vivo, criação, digitalização, autoração, design gráfico e logotipos.", img: IMG.multi, span: "" },
] as const;

const WHY = [
  { Icon: Users, title: "Competência", text: "Equipe qualificada e comprometida." },
  { Icon: Zap, title: "Agilidade", text: "Entregas no menor prazo possível." },
  { Icon: Target, title: "Foco", text: "Dedicação total a cada cliente." },
];

const CLIENTS = ["Banco do Brasil", "BBTUR", "Banco Itaú", "Banco Santander", "Banespa", "Banco BCN", "Itautec", "Samsung", "Rhodia Pharma", "Schering-Plough", "Bristol-Myers Squibb", "Sanus Farmacêutica", "Eurofarma", "Kibon", "Fuji", "Kodak", "Vigor", "Tec-Toy", "TransLine", "Agip Liquigás", "ABA (Associação Brasileira de Anunciantes)", "Construtel", "Citec do Brasil", "NET Filmes e Vídeo", "Itavema Veículos", "Protam", "Biotronik", "Instituto Metodista", "FILM", "VT CINE", "Racine", "Idea", "Popai Brasil", "Relojoaria Suissa", "IAG", "CONAC", "Associação dos Juízes Classistas", "Yacht Clube de Ilhabela", "Sindicato dos Propagandistas", "2º BPE (Batalhão de Polícia do Exército)", "22º Batalhão Logístico", "ROTA", "CPOR", "AT&T Latin America", "Nike do Brasil", "AES Eletropaulo", "SPTurismo"];

const VIDEOS = [
  { id: "EInV1MbpBuk", title: "Clip do 7º Cabelos & Cia" },
  { id: "772FKx_kRgA", title: "Clip de Abertura do Prêmio - 7º Cabelos & Cia" },
  { id: "0YS0enE2Ux4", title: "Duratex - Sustentabilidade 2016" },
  { id: "DuKcHTv-aRI", title: "Plataformas - 7º Cabelos & Cia" },
  { id: "dxWbFEjFV3w", title: "Arezzo - Alto Verão 2017" },
  { id: "G5quM11LhSI", title: "Arezzo - Viva o nosso Natal" },
];

function Marquee({ items, duration = "40s", sep = "✦", continuous = false }: { items: string[]; duration?: string; sep?: string; continuous?: boolean }) {
  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
      <div className={continuous ? "marquee service-marquee" : "marquee"} style={{ ["--marquee-duration" as string]: duration }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map((t) => (
              <span key={t} className="flex items-center whitespace-nowrap">
                <span className="px-6">{t}</span>
                <span className="text-primary">{sep}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoCard({ id, title, onOpen }: { id: string; title: string; onOpen: () => void }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <button onClick={onOpen} className="group text-left" aria-label={`Assistir: ${title}`}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card">
        <img
          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onLoad={(e) => {
            // YouTube returns a 120x90 placeholder for removed videos
            if (e.currentTarget.naturalWidth <= 120) setHidden(true);
          }}
          onError={() => setHidden(true)}
        />
        <div className="absolute inset-0 grid place-items-center bg-overlay/30 transition-colors group-hover:bg-overlay/10">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground">{title}</p>
    </button>
  );
}

const SPARK_PATH =
  "M12 1.8c1 6 3.2 8.2 9.2 9.2-6 1-8.2 3.2-9.2 9.2-1-6-3.2-8.2-9.2-9.2 6-1 8.2-3.2 9.2-9.2Z";

const SPARKS = [
  { top: "-26%", left: "5%", size: 24, delay: 0, dur: "1.5s" },
  { top: "18%", left: "-7%", size: 18, delay: 160, dur: "1.2s" },
  { top: "70%", left: "8%", size: 21, delay: 320, dur: "1.6s" },
  { top: "-18%", left: "43%", size: 16, delay: 90, dur: "1.3s" },
  { top: "28%", left: "69%", size: 23, delay: 240, dur: "1.5s" },
  { top: "76%", left: "85%", size: 18, delay: 420, dur: "1.4s" },
  { top: "-30%", left: "93%", size: 20, delay: 520, dur: "1.5s" },
] as const;

function GoldSparks({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [burst, setBurst] = useState(0);
  const light = () => setBurst((b) => b + 1);
  return (
    <div
      className={`anniversary-glow relative ${className}`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") light();
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") light();
      }}
    >
      {children}
      {burst > 0 && (
        <span key={burst} aria-hidden className="gold-sparks">
          {SPARKS.map((s, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="gold-spark"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                ["--spark-duration" as string]: s.dur,
                ["--spark-delay" as string]: `${s.delay}ms`,
              }}
            >
              <path d={SPARK_PATH} fill="currentColor" />
            </svg>
          ))}
        </span>
      )}
    </div>
  );
}

function Index() {
  const [active, setActive] = useState<string | null>(null);
  const [lit, setLit] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <HeroParallax src={studio.url} alt="Estúdio da Energy Produções" />
        <div className="relative flex flex-1 flex-col justify-end">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 -translate-y-full bg-gradient-to-b from-transparent to-background" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-20">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> São Paulo · desde 1989
            </p>
            <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
              <EnergyLogo drawOnLoad className="h-16 w-16 shrink-0 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-56 lg:w-56" />
              <h1 className="title-focus min-w-0 text-4xl font-semibold leading-[1.05] sm:text-7xl md:text-8xl lg:text-9xl">
                <span className="text-gradient block">Energy</span>
                <span className="block text-foreground">Produções</span>
              </h1>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 max-w-2xl font-display text-xl md:text-3xl">Produção audiovisual completa desde 1989.</p>
            <p className="mt-3 max-w-xl text-muted-foreground md:text-lg">Filmagem, fotografia, som e multimídia, da ideia à entrega.</p>
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-wrap gap-3">
            <Link to="/orcamento" className="group glow-orange inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
              Pedir orçamento <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link to="/portfolio" className="glow-white inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:border-primary hover:text-primary">
              Ver portfólio
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-green inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
            </a>
          </Reveal>
        </div>
        </div>
      </section>

      {/* TAG MARQUEE */}
      <div className="border-y border-border py-6 font-display text-2xl md:text-4xl">
        <Marquee items={TAGS} duration="35s" continuous />
      </div>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Serviços</p>
          <SplitText className="mt-3 text-4xl font-semibold md:text-6xl">Da ideia à entrega.</SplitText>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2 md:[grid-auto-rows:minmax(280px,1fr)]">
          {SERVICES.map((s, i) => (
            <Reveal key={s.to} delay={i * 120} className={s.span}>
              <Link to={s.to} className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border border-border p-7">
                <img src={s.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/60 to-transparent" />
                <ArrowUpRight className="absolute right-6 top-6 h-10 w-10 rounded-full border border-border bg-background/40 p-2 backdrop-blur transition-all group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground" />
                <div className="relative">
                  <h3 className="text-3xl font-semibold md:text-4xl">{s.title}</h3>
                  <p className="mt-2 max-w-md text-muted-foreground">{s.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <Reveal>
          <SplitText className="text-4xl font-semibold md:text-6xl">Por que a <span className="text-gradient">Energy</span></SplitText>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {WHY.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div
                className={`energy-card h-full rounded-3xl border border-border bg-card p-8${lit === i ? " is-lit" : ""}`}
                onPointerDown={(e) => {
                  if (e.pointerType === "touch") setLit(lit === i ? null : i);
                }}
              >
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <GoldSparks className="mt-4 flex flex-col items-start gap-4 rounded-3xl bg-gradient-primary p-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-10">
            <p className="font-display text-3xl font-semibold md:text-5xl">Desde 1989</p>
            <p className="flex items-center gap-3 text-lg font-medium md:text-xl">
              <Award className="h-6 w-6" /> Profissional do Ano em 1989, 1991 e 1992
            </p>
          </GoldSparks>
        </Reveal>

        {/* NÚMEROS QUE SOBEM */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            { value: 1989, suffix: "", label: "Ano de fundação" },
            { value: 37, suffix: "", label: "Anos de estrada" },
            { value: 500, suffix: "+", label: "Projetos entregues" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 150}>
              <div className="rounded-3xl border border-border bg-card p-8 text-center">
                <p className="font-display text-5xl font-semibold text-gradient md:text-6xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="border-y border-border py-16">
        <Reveal>
          <SplitText className="mb-10 px-5 text-center text-2xl font-semibold md:text-4xl">Marcas que já confiaram na Energy</SplitText>
        </Reveal>
        <div className="space-y-4 text-lg text-muted-foreground md:text-2xl">
          <Marquee items={CLIENTS.slice(0, 24)} duration="90s" sep="·" />
          <div>
            <Marquee items={CLIENTS.slice(24)} duration="80s" sep="·" />
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Portfólio</p>
            <SplitText className="mt-3 text-4xl font-semibold md:text-6xl">Trabalhos recentes</SplitText>
          </div>
          <Link to="/portfolio" className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 transition-colors hover:border-primary hover:text-primary">
            Ver portfólio completo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} {...v} onOpen={() => setActive(v.id)} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center md:py-24">
            <div className="absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
            <SplitText className="relative mx-auto max-w-3xl text-4xl font-semibold md:text-6xl">
              Tem um projeto em mente? <span className="text-gradient">Fale com a gente.</span>
            </SplitText>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/orcamento" className="glow-orange inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
                Pedir orçamento
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="glow-green inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {active && (
        <div role="dialog" aria-modal="true" aria-label="Player de vídeo" className="fixed inset-0 z-[70] grid place-items-center bg-overlay/90 p-4 backdrop-blur" onClick={() => setActive(null)}>
          <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-border" aria-label="Fechar vídeo" onClick={() => setActive(null)}>
            <X className="h-5 w-5" />
          </button>
          <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${active}?autoplay=1&rel=0`}
              title="Vídeo do portfólio"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
