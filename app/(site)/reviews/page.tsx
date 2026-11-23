import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/PageHero";
import { TestimonialCard } from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { GoogleBadge } from "@/components/ui/Rating";
import { Icon } from "@/components/ui/Icon";
import { getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({ title: "Reviews: What Connecticut Homeowners Say About Alpha Hardscapes", description: "Google reviews from homeowners across New Haven, Hartford and Fairfield Counties about the patios, walkways, walls and steps Alpha Hardscapes built.", path: "/reviews/", settings });
}

export default async function ReviewsPage() {
  const [testimonials, settings] = await Promise.all([getTestimonials(), getSettings()]);
  const crumbs = [{ label: "Reviews", href: "/reviews/" }];
  return (
    <>
      <PageHero eyebrow="Reviews" title="What our clients say" text="Every review below was written by a homeowner we built for. Read them on Google, and if we have worked for you, we would be grateful for yours." crumbs={crumbs} compact>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} />
          {settings.googleReviewUrl && <a href={settings.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-dark !py-3">Write a review <Icon name="arrow" className="h-4 w-4" /></a>}
        </div>
      </PageHero>
      <section className="container-x py-12 sm:py-16">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {testimonials.map((t) => (<TestimonialCard key={t._id} t={t} />))}
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "@id": `${SITE_URL}/#business`,
        name: settings.businessName,
        review: testimonials.slice(0, 10).map((t) => ({ "@type": "Review", author: { "@type": "Person", name: t.name }, reviewBody: t.quote, reviewRating: { "@type": "Rating", ratingValue: t.rating ?? 5, bestRating: 5 } })),
      }]} />
    </>
  );
}
