import type { Metadata } from "next";
import type { Img, Seo, SiteSettings } from "@/lib/types";
import { absUrl, SITE_URL } from "./site.ts";

type Opts = {
  title: string;
  description?: string;
  path: string;
  seo?: Seo;
  image?: Img | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  settings?: SiteSettings;
};

/** Builds Next.js metadata from a page's SEO fields with sensible defaults. */
export function buildMetadata({ title, description, path, seo, image, type = "website", publishedTime, modifiedTime, settings }: Opts): Metadata {
  const business = settings?.businessName || "Alpha Hardscapes";
  // Keep titles under ~65 characters: drop the brand suffix when it would push the title over.
  const withBrand = title.includes(business) ? title : `${title} | ${business}`;
  const t = seo?.title || (withBrand.length <= 65 ? withBrand : title);
  const d = seo?.description || description || settings?.seo?.description || "";
  const img = seo?.image || image || null;
  const url = absUrl(path);
  return {
    title: t,
    description: d,
    alternates: { canonical: url },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: t,
      description: d,
      url,
      siteName: business,
      type,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: img ? [{ url: img.src.startsWith("http") ? img.src : absUrl(img.src), width: img.width, height: img.height, alt: img.alt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: t, description: d },
  };
}

export function businessJsonLd(s: SiteSettings) {
  const addr = s.address;
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: s.businessName,
    legalName: s.legalName,
    url: SITE_URL,
    telephone: s.phoneE164,
    email: s.email,
    description: s.description,
    image: absUrl("/images/gallery/patio-1804.webp"),
    logo: absUrl("/images/brand/icon-512.png"),
    priceRange: "$$",
    address: addr ? { "@type": "PostalAddress", ...(addr.showStreet ? { streetAddress: addr.street } : {}), addressLocality: addr.city, addressRegion: addr.state, postalCode: addr.zip, addressCountry: "US" } : undefined,
    areaServed: ["New Haven County, CT", "Hartford County, CT", "Fairfield County, CT"].map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: [s.facebook, s.instagram, s.googleBusinessUrl].filter(Boolean),
    openingHoursSpecification: (s.hours || [])
      .filter((h) => !/closed/i.test(h.hours))
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: daysOf(h.days), opens: timeOf(h.hours, 0), closes: timeOf(h.hours, 1) })),
    ...(s.googleRating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: s.googleRating, bestRating: 5, ...(s.googleReviewCount ? { reviewCount: s.googleReviewCount } : { ratingCount: 10 }) } } : {}),
  };
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function daysOf(label: string) {
  const m = label.match(/(\w+day)\s*(?:to|-|–)\s*(\w+day)/i);
  if (m) { const a = DAYS.indexOf(cap(m[1])), b = DAYS.indexOf(cap(m[2])); if (a >= 0 && b >= a) return DAYS.slice(a, b + 1); }
  const single = DAYS.find((d) => label.toLowerCase().includes(d.toLowerCase()));
  return single ? [single] : DAYS.slice(0, 5);
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
function timeOf(hours: string, idx: number) {
  const parts = hours.split(/\s*(?:to|-|–)\s*/);
  const p = parts[idx] || "";
  const m = p.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!m) return undefined;
  let h = Number(m[1]);
  if (m[3]?.toUpperCase() === "PM" && h < 12) h += 12;
  if (m[3]?.toUpperCase() === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m[2] || "00"}`;
}
