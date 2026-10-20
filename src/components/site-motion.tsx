import { Children, Fragment, isValidElement, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";

/** A foto mantém o enquadramento original e acompanha a rolagem mais devagar, sem mover o conteúdo. */
export function HeroParallax({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = ref.current;
    const image = imageRef.current;
    if (!container || !image) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (media.matches) {
        image.style.removeProperty("transform");
        return;
      }
      const bounds = container.getBoundingClientRect();
      const offset = Math.min(Math.max(-bounds.top, 0), bounds.height) * 0.18;
      image.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    resize?.observe(container);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
      image.style.removeProperty("transform");
    };
  }, []);

  return (
    <div ref={ref} className="hero-parallax w-full shrink-0 overflow-hidden">
      <img ref={imageRef} src={src} alt={alt} fetchPriority="high" className="block w-full object-contain motion-safe:will-change-transform" />
    </div>
  );
}

/** A softly textured warm beam is confined to dark section backgrounds, never a replacement cursor. */
export function SceneLight() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let active: HTMLElement | null = null;
    let frame = 0;
    const colorCanvas = document.createElement("canvas");
    colorCanvas.width = colorCanvas.height = 1;
    let colorContext: CanvasRenderingContext2D | null = null;
    const clear = () => {
      cancelAnimationFrame(frame);
      active?.removeAttribute("data-scene-light");
      active = null;
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse" || !(event.target instanceof Element)) { clear(); return; }
      const section = event.target.closest<HTMLElement>("main section");
      if (!section || event.target.closest("img, video, iframe, .photo-comparison, .tilt") || section.querySelector(":scope > img, :scope > .hero-parallax")) { clear(); return; }
      // Resolve translucent section backgrounds against their dark ancestor surfaces.
      let surface: HTMLElement | null = section;
      let dark = false;
      while (surface) {
        const color = getComputedStyle(surface).backgroundColor;
        let channels: number[] | undefined;
        if (color.startsWith("rgb")) {
          channels = color.match(/[\d.]+/g)?.map(Number);
        } else {
          colorContext ??= colorCanvas.getContext("2d", { willReadFrequently: true });
          if (colorContext) {
            colorContext.clearRect(0, 0, 1, 1);
            colorContext.fillStyle = color;
            colorContext.fillRect(0, 0, 1, 1);
            const pixel = colorContext.getImageData(0, 0, 1, 1).data;
            channels = [pixel[0] ?? 255, pixel[1] ?? 255, pixel[2] ?? 255, (pixel[3] ?? 0) / 255];
          }
        }
        if (channels && channels.length >= 3 && (channels[3] ?? 1) > 0.05) {
          dark = ((channels[0] ?? 255) * .2126 + (channels[1] ?? 255) * .7152 + (channels[2] ?? 255) * .0722) < 95;
          break;
        }
        surface = surface.parentElement;
      }
      if (!dark) { clear(); return; }
      if (active !== section) { clear(); active = section; }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect();
        section.style.setProperty("--scene-x", `${event.clientX - bounds.left}px`);
        section.style.setProperty("--scene-y", `${event.clientY - bounds.top}px`);
        section.setAttribute("data-scene-light", "active");
      });
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) clear(); };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave);
    document.addEventListener("scroll", clear, { passive: true });
    document.addEventListener("visibilitychange", clear);
    window.addEventListener("blur", clear);
    media.addEventListener("change", clear);
    return () => {
      clear();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("scroll", clear);
      document.removeEventListener("visibilitychange", clear);
      window.removeEventListener("blur", clear);
      media.removeEventListener("change", clear);
    };
  }, [pathname]);
  return null;
}

