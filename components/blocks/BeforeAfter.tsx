"use client";

import { useId, useState } from "react";
import { Img } from "@/components/ui/Img";
import type { Img as ImgT } from "@/lib/types";

/** Before/after comparison with a draggable divider (a native range input, so it works with keyboard and touch). */
export function BeforeAfter({ before, after, className = "" }: { before: ImgT; after: ImgT; className?: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className={`relative aspect-[4/3] select-none overflow-hidden rounded-2xl bg-stone-200 ${className}`}>
      <Img image={after} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img image={before} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lift">↔</span>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-stone-50">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">After</span>
      <label htmlFor={id} className="sr-only">Compare before and after</label>
      <input id={id} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}
