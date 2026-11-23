import type { Metadata } from "next";
import type { Atom, Page, RichText, SiteSettings } from "@/lib/types";
import { absUrl, plainText, SITE_URL } from "./site.ts";

const atomsOf = (p: Page): Atom[] => p.sections.flatMap((s) => s.atoms);

/** First paragraph of the page (its own words), for pages that have no meta description yet. */
export function firstText(p: Page): string {
  for (const a of atomsOf(p)) if (a._type === "rt") { const t = plainText(a.body as never); if (t.length > 40) return t; }
  return "";
}

function clip(s: string, n = 158) {
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export const isNoindex = (p: Pick<Page, "seo">) => /noindex/i.test(p.seo?.robots || "");

/** Title, description, canonical (always the page's own https address), robots and share tags. */
export function pageMetadata(p: Page, settings: SiteSettings): Metadata {
  const brand = settings.businessName;
  const title = p.seo.title || (`${p.title} | ${brand}`.length <= 60 ? `${p.title} | ${brand}` : p.title);
  const description = p.seo.description || (/noindex/i.test(p.seo.robots || "") ? "" : clip(p.excerpt || firstText(p)));
  const url = absUrl(p.path);
  const noindex = isNoindex(p);
  const ogImage = p.seo.ogImage || settings.defaultOgImage;
  const article = p.kind === "post";
  return {
    title: { absolute: title },
    description: description || undefined,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      title: p.seo.ogTitle || title,
      description: p.seo.ogDescription || description || undefined,
      url,
      siteName: brand,
      locale: "en_US",
      type: article ? "article" : "website",
      ...(article && p.date ? { publishedTime: p.date, modifiedTime: p.modified || p.date, authors: p.author ? [p.author] : undefined } : {}),
      images: ogImage ? [{ url: ogImage.startsWith("http") ? ogImage : absUrl(ogImage), width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: p.seo.ogTitle || title, description: p.seo.ogDescription || description || undefined },
  };
}

/** The business, on every page. Town and ZIP only; no ratings or reviews markup. */
export function businessJsonLd(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: s.businessName,
    url: `${SITE_URL}/`,
    logo: absUrl("/images/brand/icon-512.png"),
    image: absUrl(s.defaultOgImage || "/og/home.jpg"),
    telephone: s.phoneE164,
    ...(s.email ? { email: s.email } : {}),
    address: { "@type": "PostalAddress", addressLocality: s.locality, addressRegion: s.region, postalCode: s.postalCode, addressCountry: "US" },
    openingHoursSpecification: s.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    areaServed: s.areaServed.map((name) => ({ "@type": /County/.test(name) ? "AdministrativeArea" : "City", name })),
    sameAs: s.socials.map((x) => x.href),
  };
}

export function breadcrumbJsonLd(p: Page, titleOf: (path: string) => string | undefined) {
  const parts = p.path.split("/").filter(Boolean);
  const items = [{ name: "Home", path: "/" }];
  for (let i = 1; i < parts.length; i++) {
    const path = `/${parts.slice(0, i).join("/")}/`;
    const t = titleOf(path);
    if (t) items.push({ name: t, path });
  }
  if (p.path !== "/") items.push({ name: p.title, path: p.path });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}

/** Questions and answers that are visible on the page: FAQ blocks, or a post's FAQ section (H3 questions under an FAQ heading). */
export function visibleFaqs(p: Page): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (const a of atomsOf(p)) if (a._type === "faq") for (const it of a.items) { const ans = plainText(it.answer as never); if (it.question && ans) out.push({ q: it.question, a: ans }); }
  if (out.length || p.kind !== "post") return out;
  const blocks = atomsOf(p).flatMap((a) => (a._type === "rt" ? a.body : [])) as RichText;
  let inFaq = false; let cur: { q: string; a: string } | null = null;
  const text = (b: unknown) => plainText([b] as never);
  for (const b of blocks as { style?: string }[]) {
    const t = text(b);
    if (b.style === "h2") { if (cur?.a) out.push(cur); cur = null; inFaq = /faq|frequently asked|questions/i.test(t); continue; }
    if (!inFaq) continue;
    if ((b.style === "h3" || b.style === "h4") && /\?\s*$/.test(t)) { if (cur?.a) out.push(cur); cur = { q: t, a: "" }; continue; }
    if (cur && (!b.style || b.style === "normal")) cur.a = `${cur.a} ${t}`.trim();
  }
  if (cur?.a) out.push(cur);
  return out;
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}

export function postJsonLd(p: Page, s: SiteSettings) {
  const img = p.featuredImage || p.heroImage;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    mainEntityOfPage: absUrl(p.path),
    datePublished: p.date,
    dateModified: p.modified || p.date,
    author: { "@type": "Person", name: p.author || s.businessName, ...(p.authorSlug ? { url: absUrl(`/author/${p.authorSlug}/`) } : {}) },
    publisher: { "@id": `${SITE_URL}/#business` },
    ...(img ? { image: img.src.startsWith("http") ? img.src : absUrl(img.src) } : {}),
    ...(p.seo.description ? { description: p.seo.description } : {}),
  };
}

export function webPageJsonLd(p: Page, description?: string) {
  return { "@context": "https://schema.org", "@type": "WebPage", "@id": absUrl(p.path), url: absUrl(p.path), name: p.seo.title || p.title, ...(description ? { description } : {}), isPartOf: { "@type": "WebSite", url: `${SITE_URL}/`, name: "Alpha Hardscapes" }, about: { "@id": `${SITE_URL}/#business` } };
}
