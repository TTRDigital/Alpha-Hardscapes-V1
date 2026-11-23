import type { ReactNode } from "react";

export function Section({ children, className = "", id, tone = "light" }: { children: ReactNode; className?: string; id?: string; tone?: "light" | "muted" | "dark" | "white" }) {
  const tones = { light: "bg-stone-50", muted: "bg-stone-100", dark: "bg-ink text-stone-50", white: "bg-white" };
  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, light, align = "left", as: As = "h2" }: { eyebrow?: string; title: string; text?: string; light?: boolean; align?: "left" | "center"; as?: "h1" | "h2" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={light ? "eyebrow-light" : "eyebrow"}>{eyebrow}</p>}
      <As className={`display-lg mt-3 ${light ? "text-stone-50" : "text-ink"}`}>{title}</As>
      {text && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-stone-300" : "text-stone-700"}`}>{text}</p>}
    </div>
  );
}
