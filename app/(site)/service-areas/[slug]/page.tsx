import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/PageHero";
import { FeatureItem, ProjectCard, ServiceCard, TestimonialCard } from "@/components/blocks/Cards";
import { RichText } from "@/components/blocks/RichText";
import { FaqList, faqJsonLd } from "@/components/blocks/Faq";
import { EstimateForm } from "@/components/blocks/EstimateForm";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { GoogleBadge } from "@/components/ui/Rating";
import { allSlugs, getArea, getAreas, getProjects, getServices, getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absUrl, SITE_URL, telHref } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await allSlugs("area")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [a, settings] = await Promise.all([getArea(slug), getSettings()]);
  if (!a) return {};
  return buildMetadata({ title: a.heading || `Hardscaping & Masonry in ${a.name}, CT`, description: a.intro, path: `/service-areas/${a.slug}/`, seo: a.seo, image: a.image, settings });
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [area, areas, services, projects, testimonials, settings] = await Promise.all([getArea(slug), getAreas(), getServices(), getProjects(), getTestimonials(), getSettings()]);
  if (!area) notFound();
  const siblings = area.kind === "county" ? areas.filter((a) => a.kind === "town" && a.county?.slug === area.slug) : areas.filter((a) => a.kind === "town" && a.slug !== area.slug && a.county?.slug === area.county?.slug);
  const areaProjects = area.projects?.length ? area.projects : projects.filter((p) => p.town?.toLowerCase().includes(area.name.toLowerCase())).slice(0, 3);
  const fallbackProjects = areaProjects.length ? areaProjects : projects.slice(0, 3);
  const localReviews = testimonials.filter((t) => t.town?.toLowerCase().includes(area.name.toLowerCase()));
  const reviews = (localReviews.length ? localReviews : testimonials).slice(0, 2);
  const crumbs = [{ label: "Service areas", href: "/service-areas/" }, ...(area.county ? [{ label: area.county.name, href: `/service-areas/${area.county.slug}/` }] : []), { label: area.name, href: `/service-areas/${area.slug}/` }];
  const mapQ = encodeURIComponent(area.mapQuery || `${area.name}, CT`);

  return (
    <>
      <PageHero eyebrow={area.kind === "county" ? "Service area" : `${area.county?.name || "Connecticut"} · Service area`} title={area.heading || `Hardscaping and masonry in ${area.name}, CT`} text={area.intro} image={area.image} crumbs={crumbs}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#estimate" className="btn-primary">{settings.ctaPrimary || "Get a Free Estimate"} <Icon name="arrow" className="h-4 w-4" /></a>
          <a href={telHref(settings.phoneE164)} className="btn-outline-light"><Icon name="phone" className="h-4 w-4" /> {settings.phone}</a>
          <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} light />
        </div>
      </PageHero>

      <section className="container-x grid gap-12 py-16 lg:grid-cols-12 sm:py-24">
        <div className="lg:col-span-8">
          {area.highlights && area.highlights.length > 0 && (
            <div className="grid gap-6 rounded-3xl bg-stone-100 p-6 sm:grid-cols-3 sm:p-8">{area.highlights.map((h) => (<FeatureItem key={h.title} f={h} />))}</div>
          )}
          <RichText value={area.body} className="mt-10" />
          {area.towns && area.towns.length > 0 && (
            <div className="mt-10">
              <h2 className="display-md">Towns we serve in {area.name}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {area.towns.map((t) => {
                  const page = areas.find((a) => a.kind === "town" && a.name.toLowerCase() === t.toLowerCase());
                  return page ? <li key={t}><Link href={`/service-areas/${page.slug}/`} className="inline-block rounded-full bg-ink px-3.5 py-1.5 text-[14px] font-semibold text-stone-50 hover:bg-moss">{t}</Link></li> : <li key={t} className="rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-[14px] font-semibold">{t}</li>;
                })}
              </ul>
            </div>
          )}
          {area.neighborhoods && area.neighborhoods.length > 0 && (
            <p className="mt-8 text-[15px] text-stone-700"><span className="font-bold text-ink">Neighbourhoods and landmarks: </span>{area.neighborhoods.join(", ")}.</p>
          )}
          <div className="mt-12">
            <h2 className="display-md">Projects {area.kind === "county" ? `across ${area.name}` : `near ${area.name}`}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fallbackProjects.map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
            <Link href="/projects/" className="mt-6 inline-flex items-center gap-2 font-bold text-moss hover:text-ink">All projects <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          {area.faqs && area.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="display-md">Questions from {area.name} homeowners</h2>
              <FaqList items={area.faqs} className="mt-4" />
              <JsonLd data={faqJsonLd(area.faqs)} />
            </div>
          )}
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div id="estimate" className="card scroll-mt-28 p-6">
              <p className="eyebrow">Free estimate in {area.name}</p>
              <h2 className="display-sm mt-2">Tell us about your project</h2>
              <EstimateForm services={services} thankYouPath={settings.formThankYouPath} compact source={`Area: ${area.name}`} className="mt-5" />
            </div>
            <div className="overflow-hidden rounded-2xl bg-stone-200">
              <iframe title={`Map of ${area.name}, CT`} src={`https://maps.google.com/maps?q=${mapQ}&t=m&z=${area.kind === "county" ? 9 : 12}&output=embed&iwloc=near`} className="h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            {reviews.map((t) => (<TestimonialCard key={t._id} t={t} compact />))}
          </div>
        </aside>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <h2 className="display-md">Services in {area.name}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{services.filter((s) => s.featured).slice(0, 6).map((s) => (<ServiceCard key={s.slug} service={s} />))}</div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="bg-stone-100 py-12">
          <div className="container-x">
            <h2 className="display-sm">{area.kind === "county" ? `Town pages in ${area.name}` : `Nearby towns`}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">{siblings.map((s) => (<li key={s.slug}><Link href={`/service-areas/${s.slug}/`} className="inline-block rounded-full bg-white px-3.5 py-1.5 text-[14px] font-semibold ring-1 ring-ink/10 hover:bg-ink hover:text-stone-50">{s.name}</Link></li>))}</ul>
          </div>
        </section>
      )}
      <CtaBand settings={settings} title={`Ready to start your ${area.name} project?`} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), { "@context": "https://schema.org", "@type": "Service", name: `Hardscaping and masonry in ${area.name}, CT`, url: absUrl(`/service-areas/${area.slug}/`), provider: { "@id": `${SITE_URL}/#business` }, areaServed: { "@type": area.kind === "county" ? "AdministrativeArea" : "City", name: `${area.name}, CT` } }]} />
    </>
  );
}
