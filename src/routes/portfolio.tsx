import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Play, X } from "lucide-react";
import { Reveal, WHATSAPP_URL, pageHead } from "@/components/site";
import { Tilt } from "@/components/site-motion";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead(
      "Portfólio",
      "Portfólio — Energy Produções: alguns dos nossos trabalhos em vídeo.",
    ),
  component: Portfolio,
});

const VIDEOS = [
  { id: "EInV1MbpBuk", title: "Clip do 7º Cabelos & Cia" },
  { id: "772FKx_kRgA", title: "Clip de Abertura do Prêmio - 7º Cabelos & Cia" },
  { id: "0YS0enE2Ux4", title: "Duratex - Sustentabilidade 2016" },
  { id: "DuKcHTv-aRI", title: "Plataformas - 7º Cabelos & Cia" },
  { id: "dxWbFEjFV3w", title: "Arezzo - Alto Verão 2017" },
  { id: "G5quM11LhSI", title: "Arezzo - Viva o nosso Natal" },
  { id: "qIALzK3URnM", title: "Como é realizado o serviço de Conversão de Filme" },
  { id: "48V_DP5R_GA", title: "Conjunto Conector Derivação para redes de média tensão energizadas" },
  { id: "MX0I22RLE38", title: "AES Eletropaulo - Equipamento para Conexão Temporária de Linhas de Subtransmissão" },
  { id: "vucjeq1C9MU", title: "Fornos Promaq - Expopizzaria 2016" },
  { id: "Mya5JjTeMD4", title: "Duratex - Mensagem" },
  { id: "8jG2PE6MdTw", title: "IMAP - 2016" },
  { id: "u8nzabbe1kc", title: "AES Brasil - Mudanças" },
  { id: "EyP_wm7LUE8", title: "SPTurismo - Natal Iluminado" },
  { id: "z1IiSE_CJuE", title: "Linde Gases - Unidade de Cubatão" },
  { id: "FK4vURiev2o", title: "AES Eletropaulo - Eficiência Energética no Hospital do Servidor Público Estadual" },
  { id: "Evu47T143pA", title: "Feira Pet South America - Real H Nutrição e Saúde Animal" },
  { id: "QrSA1GYylEw", title: "Shell JD Cocenzo - Treinamento Descarga de Combustível" },
  { id: "jb4a2DBBKO0", title: "AES Serviços - Corte e Religa" },
  { id: "Ebzuz-qs9Fc", title: "Feira EMóbile - Evento de Premiação" },
  { id: "Bmi7ervIKwg", title: "AES Eletropaulo - Entrega de Aquecedores Solares nas comunidades" },
  { id: "zYGnaEXryhY", title: "AES Brasil - Festa de Final de Ano" },
  { id: "JCwLSbodp7M", title: "AES Eletropaulo - Making Of da Festa de Final de Ano" },
  { id: "oRjTwtYd2K8", title: "AES Eletropaulo - Chave Faca - Automação da Distribuição" },
  { id: "c_XfV3eWZz4", title: "Mensagem do VP - Dia do Atendente" },
  { id: "0mlkvP45tjw", title: "AES Eletropaulo - Semana de Inovação" },
  { id: "yh_CpDJqn4I", title: "AES Eletropaulo - Projeto Piloto com depoimentos dos funcionários" },
  { id: "KP4pS1DcMOk", title: "SPTurismo - Lançamento do Livro São Paulo Minha Cidade" },
  { id: "YKtLh6ZKGWE", title: "Show Jorge e Mateus no CTN" },
  { id: "N2n4oj1QU2I", title: "Laboratório EMS - XIX Congresso Paulista de Obstetrícia e Ginecologia" },
  { id: "3lgN5_lb1gs", title: "Vinheta do programa Guarulhos em Cartaz" },
  { id: "hmDl0oXyKBw", title: "AES Brasil - Mudança para a Nova Sede" },
];

function Portfolio() {
  const [active, setActive] = useState<(typeof VIDEOS)[number] | null>(null);
  const [broken, setBroken] = useState<Set<string>>(new Set());

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  const visible = VIDEOS.filter((v) => !broken.has(v.id));

  return (
    <>
      {/* CABEÇALHO */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <Reveal>
          <h1 className="text-6xl font-semibold leading-[0.95] sm:text-8xl md:text-9xl">
            <span className="text-gradient">Portfólio</span>
          </h1>
          <p className="mt-6 max-w-2xl font-display text-xl md:text-3xl">
            Alguns dos nossos trabalhos.
          </p>
        </Reveal>
      </section>

      {/* GRADE DE VÍDEOS */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 80}>
              <Tilt className="tilt-zoom">
              <button
                type="button"
                onClick={() => setActive(v)}
                className="group block w-full overflow-hidden rounded-3xl border border-border bg-card text-left transition-colors duration-300 hover:border-primary"
                aria-label={`Assistir: ${v.title}`}
              >
                <span className="relative block aspect-video overflow-hidden">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="tilt-zoom-img h-full w-full object-cover"
                    onError={() =>
                      setBroken((prev) => {
                        if (prev.has(v.id)) return prev;
                        const next = new Set(prev);
                        next.add(v.id);
                        return next;
                      })
                    }
                  />
                  <span className="absolute inset-0 grid place-items-center bg-overlay/30 transition-colors duration-300 group-hover:bg-overlay/10">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </span>
                </span>
                <span className="block px-5 py-4 font-medium leading-snug">{v.title}</span>
              </button>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <section className="border-t border-border bg-card/40 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <Reveal>
            <p className="font-display text-3xl md:text-5xl">
              Tem um projeto em mente? <span className="text-gradient">Fale com a gente.</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/orcamento"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Pedir orçamento
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 font-medium transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-5 w-5" />
                Chamar no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PLAYER EM JANELA */}
      {active && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-overlay/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <p className="truncate font-medium">{active.title}</p>
              <button
                type="button"
                onClick={close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
