"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { QuoteButton } from "@/components/forms/QuoteDialog";

/** Slim sticky call / quote bar on phones. On the home page it appears once the hero scrolls away. */
export function MobileBar({ phoneE164, ctaLabel, formKey }: { phoneE164: string; ctaLabel: string; formKey?: string }) {
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const hidden = pathname === "/" && !past;
  return (
    <div className={`fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 pb-[env(safe-area-inset-bottom)] transition-all duration-300 md:hidden print:hidden ${hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"}`} aria-hidden={hidden}>
      <a href={`tel:${phoneE164}`} tabIndex={hidden ? -1 : 0} className="flex items-center justify-center rounded-full bg-white py-3.5 text-[15px] font-medium text-ink shadow-[0_8px_30px_-8px_rgb(0_0_0/0.35)] ring-1 ring-line">Call</a>
      <QuoteButton formKey={formKey} className="flex items-center justify-center rounded-full bg-ink py-3.5 text-[15px] font-medium text-white shadow-[0_8px_30px_-8px_rgb(0_0_0/0.45)]">{ctaLabel}</QuoteButton>
    </div>
  );
}
