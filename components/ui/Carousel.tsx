"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal carousel: a swipeable track of slides with previous / next buttons and a
 * "01 / 08" counter. Every slide is in the page's HTML (search engines and screen readers
 * see all of them); the buttons only scroll the track.
 */
export function Carousel({ children, label, slideClass = "w-[82%] sm:w-[58%] lg:w-[44%]", dark = false, controlsClass = "" }: { children: React.ReactNode; label: string; slideClass?: string; dark?: boolean; controlsClass?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const slides = Children.toArray(children);
  const count = slides.length;

  const update = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const items = [...t.children] as HTMLElement[];
    const left = t.scrollLeft + 1;
    let i = 0;
    items.forEach((el, k) => { if (el.offsetLeft - items[0].offsetLeft <= left) i = k; });
    setIndex(i);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { t.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const t = track.current;
    if (!t) return;
    const items = [...t.children] as HTMLElement[];
    const next = Math.max(0, Math.min(count - 1, index + dir));
    t.scrollTo({ left: items[next].offsetLeft - items[0].offsetLeft, behavior: "smooth" });
  };

  const btn = `flex h-11 w-11 items-center justify-center rounded-full ring-1 transition-colors disabled:opacity-30 ${dark ? "text-white ring-white/30 hover:bg-white hover:text-ink" : "text-ink ring-ink/20 hover:bg-ink hover:text-white"}`;
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul ref={track} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-6 md:-mx-10 md:scroll-px-10 md:px-10 lg:gap-6" tabIndex={0}>
        {slides.map((s, i) => (
          <li key={i} className={`shrink-0 snap-start ${slideClass}`} aria-label={`${i + 1} of ${count}`}>{s}</li>
        ))}
      </ul>
      {count > 1 && (
        <div className={`mt-2 flex items-center gap-4 ${controlsClass}`}>
          <button type="button" className={btn} onClick={() => go(-1)} disabled={index === 0} aria-label="Previous">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <span className={`min-w-[4.5rem] text-center font-sans text-[11px] font-semibold tracking-[0.2em] ${dark ? "text-white/70" : "text-subtle"}`} aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button type="button" className={btn} onClick={() => go(1)} disabled={atEnd} aria-label="Next">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
