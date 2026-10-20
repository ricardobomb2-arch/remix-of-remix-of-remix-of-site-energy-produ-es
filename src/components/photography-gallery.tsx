import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export type GalleryPhoto = { category: string; src: string; alt: string };

export function PhotographyGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [category, setCategory] = useState("Todas");
  const [selected, setSelected] = useState<number | null>(null);
  const categories = ["Todas", ...new Set(photos.map((photo) => photo.category))];
  const visible = category === "Todas" ? photos : photos.filter((photo) => photo.category === category);
  const active = selected === null ? undefined : visible[selected];

  function move(direction: number) {
    setSelected((current) => current === null ? null : (current + direction + visible.length) % visible.length);
  }

  useEffect(() => {
    if (selected === null || visible.length < 2) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      setSelected((current) => current === null ? null : (current + direction + visible.length) % visible.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, visible.length]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Categorias da galeria">
        {categories.map((name) => (
          <Button key={name} variant={category === name ? "default" : "outline"} aria-pressed={category === name}
            className="h-auto min-h-11 whitespace-normal rounded-full px-5 py-3"
            onClick={() => { setCategory(name); setSelected(null); }}>
            {name}
          </Button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((photo, index) => (
          <Button key={photo.src} variant="ghost" aria-label={`Ampliar foto: ${photo.category}`}
            onClick={() => setSelected(index)}
            className="group relative block h-auto w-full overflow-hidden rounded-2xl border border-border p-0 text-left">
            <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-overlay/90 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 font-display text-lg font-medium text-foreground">{photo.category}</span>
            <span className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-foreground/30 bg-overlay/50 text-foreground"><Expand aria-hidden="true" /></span>
          </Button>
        ))}
      </div>
      <Dialog open={active !== undefined} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogPortal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-overlay/95 backdrop-blur-lg" />
          <DialogPrimitive.Content aria-describedby={undefined} className="fixed inset-x-3 top-1/2 z-[71] mx-auto w-[calc(100%-1.5rem)] max-w-6xl -translate-y-1/2 outline-none sm:inset-x-8 sm:w-[calc(100%-4rem)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <DialogTitle className="text-xl font-medium text-foreground">{active?.category}</DialogTitle>
              <DialogClose asChild><Button variant="outline" size="icon" aria-label="Fechar ampliação" title="Fechar ampliação" className="h-11 w-11 rounded-full"><X /></Button></DialogClose>
            </div>
            {active && <img src={active.src} alt={active.alt} className="max-h-[72svh] w-full rounded-lg object-contain" />}
            {visible.length > 1 && <div className="mt-4 flex items-center justify-center gap-5">
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-full" aria-label="Foto anterior" title="Foto anterior" onClick={() => move(-1)}><ChevronLeft /></Button>
              <span className="min-w-14 text-center text-sm text-muted-foreground">{selected === null ? 0 : selected + 1} / {visible.length}</span>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-full" aria-label="Próxima foto" title="Próxima foto" onClick={() => move(1)}><ChevronRight /></Button>
            </div>}
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}