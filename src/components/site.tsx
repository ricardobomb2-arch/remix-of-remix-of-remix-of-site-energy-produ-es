import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail, Facebook, Instagram, Youtube, Twitter, MessageCircle } from "lucide-react";
import energyLogo from "@/assets/energy-logo.png";

export const WHATSAPP_URL = "https://wa.me/5511947369785";

export const NAV = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/video", label: "Vídeo" },
  { to: "/fotografia", label: "Fotografia" },
  { to: "/multimidia", label: "Multimídia" },
  { to: "/portfolio", label: "Portfólio" },
  { to: "/orcamento", label: "Orçamento" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight" aria-label="Energy Produções — Início">
          <span className="text-gradient">Energy</span> <span className="text-muted-foreground">Produções</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-overlay/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-card p-6 transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-border"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
          <nav className="mt-8 flex flex-col gap-1" aria-label="Menu móvel">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-display text-2xl text-foreground/80 transition-colors hover:bg-accent hover:text-foreground data-[status=active]:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}

const SOCIAL = [
  { href: "https://www.facebook.com/energyproducoesoficial/", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/abelenergy/", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/c/EnergyProducoes", label: "YouTube", Icon: Youtube },
  { href: "https://twitter.com/Abel4b3l", label: "X (Twitter)", Icon: Twitter },
];

export function EnergyLogo({ className = "", drawOnLoad = false }: { className?: string; drawOnLoad?: boolean }) {
  const [lit, setLit] = useState(false);
  const img = (
    <img
      src={energyLogo}
      alt="Logo da Energy Produções"
      className={`energy-logo object-contain ${drawOnLoad ? "logo-draw-img " : ""}${className}${lit ? " is-lit" : ""}`}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") setLit((value) => !value);
      }}
    />
  );
  if (!drawOnLoad) return img;
  return (
    <span className={`logo-draw relative inline-block ${className}`}>
      <svg className="logo-draw-svg absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path
          className="logo-draw-trace"
          pathLength={1}
          d="M 50 6 A 44 44 0 1 0 84 74"
          stroke="var(--gold)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <path
          className="logo-draw-trace"
          pathLength={1}
          d="M 66 36 C 66 24 46 22 39 38 C 31 56 42 74 58 72 C 69 70 74 61 71 55 C 68 49 56 50 38 53"
          stroke="var(--gold)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </svg>
      {img}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">
            <span className="text-gradient">Energy</span> Produções
          </p>
          <EnergyLogo className="mt-6 h-28 w-28" />
        </div>
        <nav aria-label="Menu do rodapé" className="grid grid-cols-2 gap-2 text-sm">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground transition-colors hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-3 text-sm">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Phone className="h-4 w-4" /> (11) 94736-9785
          </a>
          <a href="mailto:abel@energyproducoes.com.br" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Mail className="h-4 w-4" /> abel@energyproducoes.com.br
          </a>
          <div className="flex gap-2 pt-2">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © Energy Produções - Todos os direitos reservados
      </p>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-glow transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`reveal ${className}`} data-reveal-order={delay}>
      {children}
    </div>
  );
}

export function ComingSoon({ title }: { title: string }) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-5 pt-32 md:px-8">
      <h1 className="text-5xl font-semibold md:text-7xl">{title}</h1>
      <p className="mt-4 text-muted-foreground">Página em construção.</p>
    </section>
  );
}

export function pageHead(title: string, description: string, image?: string) {
  const t = `${title} | Energy Produções`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
    ],
  };
}
