import Link from "next/link";
import Script from "next/script";
import type { Atom, BoxAtom, ButtonAtom, FaqAtom, GalleryAtom, HeadingAtom, ListAtom, ReviewsAtom, SiteSettings } from "@/lib/types";
import { RichText } from "@/components/blocks/RichText";
import { ReelVideo } from "@/components/blocks/ReelVideo";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { Carousel } from "@/components/ui/Carousel";
import { LeadForm } from "@/components/forms/LeadForm";
import { QuoteButton } from "@/components/forms/QuoteDialog";

/* ---------- headings ---------- */
const H_CLASS: Record<number, string> = { 1: "h-xl", 2: "h-lg", 3: "h-md", 4: "h-sm", 5: "eyebrow", 6: "eyebrow" };

export function Heading({ a, className = "", dark }: { a: HeadingAtom; className?: string; dark?: boolean }) {
  const level = Math.min(Math.max(a.level || 2, 1), 6);
  const Tag = `h${level}` as "h1";
  const lines = a.text.split("\n");
  const text = lines.map((l, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {l}
    </span>
  ));
  const cls = `${level >= 5 && dark ? "eyebrow-light" : H_CLASS[level]} ${className}`;
  return <Tag className={cls}>{a.href ? <SmartLink href={a.href} className="hover:underline">{text}</SmartLink> : text}</Tag>;
}

/* ---------- links and buttons ---------- */
export function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (/^(tel|mailto):|^#/.test(href)) return <a href={href} className={className}>{children}</a>;
  if (/^https?:\/\//.test(href)) return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link href={href} className={className}>{children}</Link>;
}

const GENERIC = /^(learn more|read more|click here|see more|more)$/i;

export function Buttons({ items, dark, className = "", context }: { items: ButtonAtom[]; dark?: boolean; className?: string; context?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map((b, i) => {
        const tel = b.href?.startsWith("tel:");
        const cls = i === 0 && !tel ? "btn-primary" : dark ? "btn-outline-light" : "btn-outline";
        const generic = GENERIC.test(b.label.trim()) && context;
        const label = (
          <>
            {tel && <Icon name="phone" className="h-3.5 w-3.5" />}
            {b.label}
            {generic && <span className="sr-only">: {context.replace(/:$/, "")}</span>}
            {i === 0 && !tel && <Icon name="arrow" className="h-3.5 w-3.5" />}
          </>
        );
        if (b.formKey && !b.href) return <QuoteButton key={b._key} formKey={b.formKey} className={cls}>{label}</QuoteButton>;
        return <SmartLink key={b._key} href={b.href || "/contact/"} className={cls}>{label}</SmartLink>;
      })}
    </div>
  );
}

/** Icon boxes whose title is the phone number become a plain call link. */
export const isPhoneBox = (a: Atom): boolean => a._type === "box" && !!a.href?.startsWith("tel:") && !a.text;

export function PhoneLink({ a, dark }: { a: BoxAtom; dark?: boolean }) {
  return (
    <a href={a.href} className={`inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.08em] ${dark ? "text-white" : "text-ink"} hover:underline`}>
      <Icon name="phone" className="h-4 w-4" />
      {a.title}
    </a>
  );
}

/* ---------- feature boxes: an editorial list of ruled rows (no card grid) ---------- */
export function Boxes({ items, dark, compact = false }: { items: BoxAtom[]; dark?: boolean; compact?: boolean }) {
  return (
    <ol className={`border-b ${dark ? "border-white/15" : "border-line"}`}>
      {items.map((b, i) => {
        const body = (
          <div className={`grid gap-x-8 gap-y-2 border-t py-7 ${dark ? "border-white/15" : "border-line"} ${compact ? "grid-cols-[2.5rem_1fr]" : "grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,7fr)]"}`}>
            <span className={`pt-1 font-sans text-[11px] font-semibold tracking-[0.2em] ${dark ? "text-lime-light" : "text-lime-ink"}`} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            {b.title && <h3 className={`h-sm ${dark ? "text-white" : "text-ink"} ${b.href ? "group-hover:underline" : ""}`}>{b.title}</h3>}
            <div className={`${compact ? "col-start-2" : "col-start-2 md:col-start-3"} ${b.title ? "" : "md:col-start-2 md:col-span-2"}`}>
              {b.text && <p className={`text-[15.5px] leading-[1.85] ${dark ? "text-white/70" : "text-muted"}`}>{b.text}</p>}
              {!!b.body?.length && <RichText value={b.body} plain className={`mt-3 text-[15px] leading-[1.8] ${dark ? "text-white/70" : "text-muted"} [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.85em] [&_li]:before:h-px [&_li]:before:w-2.5 [&_li]:before:bg-lime-ink [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mt-2 [&_ul]:grid [&_ul]:gap-1.5 [&_p+p]:mt-2`} />}
            </div>
          </div>
        );
        return <li key={b._key}>{b.href ? <SmartLink href={b.href} className="group block">{body}</SmartLink> : body}</li>;
      })}
    </ol>
  );
}

/* ---------- lists ---------- */
/** A list item that already holds links in its text cannot be wrapped in another link. */
const hasLink = (body: ListAtom["items"][number]["body"]) => body.some((b) => ((b as { markDefs?: { _type: string }[] }).markDefs || []).some((d) => d._type === "link"));

