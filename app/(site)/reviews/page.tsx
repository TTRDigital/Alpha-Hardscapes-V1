import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/PageHero";
import { TestimonialCard } from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { GoogleBadge } from "@/components/ui/Rating";
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
      <PageHero eyebrow="Reviews" title="What our clients say." text="Every review here was written by a homeowner we built for. If we have worked for you, we would be grateful for yours." crumbs={crumbs}>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} />
          {settings.googleReviewUrl && <a href={settings.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">Write a review →</a>}
        </div>
      </PageHero>
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{testimonials.map((t) => (<TestimonialCard key={t._id} t={t} />))}</div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), {
        "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", "@id": `${SITE_URL}/#business`, name: settings.businessName,
        review: testimonials.slice(0, 10).map((t) => ({ "@type": "Review", author: { "@type": "Person", name: t.name }, reviewBody: t.quote, reviewRating: { "@type": "Rating", ratingValue: t.rating ?? 5, bestRating: 5 } })),
      }]} />
    </>
  );
}
