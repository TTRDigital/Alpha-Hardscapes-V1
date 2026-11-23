"use client";

import { useId, useState } from "react";
import { Img } from "@/components/ui/Img";
import type { Img as ImgT } from "@/lib/types";

/** Before/after comparison with a draggable divider (a native range input, so it works with keyboard and touch). */
export function BeforeAfter({ before, after, className = "" }: { before: ImgT; after: ImgT; className?: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const w = after.width ?? 1200;
  const h = after.height ?? 900;
  return (
    <div className={`relative mx-auto w-full select-none overflow-hidden rounded-lg bg-mist ${className}`} style={{ aspectRatio: `${w} / ${h}`, maxWidth: Math.max(360, Math.round(w / 1.15)) }}>
      <Img image={after} fill sizes={`${Math.round(w / 1.15)}px`} quality={90} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img image={before} fill sizes={`${Math.round(w / 1.15)}px`} quality={90} className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[13px] text-ink">↔</span>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 font-mono text-[11px] uppercase tracking-wider text-white drop-shadow">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 font-mono text-[11px] uppercase tracking-wider text-white drop-shadow">After</span>
      <label htmlFor={id} className="sr-only">Compare before and after</label>
      <input id={id} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}