/** Anel dourado apenas no clique e moldura de câmera sobre imagens; o ponteiro nativo e os cliques ficam intactos. */
export function CameraCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let clickTimer: ReturnType<typeof setTimeout> | undefined;
    const clearFrame = () => { el.dataset["mode"] = ""; };
    // Localizador de clique: anel dourado sutil no ponto clicado, que some sozinho.
    const pulse = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return;
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      el.classList.remove("is-clicked");
      void el.offsetWidth;
      el.classList.add("is-clicked");
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => el.classList.remove("is-clicked"), 700);
    };
    // A moldura "quadrada" segue o mouse somente sobre imagens.
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse" || !(event.target instanceof Element)) {
        clearFrame();
        return;
      }
      const target = event.target;
      if (target.closest('input, textarea, select, [contenteditable="true"], iframe, [disabled]')) {
        clearFrame();
        return;
      }
      if (!target.closest("img, .tilt")) {
        clearFrame();
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.dataset["mode"] = "photo";
        el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      });
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) clearFrame(); };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave);
    document.addEventListener("pointerdown", pulse);
    document.addEventListener("scroll", clearFrame, { passive: true });
    document.addEventListener("visibilitychange", clearFrame);
    window.addEventListener("blur", clearFrame);
    media.addEventListener("change", clearFrame);
    return () => {
      clearFrame();
      cancelAnimationFrame(frame);
      clearTimeout(clickTimer);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("pointerdown", pulse);
      document.removeEventListener("scroll", clearFrame);
      document.removeEventListener("visibilitychange", clearFrame);
      window.removeEventListener("blur", clearFrame);
      media.removeEventListener("change", clearFrame);
    };
  }, [pathname]);

  return (
    <>
    <SceneLight />
    <div ref={ref} className="camera-cursor" data-mode="" aria-hidden="true">
      <span className="camera-cursor-ring" />
      <span className="camera-cursor-frame"><i /><i /><i /><i /></span>
    </div>
    </>
  );
}

type SplitUnit = { text: string; className?: string | undefined } | { node: ReactElement };

/** Divide o título em palavras, guardando a classe de cada span inline (ex.: text-gradient). */
function collectSplitUnits(children: ReactNode): SplitUnit[] {
  const units: SplitUnit[] = [];
  Children.toArray(children).forEach((child) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child).split(/\s+/).filter(Boolean).forEach((word) => units.push({ text: word }));
      return;
    }
    if (!isValidElement(child)) return;
    const element = child as ReactElement<{ className?: string; children?: ReactNode }>;
    const inner = element.props.children;
    const word = typeof inner === "string" || typeof inner === "number" ? String(inner) : "";
    // Uma só palavra dentro do span ganha a classe dele; frases maiores sobem juntas para não quebrar o gradiente.
    if (word && word === word.trim() && !/\s/.test(word)) {
      units.push({ text: word, className: element.props.className });
      return;
    }
    units.push({ node: element });
  });
  return units;
}

/** A cortina de navegação cobre a tela por um instante; a entrada da primeira tela espera ela subir. */
const SPLIT_CURTAIN_WAIT = 260;

/** Título que sobe palavra por palavra atrás de uma máscara quando entra na tela. */
export function SplitText({ children, className = "", as = "h2", step = 70 }: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  step?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const units = useMemo(() => collectSplitUnits(children), [children]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("is-split-visible");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      show();
      return;
    }
    const bounds = el.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      const timer = setTimeout(show, SPLIT_CURTAIN_WAIT);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      show();
    }, { threshold: 0.2, rootMargin: "0px 0px -24px 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [units.length]);

  const words = units.map((unit, index) => (
    <Fragment key={index}>
      {index > 0 ? " " : null}
      <span className="split-unit" style={{ "--split-i": `${index}`, "--split-step": `${step}ms` } as CSSProperties}>
        <span className="split-unit-inner">
          {"text" in unit ? <span className={unit.className}>{unit.text}</span> : unit.node}
        </span>
      </span>
    </Fragment>
  ));
  const root = `split-text ${className}`.trim();

  if (as === "h1") return <h1 ref={ref} className={root}>{words}</h1>;
  if (as === "h3") return <h3 ref={ref} className={root}>{words}</h3>;
  return <h2 ref={ref} className={root}>{words}</h2>;
}

