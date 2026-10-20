import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Camera,
  Check,
  Clapperboard,
  Film,
  Heart,
  Layers,
  Mic,
  MonitorPlay,
  Radio,
  Scissors,
  Sparkles,
  Youtube,
  Box,
  HardDriveDownload,
} from "lucide-react";
import ilha from "@/assets/ilha-de-edicao.jpg";
import { Reveal, WHATSAPP_URL, pageHead } from "@/components/site";

const HERO = "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80";
const DRONE = "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80";
const LIVE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";
const EVENTS = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";
const CINEMA = "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80";

export const Route = createFileRoute("/video")({
  head: () =>
    pageHead(
      "Vídeo — Produção, edição e finalização",
      "Produção, edição e finalização de ponta a ponta: vídeos institucionais, comerciais, documentários e motion graphics, com estúdio próprio em São Paulo.",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&h=630&q=80",
    ),
  component: Video,
});

const STRUCTURE = [
  { Icon: Clapperboard, label: "Ilha de edição" },
  { Icon: Mic, label: "Cabine de locução" },
  { Icon: Camera, label: "Fundo para fotos" },
];

const TYPES = [
  "Vídeos institucionais",
  "Comerciais",
  "Culturais",
  "De treinamento",
  "Palestras",
  "Eventos",
  "Feiras",
  "Lançamentos de produto",
  "Motivacionais",
  "Releases",
  "Documentários",
  "Programas de TV",
  "Videoaulas",
];

const INCLUDES = [
  "Roteiro",
  "Locução e legendas em outros idiomas",
  "Animação 2D e 3D",
  "Cenário e maquete virtual",
  "Apresentador(a) ou atores",
  "Filmagem aérea com drone",
  "Conversão de vídeos para a internet",
  "Duplicação de CD e DVD",
];

const EDIT_DO = [
  "Equipamento completo",
  "Operador",
  "Gerador de caracteres",
  "Efeitos especiais",
  "Animações",
  "Edição de áudio",
  "Locução",
  "Legendagem",
  "Dublagem",
  "Conversão de formatos",
  "Autoração e impressão de DVD",
];

const SOURCES = ["VHS", "S-VHS", "VHS-C", "Hi-8", "Digital-8", "HDV", "Mini-DV", "DV", "DVCAM", "Betacam", "DVD"];

const DELIVERY = ["Arquivo digital", "DVD", "Fita"];

const ALSO_DO = [
  "Institucionais e promocionais",
  "Videoaulas",
  "Treinamentos",
  "Vídeo manual",
  "Segurança do trabalho",
  "Filmagem aérea com drone",
  "Computação gráfica",
  "Vinhetas",
  "Tratamento de imagem",
  "Editoração gráfica",
  "Videoclipes",
  "Video-book",
  "Edição",
  "Dublagem",
  "Legendagem",
  "Locução",
  "Transcrição",
  "Digitalização",
  "Making of",
  "Jingles",
];

const CINEMA_DO = [
  "Produção",
  "Captação",
  "Roteiro",
  "Cenografia",
  "Figurino",
  "Iluminação",
  "Direção de fotografia",
  "Finalização",
  "Transcrição",
  "Telecinagem",
  "Locação de imóveis",
];

