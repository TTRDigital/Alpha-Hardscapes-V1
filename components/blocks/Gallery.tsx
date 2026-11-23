"use client";

import { useCallback, useEffect, useState } from "react";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import type { Img as ImgT } from "@/lib/types";

/** Photo grid with a lightweight lightbox (keyboard: Esc, ← →). */
export function Gallery({ images, columns = 3 }: { images: ImgT[]; columns?: 2 | 3 | 4 }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? null : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [open, close, step]);

  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <>
      <div className={`grid grid-cols-1 gap-4 ${cols}`}>
        {images.map((im, i) => (
          <button key={i} type="button" onClick={() => setOpen(i)} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-mist text-left" aria-label={`Open photo: ${im.alt}`}>
            <Img image={im} fill sizes="(min-width: 1024px) 600px, (min-width: 640px) 70vw, 130vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" />
          </button>
        ))}
      </div>
      {open !== null && images[open] && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 flex items-center justify-center bg-ink/97 p-4" onClick={close}>
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-stone-50 hover:bg-white/20"><Icon name="close" className="h-5 w-5" /></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-stone-50 hover:bg-white/20"><Icon name="arrow" className="h-5 w-5 rotate-180" /></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-stone-50 hover:bg-white/20"><Icon name="arrow" className="h-5 w-5" /></button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Img image={images[open]} className="max-h-[80vh] w-auto rounded-lg object-contain" sizes="100vw" />
            <figcaption className="mt-3 text-center text-sm text-stone-300">{images[open].caption || images[open].alt} <span className="text-stone-500">· {open + 1} / {images.length}</span></figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
