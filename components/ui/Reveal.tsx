"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Fades children in when they scroll into view. Content is visible without JS. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    // Only elements below the fold animate in; anything already visible stays visible.
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) el.dataset.reveal = "pending";
    else return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { el.dataset.reveal = "shown"; io.disconnect(); }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