function Video() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <img src={HERO} alt="Projetor de cinema projetando um facho de luz em sala escura" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-overlay/75 to-overlay/40" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Produção audiovisual</p>
            <h1 className="mt-3 text-6xl font-semibold leading-[0.95] sm:text-8xl md:text-9xl">
              <span className="text-gradient">Vídeo</span>
            </h1>
            <p className="mt-6 max-w-2xl font-display text-xl md:text-3xl">
              Produção, edição e finalização de ponta a ponta.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ESTRUTURA */}
      <section className="border-y border-border bg-card/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl">
              Estúdio <span className="text-gradient">próprio</span> com ilha de edição, cabine de locução e fundo para fotos.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {STRUCTURE.map(({ Icon, label }, i) => (
              <Reveal key={label} delay={i * 100}>
                <li className="flex items-center gap-4 rounded-2xl border border-border bg-background px-5 py-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium">{label}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* PRODUÇÃO */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
              <Film className="h-5 w-5" />
            </span>
            <h2 className="text-4xl font-semibold md:text-6xl">
              <span className="text-gradient">Produção</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-3">
          {TYPES.map((t, i) => (
            <Reveal key={t} delay={(i % 6) * 60}>
              <span className="inline-block rounded-full border border-border bg-card px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                {t}
              </span>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal>
              <h3 className="font-display text-2xl md:text-3xl">Inclui</h3>
            </Reveal>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {INCLUDES.map((it, i) => (
                <Reveal key={it} delay={(i % 4) * 70}>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{it}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={DRONE}
                alt="Drone em voo durante filmagem aérea"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-gradient-primary px-5 py-4 font-medium text-primary-foreground">
                Filmagem aérea com drone
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDIÇÃO */}
      <section className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1fr_1.15fr] md:px-8">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={ilha}
                alt="Ilha de edição da Energy Produções"
                loading="lazy"
                width={1600}
                height={1008}
                className="aspect-[16/11] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-gradient-primary p-5 text-primary-foreground">
                <Scissors className="h-5 w-5 shrink-0" />
                <p className="font-medium">Horário agendado e acompanhamento do cliente, se quiser</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <Scissors className="h-5 w-5" />
                </span>
                <h2 className="text-4xl font-semibold md:text-6xl">
                  <span className="text-gradient">Edição</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Edição de vídeos profissionais ou caseiros, com horário agendado e acompanhamento do cliente, se quiser.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <h3 className="mt-10 font-display text-xl md:text-2xl">O que fazemos</h3>
            </Reveal>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {EDIT_DO.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 50}>
                  <span className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <h3 className="mt-10 font-display text-xl md:text-2xl">Material de origem</h3>
            </Reveal>
            <div className="mt-5 flex flex-wrap gap-2">
              {SOURCES.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 50}>
                  <span className="rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-10 rounded-2xl border border-border bg-background p-6">
                <p className="flex items-center gap-3 font-medium">
                  <HardDriveDownload className="h-5 w-5 shrink-0 text-primary" />
                  Entrega em
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {DELIVERY.map((t) => (
                    <span key={t} className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINALIZAÇÃO + MOTION */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-8 transition-colors duration-300 hover:border-primary md:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Sparkles className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-3xl font-semibold md:text-4xl">Finalização</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Acabamento com efeitos especiais, modelagem de cenário e inserção de elementos.
              </p>
              <p className="mt-6 inline-flex rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs tracking-wide text-foreground/80">
                After Effects
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-border bg-card p-8 transition-colors duration-300 hover:border-primary md:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Box className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
                Motion graphics <span className="text-gradient">e 3D</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Animação gráfica, modelagem e animação 3D, maquete eletrônica e efeitos visuais.
              </p>
              <p className="mt-6 inline-flex rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs tracking-wide text-foreground/80">
                3ds Max
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRANSMISSÃO AO VIVO */}
      <section className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.15fr_1fr] md:px-8">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <Radio className="h-5 w-5" />
                </span>
                <h2 className="text-4xl font-semibold md:text-6xl">
                  <span className="text-gradient">Transmissão ao vivo</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Transmissão em tempo real na plataforma que você escolher: conferências, palestras, treinamentos,
                coletivas e reuniões.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Câmeras com transmissor sem fio (link) dão mobilidade em campo, e montamos um estúdio de apoio no
                local para entrevistas.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 rounded-2xl border border-border bg-background p-6">
                <p className="flex items-center gap-3 font-medium">
                  <MonitorPlay className="h-5 w-5 shrink-0 text-primary" />
                  Seu público assiste de qualquer lugar, no computador, tablet ou celular.
                </p>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <a
                href="https://www.youtube.com/@EnergyProducoes/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                <Youtube className="h-5 w-5" />
                Ver vídeos no YouTube
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={LIVE}
                alt="Plateia em conferência transmitida ao vivo"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-gradient-primary px-5 py-4 font-medium text-primary-foreground">
                Estúdio de apoio no local para entrevistas
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TAMBÉM FAZEMOS */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
              <Layers className="h-5 w-5" />
            </span>
            <h2 className="text-4xl font-semibold md:text-6xl">
              Também <span className="text-gradient">fazemos</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-3">
          {ALSO_DO.map((t, i) => (
            <Reveal key={t} delay={(i % 6) * 50}>
              <span className="inline-block rounded-full border border-border bg-card px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                {t}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EVENTOS */}
      <section className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1fr_1.15fr] md:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={EVENTS}
                alt="Casamento registrado pela Energy Produções"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-gradient-primary px-5 py-4 font-medium text-primary-foreground">
                Casamentos, aniversários, bodas, desfiles, exposições, congressos, convenções, cirurgias e partos.
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <Heart className="h-5 w-5" />
                </span>
                <h2 className="text-4xl font-semibold md:text-6xl">
                  <span className="text-gradient">Eventos</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Casamentos, aniversários, bodas, desfiles, exposições, congressos, convenções, cirurgias e partos.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Casamentos", "Aniversários", "Bodas", "Desfiles", "Exposições", "Congressos", "Convenções", "Cirurgias", "Partos"].map(
                (t, i) => (
                  <Reveal key={t} delay={(i % 6) * 50}>
                    <span className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                      {t}
                    </span>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CINEMA */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
              <Clapperboard className="h-5 w-5" />
            </span>
            <h2 className="text-4xl font-semibold md:text-6xl">
              <span className="text-gradient">Cinema</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid items-center gap-12 md:grid-cols-[1fr_1.15fr]">
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={CINEMA}
                alt="Claquete em set de filmagem de cinema"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-gradient-primary px-5 py-4 font-medium text-primary-foreground">
                Cinema 16mm e 35mm
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Atuamos também em cinema (16mm e 35mm): produção, captação, roteiro, cenografia, figurino,
                iluminação, direção de fotografia, finalização, transcrição, telecinagem e locação de imóveis.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {CINEMA_DO.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 50}>
                  <span className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
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
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
