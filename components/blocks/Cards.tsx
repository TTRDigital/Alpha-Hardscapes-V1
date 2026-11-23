import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Stars } from "@/components/ui/Rating";
import type { Feature, ProjectSummary, ServiceSummary, Testimonial } from "@/lib/types";
import { SERVICE_CATEGORY_LABELS } from "@/lib/site";

/** Flat image + title. No box, no shadow. */
export function ServiceCard({ service, priority, showExcerpt = true }: { service: ServiceSummary; priority?: boolean; showExcerpt?: boolean }) {
  return (
    <Link href={`/services/${service.slug}/`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist">
        {service.heroImage && <Img image={service.heroImage} fill priority={priority} sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" />}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="h-sm text-ink">{service.shortTitle || service.title}</h3>
        <span className="text-[13px] text-subtle">{SERVICE_CATEGORY_LABELS[service.category] || ""}</span>
      </div>
      {showExcerpt && <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-muted">{service.excerpt}</p>}
    </Link>
  );
}

export function ProjectCard({ project, priority, aspect = "aspect-[4/3]" }: { project: ProjectSummary; priority?: boolean; tall?: boolean; aspect?: string }) {
  return (
    <Link href={`/projects/${project.slug}/`} className="group block">
      <div className={`relative overflow-hidden rounded-lg bg-mist ${aspect}`}>
        <Img image={project.coverImage} fill priority={priority} sizes="(min-width: 1024px) 640px, (min-width: 640px) 70vw, 130vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" />
      </div>
      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="h-sm text-ink">{project.title}</h3>
        <span className="text-[13px] text-subtle sm:shrink-0">{project.town || project.services?.[0]?.title}</span>
      </div>
    </Link>
  );
}

/** Plain quote: stars, text, name. Separated by a hairline, no card. */
export function TestimonialCard({ t, compact }: { t: Testimonial; compact?: boolean }) {
  return (
    <figure className="flex h-full flex-col border-t border-line pt-6">
      <Stars n={t.rating ?? 5} className="text-[13px] text-ink" />
      <blockquote className={`mt-4 flex-1 text-ink ${compact ? "text-[16px] leading-relaxed" : "text-[1.15rem] leading-[1.55] tracking-[-0.01em]"}`}>“{t.quote}”</blockquote>
      <figcaption className="mt-6 text-[14px]">
        <span className="font-medium text-ink">{t.name}</span>
        <span className="text-subtle"> · {[t.town, t.source ? `${t.source}` : null].filter(Boolean).join(" · ")}</span>
      </figcaption>
    </figure>
  );
}

export function FeatureItem({ f, index, numbered, light }: { f: Feature; index?: number; numbered?: boolean; light?: boolean }) {
  return (
    <div className={`border-t pt-5 ${light ? "border-white/15" : "border-line"}`}>
      {numbered && <p className={`font-mono text-[12px] ${light ? "text-white/50" : "text-subtle"}`}>{String((index ?? 0) + 1).padStart(2, "0")}</p>}
      <h3 className={`text-[17px] font-medium tracking-[-0.01em] ${numbered ? "mt-3" : ""} ${light ? "text-white" : "text-ink"}`}>{f.title}</h3>
      {f.text && <p className={`mt-2 text-[15px] leading-relaxed ${light ? "text-white/60" : "text-muted"}`}>{f.text}</p>}
    </div>
  );
}
