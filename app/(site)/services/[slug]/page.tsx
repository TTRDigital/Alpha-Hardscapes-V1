import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/PageHero";
import { HeroActions } from "@/components/blocks/HeroActions";
import { FeatureItem, ProjectCard, TestimonialCard } from "@/components/blocks/Cards";
import { RichText } from "@/components/blocks/RichText";
import { Gallery } from "@/components/blocks/Gallery";
import { FaqList, faqJsonLd } from "@/components/blocks/Faq";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { allSlugs, getProjects, getService, getServices, getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absUrl, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await allSlugs("service")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [s, settings] = await Promise.all([getService(slug), getSettings()]);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.excerpt, path: `/services/${s.slug}/`, seo: s.seo, image: s.heroImage, settings });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, settings, services, projects, testimonials] = await Promise.all([getService(slug), getSettings(), getServices(), getProjects(), getTestimonials()]);
  if (!service) notFound();
  const related = service.relatedServices?.length ? service.relatedServices : services.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);
  const relatedProjects = projects.filter((p) => p.services?.some((s) => s.slug === service.slug)).slice(0, 2);
  const review = testimonials.find((t) => t.service?.slug === service.slug) ?? testimonials[0];
  const name = (service.shortTitle || service.title).toLowerCase();
  const crumbs = [{ label: "Services", href: "/services/" }, { label: service.shortTitle || service.title, href: `/services/${service.slug}/` }];

  return (
    <>
      <PageHero eyebrow={service.eyebrow || service.title} title={service.heading || service.title} text={service.excerpt} image={service.heroImage} crumbs={crumbs}>
        <HeroActions settings={settings} />
      </PageHero>

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label">Overview</p>
        </div>
        <div className="lg:col-span-8">
          {service.intro && <p className="text-[1.35rem] leading-[1.5] tracking-[-0.015em] text-ink sm:text-[1.6rem]">{service.intro}</p>}
          {service.highlights && service.highlights.length > 0 && (
            <div className="mt-14 grid gap-8 sm:grid-cols-2">{service.highlights.map((h) => (<FeatureItem key={h.title} f={h} />))}</div>
          )}
        </div>
      </section>

      {service.body && service.body.length > 0 && (
        <section className="border-t border-line bg-white py-20 sm:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label">Details</p>
              {service.materials && service.materials.length > 0 && (
                <div className="mt-8 hidden lg:block">
                  <p className="text-[14px] text-subtle">Materials</p>
                  <ul className="mt-3 space-y-1.5 text-[15px] text-ink">{service.materials.map((m) => (<li key={m}>{m}</li>))}</ul>
                </div>
              )}
            </div>
            <div className="lg:col-span-7">
              <RichText value={service.body} className="[&>*:first-child]:mt-0" />
              {service.startingNote && <p className="mt-8 border-l border-ink pl-5 text-[16px] text-ink">{service.startingNote}</p>}
            </div>
          </div>
        </section>
      )}

      {service.gallery && service.gallery.length > 0 && (
        <section className="container-x py-20 sm:py-28">
          <div className="flex items-end justify-between gap-6">
            <h2 className="h-lg">Recent {name}</h2>
            <Link href="/projects/" className="link-arrow hidden sm:inline-flex">All projects →</Link>
          </div>
          <div className="mt-12"><Gallery images={service.gallery} columns={3} /></div>
        </section>
      )}

      {relatedProjects.length > 0 && !service.gallery?.length && (
        <section className="container-x pb-20 sm:pb-28">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">{relatedProjects.map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
        </section>
      )}

      {(service.faqs?.length || review) && (
        <section className="border-t border-line bg-white py-20 sm:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label">Questions</p>
              <h2 className="h-lg mt-4">Good to know</h2>
              {review && <div className="mt-12 hidden lg:block"><TestimonialCard t={review} compact /></div>}
            </div>
            <div className="lg:col-span-8">
              {service.faqs && service.faqs.length > 0 && (<><FaqList items={service.faqs} /><JsonLd data={faqJsonLd(service.faqs)} /></>)}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="container-x py-16">
          <p className="label">Often built together</p>
          <ul className="mt-6 border-t border-line">
            {related.slice(0, 3).map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/services/${s.slug}/`} className="flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-muted">
                  <span className="h-md">{s.title}</span><span className="hidden max-w-md text-right text-[15px] text-muted md:block">{s.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand settings={settings} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), {
        "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.excerpt, url: absUrl(`/services/${service.slug}/`), serviceType: service.title,
        provider: { "@id": `${SITE_URL}/#business` }, areaServed: ["New Haven County, CT", "Hartford County, CT", "Fairfield County, CT"],
        ...(service.heroImage ? { image: service.heroImage.src.startsWith("http") ? service.heroImage.src : absUrl(service.heroImage.src) } : {}),
      }]} />
    </>
  );
}
