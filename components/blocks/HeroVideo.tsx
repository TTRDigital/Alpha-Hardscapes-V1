"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background video for the home hero (same clip as the live site). The still image is rendered
 * underneath by the page and is what loads first; the video only starts downloading after the
 * page has finished loading, so it never delays the first paint. "Reduce motion" keeps the still.
 */
export function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    const start = () => {
      v.src = src;
      v.play().catch(() => {});
    };
    const later = () => setTimeout(start, 1200);
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
    return () => window.removeEventListener("load", later);
  }, [src]);
  return (
    <video
      ref={ref}
      className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setReady(true)}
    />
  );
}
