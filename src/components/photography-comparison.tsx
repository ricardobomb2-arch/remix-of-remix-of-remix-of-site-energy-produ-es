import { useState, type CSSProperties } from "react";
import { Slider } from "@/components/ui/slider";

type ComparisonProps = {
  beforeSrc: string;
  afterSrc?: string;
  alt: string;
};

/** Explicit pairs show real edits; a single source is clearly labeled as a treatment demonstration. */
export function PhotographyComparison({ beforeSrc, afterSrc, alt }: ComparisonProps) {
  const [position, setPosition] = useState(50);
  const demonstration = !afterSrc;
  return (
    <figure className="m-0">
      {demonstration && <figcaption className="mb-4 text-sm text-muted-foreground">Demonstração de tratamento</figcaption>}
      <div className="photo-comparison" style={{ "--comparison-position": `${position}%` } as CSSProperties}>
        <img src={beforeSrc} alt={alt} loading="lazy" draggable={false} className="photo-comparison-image" />
        <div className="photo-comparison-after" aria-hidden="true">
          <img src={afterSrc ?? beforeSrc} alt="" loading="lazy" draggable={false} className={`photo-comparison-image${demonstration ? " photo-comparison-treatment" : ""}`} />
        </div>
        <span className="photo-comparison-label photo-comparison-label--before">Antes</span>
        <span className="photo-comparison-label photo-comparison-label--after">Depois</span>
        <span className="photo-comparison-divider" aria-hidden="true" />
        <Slider className="photo-comparison-slider" min={0} max={100} step={1} value={[position]}
          onValueChange={(values) => setPosition(values[0] ?? 50)} aria-label="Comparar foto antes e depois"
          aria-valuetext={`${position}% antes, ${100 - position}% depois`} />
      </div>
    </figure>
  );
}