import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/PageHero";
import { HeroActions } from "@/components/blocks/HeroActions";
import { FeatureItem, ProjectCard, TestimonialCard } from "@/components/blocks/Cards";
import { RichText } from "@/components/blocks/RichText";
import { FaqList, faqJsonLd } from "@/components/blocks/Faq";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { allSlugs, getArea, getAreas, getProjects, getServices, getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absUrl, SITE_URL } from "@/lib/site";

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
  const local = area.projects?.length ? area.projects : projects.filter((p) => p.town?.toLowerCase().includes(area.name.toLowerCase()));
  const shown = (local.length ? local : projects).slice(0, 2);
  const review = testimonials.find((t) => t.town?.toLowerCase().includes(area.name.toLowerCase())) ?? testimonials[0];
  const crumbs = [{ label: "Service areas", href: "/service-areas/" }, ...(area.county ? [{ label: area.county.name, href: `/service-areas/${area.county.slug}/` }] : []), { label: area.name, href: `/service-areas/${area.slug}/` }];
  const mapQ = encodeURIComponent(area.mapQuery || `${area.name}, CT`);

  return (
    <>
      <PageHero eyebrow={area.kind === "county" ? "Service area" : area.county?.name || "Service area"} title={area.heading || `Hardscaping and masonry in ${area.name}, CT`} text={area.intro} image={area.image} crumbs={crumbs}>
        <HeroActions settings={settings} />
      </PageHero>

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4"><p className="label">{area.name}</p></div>
        <div className="lg:col-span-8">
          {area.highlights && area.highlights.length > 0 && (<div className="grid gap-8 sm:grid-cols-3">{area.highlights.map((h) => (<FeatureItem key={h.title} f={h} />))}</div>)}
          <RichText value={area.body} className="mt-12" />
          {area.towns && area.towns.length > 0 && (
            <div className="mt-12">
              <p className="text-[14px] text-subtle">Towns we serve in {area.name}</p>
              <p className="mt-3 text-[17px] leading-relaxed text-ink">
                {area.towns.map((t, i) => {
                  const page = areas.find((a) => a.kind === "town" && a.name.toLowerCase() === t.toLowerCase());
                  return (<span key={t}>{page ? <Link href={`/service-areas/${page.slug}/`} className="underline decoration-line underline-offset-4 hover:decoration-ink">{t}</Link> : t}{i < area.towns!.length - 1 ? ", " : "."}</span>);
                })}
              </p>
            </div>
          )}
          {area.neighborhoods && area.neighborhoods.length > 0 && (<p className="mt-6 text-[15px] text-muted">Neighbourhoods: {area.neighborhoods.join(", ")}.</p>)}
        </div>
      </section>

      <section className="border-t border-line bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 className="h-lg">Projects {area.kind === "county" ? `in ${area.name}` : `near ${area.name}`}</h2>
            <Link href="/projects/" className="link-arrow hidden sm:inline-flex">All projects →</Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">{shown.map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
        </div>
      </section>

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label">Questions</p>
          <h2 className="h-lg mt-4">{area.name} homeowners ask</h2>
          {review && <div className="mt-12"><TestimonialCard t={review} compact /></div>}
        </div>
        <div className="lg:col-span-8">
          {area.faqs && area.faqs.length > 0 && (<><FaqList items={area.faqs} /><JsonLd data={faqJsonLd(area.faqs)} /></>)}
          <div className="mt-12 overflow-hidden rounded-lg bg-mist">
            <iframe title={`Map of ${area.name}, CT`} src={`https://maps.google.com/maps?q=${mapQ}&t=m&z=${area.kind === "county" ? 9 : 12}&output=embed&iwloc=near`} className="h-72 w-full border-0 grayscale" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <p className="label">Services in {area.name}</p>
            <ul className="mt-5 grid grid-cols-2 gap-y-2 text-[15px]">{services.slice(0, 10).map((s) => (<li key={s.slug}><Link href={`/services/${s.slug}/`} className="text-muted hover:text-ink">{s.shortTitle || s.title}</Link></li>))}</ul>
          </div>
          {siblings.length > 0 && (
            <div>
              <p className="label">{area.kind === "county" ? "Town pages" : "Nearby towns"}</p>
              <ul className="mt-5 grid grid-cols-2 gap-y-2 text-[15px]">{siblings.map((s) => (<li key={s.slug}><Link href={`/service-areas/${s.slug}/`} className="text-muted hover:text-ink">{s.name}</Link></li>))}</ul>
            </div>
          )}
        </div>
      </section>
      <CtaBand settings={settings} title={`Starting a project in ${area.name}?`} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), { "@context": "https://schema.org", "@type": "Service", name: `Hardscaping and masonry in ${area.name}, CT`, url: absUrl(`/service-areas/${area.slug}/`), provider: { "@id": `${SITE_URL}/#business` }, areaServed: { "@type": area.kind === "county" ? "AdministrativeArea" : "City", name: `${area.name}, CT` } }]} />
    </>
  );
}