/** Número que conta de 0 até o valor quando entra na tela. */
export function CountUp({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = (n: number) => { el.textContent = `${Math.round(n)}${suffix}`; };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      render(value);
      return;
    }
    render(0);
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1600;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        render(value * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, suffix]);

  return <span ref={ref} className={className}>{`0${suffix}`}</span>;
}

/** Barra dourada fininha no topo mostrando o progresso da rolagem. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}

/** Leve inclinação 3D (até ~5°) na direção do mouse; desliga com movimento reduzido. */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
    </div>
  );
}

/** Shared observer keeps entrances ordered without creating a timer per block. */
export function ScrollReveals() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;

    const blocks = Array.from(document.querySelectorAll<HTMLElement>(
      "main .reveal, main section:not(:has(.reveal)) > div",
    ));
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let fastUntil = 0;
    const onScroll = () => {
      const now = performance.now();
      if (Math.abs(window.scrollY - lastScroll) / Math.max(now - lastTime, 1) > 1.5) {
        fastUntil = now + 250;
        blocks.forEach((block) => block.style.setProperty("--reveal-delay", "0ms"));
      }
      lastScroll = window.scrollY;
      lastTime = now;
    };

    const show = (block: HTMLElement, delay = 0) => {
      block.style.setProperty("--reveal-delay", `${delay}ms`);
      block.classList.add("is-visible");
      observer.unobserve(block);
    };
    const observer = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting || entry.boundingClientRect.bottom < 0)
        .sort((a, b) => blocks.indexOf(a.target as HTMLElement) - blocks.indexOf(b.target as HTMLElement));
      entering.forEach((entry, index) => {
        const block = entry.target as HTMLElement;
        // Never queue a long entrance for someone scrolling quickly or returning above a block.
        const immediate = performance.now() < fastUntil || entry.boundingClientRect.bottom < 0;
        show(block, immediate ? 0 : Math.min(index * 500, 1000));
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    blocks.forEach((block) => {
      block.classList.add("reveal");
      if (block.classList.contains("is-visible")) return;
      // The first viewport stays readable immediately, including direct links and restored scroll.
      const bounds = block.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        block.classList.add("is-visible");
      } else {
        block.classList.add("is-pending");
        observer.observe(block);
      }
    });

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const block = event.target.closest<HTMLElement>(".reveal");
      if (block) show(block);
    };
    const onMotionChange = () => {
      if (media.matches) blocks.forEach((block) => show(block));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocus);
    media.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocus);
      media.removeEventListener("change", onMotionChange);
      blocks.forEach((block) => {
        block.classList.remove("is-pending");
        block.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}

/** Router events cover every internal link and browser back/forward without intercepting clicks. */
export function PageCurtain() {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const cycle = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let started = 0;
    let active = false;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    let endTimer: ReturnType<typeof setTimeout> | undefined;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;
    const clearTimers = () => {
      clearTimeout(revealTimer);
      clearTimeout(endTimer);
      clearTimeout(safetyTimer);
    };
    const finish = () => {
      clearTimers();
      active = false;
      setPhase("idle");
    };
    const before = router.subscribe("onBeforeNavigate", (event) => {
      if (!event.fromLocation || !event.pathChanged || media.matches) return;
      clearTimers();
      cycle.current += 1;
      active = true;
      started = performance.now();
      setPhase("covering");
      // A failed or cancelled navigation must never leave the screen covered.
      safetyTimer = setTimeout(finish, 4000);
    });
    const resolved = router.subscribe("onResolved", () => {
      if (!active) return;
      clearTimeout(revealTimer);
      revealTimer = setTimeout(() => {
        clearTimeout(safetyTimer);
        setPhase("revealing");
        endTimer = setTimeout(finish, 420);
      }, Math.max(0, 320 - (performance.now() - started)));
    });
    const onMotionChange = () => { if (media.matches) finish(); };
    media.addEventListener("change", onMotionChange);
    return () => {
      before();
      resolved();
      clearTimers();
      media.removeEventListener("change", onMotionChange);
    };
  }, [router]);

  return <div key={cycle.current} className={`page-curtain page-curtain--${phase}`} aria-hidden="true" />;
}