export function CheckList({ a, dark }: { a: ListAtom; dark?: boolean }) {
  return (
    <ul className="grid gap-3.5">
      {a.items.map((it) => (
        <li key={it._key} className={`flex gap-4 text-[15.5px] leading-[1.85] ${dark ? "text-white/75" : "text-muted"}`}>
          <span className={`mt-[0.85em] h-px w-3.5 shrink-0 ${dark ? "bg-lime-light" : "bg-lime-ink"}`} aria-hidden="true" />
          <div className="[&_a]:underline [&_a]:decoration-line-deep [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-current [&_p]:inline">
            {it.href && !hasLink(it.body) ? <SmartLink href={it.href}><RichText plain value={it.body} /></SmartLink> : <RichText plain value={it.body} />}
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- FAQ ---------- */
export function FaqList({ a }: { a: FaqAtom }) {
  return (
    <div className="border-b border-line">
      {a.items.map((q) => (
        <details key={q._key} className="faq group border-t border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6">
            <span className="h-sm text-ink">{q.question}</span>
            <span className="faq-icon mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none text-ink ring-1 ring-ink/15 transition-transform duration-200" aria-hidden="true">+</span>
          </summary>
          <div className="pb-7 pr-12 text-[15.5px] leading-[1.9] text-muted [&_a]:text-ink [&_a]:underline [&_p+p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
            <RichText plain value={q.answer} />
          </div>
        </details>
      ))}
    </div>
  );
}

/* ---------- reviews (text only, no star ratings), in a carousel ---------- */
export function Reviews({ a, dark }: { a: ReviewsAtom; dark?: boolean }) {
  return (
    <Carousel label="Client reviews" slideClass="w-[86%] sm:w-[48%] lg:w-[31%]" dark={dark}>
      {a.items.map((r) => (
        <figure key={r._key} className="card flex h-full flex-col justify-between p-8">
          <blockquote>
            <span className="block font-display text-[3.25rem] leading-[0.6] text-lime-ink" aria-hidden="true">“</span>
            <p className="mt-4 whitespace-pre-line text-[15.5px] leading-[1.85] text-muted">{r.text}</p>
          </blockquote>
          {(r.name || r.meta) && (
            <figcaption className="mt-7 border-t border-line pt-5">
              {r.name && <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">{r.name}</span>}
              {r.meta && <span className="mt-1 block text-[13px] text-subtle">{r.meta}</span>}
            </figcaption>
          )}
        </figure>
      ))}
    </Carousel>
  );
}

/* ---------- media ---------- */
/** Project photos: a calm carousel of large photos on pages, a tidy grid on the gallery page. */
export function Gallery({ a }: { a: GalleryAtom }) {
  if (a.large)
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {a.images.map((im, i) => (
          <figure key={`${im.src}-${i}`} className="media relative aspect-[4/3]">
            <Img image={im} fill loading="lazy" sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 50vw" className="object-cover" />
          </figure>
        ))}
      </div>
    );
  return (
    <Carousel label="Project photos" slideClass="w-[84%] sm:w-[62%] lg:w-[46%]">
      {a.images.map((im, i) => (
        <figure key={`${im.src}-${i}`}>
          <div className="media relative aspect-[4/3]">
            <Img image={im} fill loading="lazy" sizes="(min-width: 1280px) 600px, (min-width: 640px) 62vw, 84vw" className="object-cover" />
          </div>
        </figure>
      ))}
    </Carousel>
  );
}

export function Video({ url, className = "" }: { url: string; className?: string }) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt)
    return (
      <div className={`media relative aspect-video ${className}`}>
        <iframe src={`https://www.youtube-nocookie.com/embed/${yt[1]}`} title="Video" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
      </div>
    );
  const poster = url.endsWith(".mp4") ? url.replace(/\.mp4$/, "-poster.webp") : undefined;
  const vertical = /vertical/.test(url);
  // Local project footage plays muted on screen like a short film, with pause and sound buttons.
  return <ReelVideo src={url} poster={poster} className={`${vertical ? "aspect-[4/5]" : "aspect-video"} ${className}`} />;
}

export function MapEmbed({ title, url }: { title?: string; url: string }) {
  return (
    <div className="media">
      <iframe src={url} title={title || "Map"} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[340px] w-full grayscale-[40%] sepia-[8%] sm:h-[420px]" />
    </div>
  );
}

/** Embeds (GoHighLevel forms on the ad pages), kept exactly as on the live site. */
export function HtmlEmbed({ html }: { html: string }) {
  const h = Number((html.match(/data-height="(\d+)"/) || [])[1]) || undefined;
  const clean = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  return (
    <>
      <div id="quote-form" className="w-full scroll-mt-28 [&_iframe]:w-full" style={h ? { minHeight: h } : undefined} dangerouslySetInnerHTML={{ __html: clean.replace(/height:100%/, `height:${h ? `${h}px` : "100%"}`) }} />
      {/leadconnectorhq|msgsndr/.test(html) && <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />}
    </>
  );
}

export function FormCard({ formKey, settings, heading, className = "" }: { formKey: string; settings: SiteSettings; heading?: HeadingAtom; dark?: boolean; className?: string }) {
  const form = settings.forms.find((f) => f.formKey === formKey) || settings.forms.find((f) => f.formKey.split(":")[0] === formKey.split(":")[0]);
  if (!form) return null;
  return (
    <div id="quote-form" className={`card scroll-mt-28 p-6 sm:p-9 ${className}`}>
      {heading && <Heading a={heading} className="mb-7 !text-[2rem] text-ink" />}
      <LeadForm form={form} />
    </div>
  );
}
