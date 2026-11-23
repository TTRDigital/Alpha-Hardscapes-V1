import Link from "next/link";
import Script from "next/script";
import type { Atom, BoxAtom, ButtonAtom, FaqAtom, GalleryAtom, HeadingAtom, ListAtom, ReviewsAtom, SiteSettings } from "@/lib/types";
import { RichText } from "@/components/blocks/RichText";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/forms/LeadForm";
import { QuoteButton } from "@/components/forms/QuoteDialog";

/* ---------- headings ---------- */
const H_CLASS: Record<number, string> = { 1: "h-xl", 2: "h-lg", 3: "h-md", 4: "h-sm", 5: "label", 6: "label" };

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
  const cls = `${H_CLASS[level]} ${level >= 5 && dark ? "!text-white/60" : ""} ${className}`;
  return <Tag className={cls}>{a.href ? <SmartLink href={a.href} className="hover:underline">{text}</SmartLink> : text}</Tag>;
}

/* ---------- links and buttons ---------- */
export function SmartLink({ href, className, children, ariaLabel }: { href: string; className?: string; children: React.ReactNode; ariaLabel?: string }) {
  if (/^(tel|mailto):|^#/.test(href)) return <a href={href} className={className} aria-label={ariaLabel}>{children}</a>;
  if (/^https?:\/\//.test(href)) return <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>{children}</a>;
  return <Link href={href} className={className} aria-label={ariaLabel}>{children}</Link>;
}

const GENERIC = /^(learn more|read more|click here|see more|more)$/i;

export function Buttons({ items, dark, className = "", context }: { items: ButtonAtom[]; dark?: boolean; className?: string; context?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map((b, i) => {
        const cls = i === 0 ? (dark ? "btn-lime" : "btn-primary") : dark ? "btn-outline-light" : "btn-outline";
        const generic = GENERIC.test(b.label.trim()) && context;
        const label = (
          <>
            {b.href?.startsWith("tel:") && <Icon name="phone" className="h-4 w-4" />}
            {b.label}
            {generic && <span className="sr-only">: {context.replace(/:$/, "")}</span>}
            {i === 0 && !b.href?.startsWith("tel:") && <Icon name="arrow" className="h-4 w-4" />}
          </>
        );
        if (b.formKey && !b.href) return <QuoteButton key={b._key} formKey={b.formKey} className={cls}>{label}</QuoteButton>;
        // Generic labels ("Learn More") carry the section heading as screen-reader text
        return <SmartLink key={b._key} href={b.href || "/contact/"} className={cls}>{label}</SmartLink>;
      })}
    </div>
  );
}

/** Icon boxes whose title is the phone number become a plain call link. */
export const isPhoneBox = (a: Atom): boolean => a._type === "box" && !!a.href?.startsWith("tel:") && !a.text;

export function PhoneLink({ a, dark }: { a: BoxAtom; dark?: boolean }) {
  return (
    <a href={a.href} className={`inline-flex items-center gap-2 text-[15px] font-medium ${dark ? "text-white" : "text-ink"} hover:underline`}>
      <Icon name="phone" className="h-4 w-4" />
      {a.title}
    </a>
  );
}

/* ---------- feature boxes ---------- */
export function Boxes({ items, dark }: { items: BoxAtom[]; dark?: boolean }) {
  const n = items.length;
  const cols = n === 1 ? "" : n === 2 || n === 4 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-x-10 gap-y-10 ${cols}`}>
      {items.map((b, i) => {
        const body = (
          <>
            <span className={`font-mono text-[12px] ${dark ? "text-white/40" : "text-subtle"}`}>{String(i + 1).padStart(2, "0")}</span>
            {b.title && <h3 className={`mt-4 text-[1.15rem] font-medium leading-snug tracking-[-0.015em] ${dark ? "text-white" : "text-ink"}`}>{b.title}</h3>}
            {b.text && <p className={`mt-2 text-[15.5px] leading-relaxed ${dark ? "text-white/65" : "text-muted"}`}>{b.text}</p>}
            {!!b.body?.length && <RichText value={b.body} plain className={`mt-3 text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-muted"} [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:rounded-full [&_li]:before:bg-lime-600 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:mt-2 [&_ul]:grid [&_ul]:gap-1.5 [&_p+p]:mt-2`} />}
          </>
        );
        return (
          <div key={b._key} className={`border-t pt-5 ${dark ? "border-white/15" : "border-line"}`}>
            {b.href ? <SmartLink href={b.href} className="group block">{body}</SmartLink> : body}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- lists ---------- */
/** A list item that already holds links in its text cannot be wrapped in another link. */
const hasLink = (body: ListAtom["items"][number]["body"]) => body.some((b) => ((b as { markDefs?: { _type: string }[] }).markDefs || []).some((d) => d._type === "link"));
export function CheckList({ a, dark }: { a: ListAtom; dark?: boolean }) {
  return (
    <ul className="grid gap-3">
      {a.items.map((it) => (
        <li key={it._key} className={`flex gap-3 text-[16px] leading-relaxed ${dark ? "text-white/80" : "text-ink-700"}`}>
          <span className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-lime" : "bg-lime-600"}`} aria-hidden="true" />
          <div className="[&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-current [&_p]:inline">
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
    <div className="divide-y divide-line border-y border-line">
      {a.items.map((q) => (
        <details key={q._key} className="faq group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.05rem] font-medium leading-snug">
            <span>{q.question}</span>
            <span className="faq-icon mt-0.5 shrink-0 text-xl leading-none text-muted transition-transform duration-200" aria-hidden="true">+</span>
          </summary>
          <div className="pb-6 pr-10 text-[16px] leading-relaxed text-muted [&_a]:text-ink [&_a]:underline [&_p+p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
            <RichText plain value={q.answer} />
          </div>
        </details>
      ))}
    </div>
  );
}

/* ---------- reviews (text only, no star ratings) ---------- */
export function Reviews({ a }: { a: ReviewsAtom }) {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
      {a.items.map((r) => (
        <figure key={r._key} className="flex w-[85vw] shrink-0 snap-start flex-col justify-between rounded-2xl bg-white p-7 ring-1 ring-line sm:w-auto">
          <blockquote className="text-[15.5px] leading-relaxed text-ink-700">
            <Icon name="quote" className="mb-4 h-5 w-5 text-lime-600" />
            <p className="whitespace-pre-line">{r.text}</p>
          </blockquote>
          {(r.name || r.meta) && (
            <figcaption className="mt-6 border-t border-line pt-4 text-[14px]">
              {r.name && <span className="font-medium text-ink">{r.name}</span>}
              {r.meta && <span className="block text-muted">{r.meta}</span>}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

/* ---------- media ---------- */
export function Gallery({ a }: { a: GalleryAtom }) {
  const cols = a.large ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : a.images.length <= 4 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  return (
    <div className={`grid gap-2 sm:gap-3 ${cols}`}>
      {a.images.map((im, i) => (
        <div key={`${im.src}-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
          <Img image={im} fill loading="lazy" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
        </div>
      ))}
    </div>
  );
}

export function Video({ url, className = "" }: { url: string; className?: string }) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt)
    return (
      <div className={`relative aspect-video overflow-hidden rounded-2xl bg-ink ${className}`}>
        <iframe src={`https://www.youtube-nocookie.com/embed/${yt[1]}`} title="Video" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
      </div>
    );
  const poster = url.endsWith(".mp4") ? url.replace(/\.mp4$/, "-poster.webp") : undefined;
  const vertical = /vertical/.test(url);
  return (
    <video controls playsInline preload="none" poster={poster} className={`w-full rounded-2xl bg-ink object-cover ${vertical ? "aspect-[2/3] max-h-[640px]" : "aspect-video"} ${className}`}>
      <source src={url} type="video/mp4" />
    </video>
  );
}

export function MapEmbed({ title, url }: { title?: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-mist ring-1 ring-line">
      <iframe src={url} title={title || "Map"} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[340px] w-full grayscale-[35%] sm:h-[400px]" />
    </div>
  );
}

/** Embeds (GoHighLevel forms on the ad pages), kept exactly as on the live site. */
export function HtmlEmbed({ html }: { html: string }) {
  const h = Number((html.match(/data-height="(\d+)"/) || [])[1]) || undefined;
  const clean = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  return (
    <>
      <div id="quote-form" className="w-full scroll-mt-24 [&_iframe]:w-full" style={h ? { minHeight: h } : undefined} dangerouslySetInnerHTML={{ __html: clean.replace(/height:100%/, `height:${h ? `${h}px` : "100%"}`) }} />
      {/leadconnectorhq|msgsndr/.test(html) && <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />}
    </>
  );
}

export function FormCard({ formKey, settings, heading, dark }: { formKey: string; settings: SiteSettings; heading?: HeadingAtom; dark?: boolean }) {
  const form = settings.forms.find((f) => f.formKey === formKey) || settings.forms.find((f) => f.formKey.split(":")[0] === formKey.split(":")[0]);
  if (!form) return null;
  return (
    <div id="quote-form" className={`scroll-mt-24 rounded-2xl p-6 sm:p-8 ${dark ? "bg-ink text-white ring-1 ring-white/10" : "bg-white ring-1 ring-line"}`}>
      {heading && <Heading a={heading} className={`mb-6 !text-[1.6rem] ${dark ? "text-white" : ""}`} />}
      <LeadForm form={form} dark={dark} />
    </div>
  );
}
