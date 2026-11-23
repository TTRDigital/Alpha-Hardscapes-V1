import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Rating";
import type { Feature, ProjectSummary, ServiceSummary, Testimonial } from "@/lib/types";
import { SERVICE_CATEGORY_LABELS } from "@/lib/site";

export function ServiceCard({ service, priority }: { service: ServiceSummary; priority?: boolean }) {
  return (
    <Link href={`/services/${service.slug}/`} className="group card flex flex-col overflow-hidden transition-shadow hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        {service.heroImage && <Img image={service.heroImage} fill priority={priority} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />}
        <span className="absolute left-4 top-4 rounded-full bg-stone-50/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-moss backdrop-blur">{SERVICE_CATEGORY_LABELS[service.category] || service.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="display-sm text-ink">{service.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-stone-700">{service.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-moss">Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

export function ProjectCard({ project, priority, tall }: { project: ProjectSummary; priority?: boolean; tall?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}/`} className="group relative block overflow-hidden rounded-2xl bg-stone-200">
      <div className={`relative ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
        <Img image={project.coverImage} fill priority={priority} sizes="(min-width: 1024px) 560px, (min-width: 640px) 70vw, 130vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-stone-50">
        {project.services?.[0] && <p className="eyebrow-light">{project.services[0].title}</p>}
        <h3 className="display-sm mt-1">{project.title}</h3>
        {project.town && <p className="mt-1 text-sm text-stone-300">{project.town}</p>}
      </div>
    </Link>
  );
}

export function TestimonialCard({ t, compact }: { t: Testimonial; compact?: boolean }) {
  return (
    <figure className={`card flex flex-col p-6 ${compact ? "" : "h-full"}`}>
      <Stars n={t.rating ?? 5} />
      <blockquote className={`mt-4 flex-1 font-display text-ink ${compact ? "text-[17px] leading-snug" : "text-lg leading-snug"}`}>“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {t.avatar ? (
          <Img image={t.avatar} className="h-10 w-10 rounded-full object-cover" sizes="40px" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime font-bold text-ink">{t.name.charAt(0)}</span>
        )}
        <div className="text-sm">
          <p className="font-bold text-ink">{t.name}</p>
          <p className="text-stone-500">{[t.town, t.source ? `${t.source} review` : null].filter(Boolean).join(" · ")}</p>
        </div>
        {t.sourceUrl && <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-auto text-stone-400 hover:text-ink" aria-label={`Read ${t.name}'s review on ${t.source}`}><Icon name="google" className="h-4 w-4" /></a>}
      </figcaption>
    </figure>
  );
}

export function FeatureItem({ f, index, numbered, light }: { f: Feature; index?: number; numbered?: boolean; light?: boolean }) {
  return (
    <div className="flex gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${light ? "bg-white/10 text-lime" : "bg-lime/20 text-moss"}`}>
        {numbered ? <span className="font-display text-lg font-semibold">{(index ?? 0) + 1}</span> : <Icon name={f.icon || "check"} className="h-5 w-5" />}
      </div>
      <div>
        <h3 className={`text-[17px] font-bold ${light ? "text-stone-50" : "text-ink"}`}>{f.title}</h3>
        {f.text && <p className={`mt-1 text-[15px] leading-relaxed ${light ? "text-stone-300" : "text-stone-700"}`}>{f.text}</p>}
      </div>
    </div>
  );
}
