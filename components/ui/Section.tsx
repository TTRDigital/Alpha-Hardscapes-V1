import type { ReactNode } from "react";

export function Section({ children, className = "", id, tone = "light" }: { children: ReactNode; className?: string; id?: string; tone?: "light" | "muted" | "dark" | "white" }) {
  const tones = { light: "bg-paper", muted: "bg-mist", dark: "bg-ink text-white", white: "bg-white" };
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 lg:py-32 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Section heading: small numbered mono label + large heading + optional text, all left aligned. */
export function SectionHeading({ eyebrow, title, text, light, index, as: As = "h2", action }: { eyebrow?: string; title: string; text?: string; light?: boolean; index?: string; as?: "h1" | "h2"; action?: ReactNode; align?: "left" | "center" }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className={light ? "label-light" : "label"}>{index ? `(${index}) ` : ""}{eyebrow}</p>}
        <As className={`h-lg mt-4 ${light ? "text-white" : "text-ink"}`}>{title}</As>
        {text && <p className={`mt-5 max-w-2xl text-[1.1rem] leading-relaxed ${light ? "text-white/60" : "text-muted"}`}>{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
