import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/PageHero";
import { FeatureItem, ProjectCard, ServiceCard, TestimonialCard } from "@/components/blocks/Cards";
import { RichText } from "@/components/blocks/RichText";
import { Gallery } from "@/components/blocks/Gallery";
import { FaqList, faqJsonLd } from "@/components/blocks/Faq";
import { EstimateForm } from "@/components/blocks/EstimateForm";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { GoogleBadge } from "@/components/ui/Rating";
import { allSlugs, getProjects, getService, getServices, getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absUrl, SITE_URL, telHref } from "@/lib/site";

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
  const relatedProjects = projects.filter((p) => p.services?.some((s) => s.slug === service.slug)).slice(0, 3);
  const reviews = (testimonials.filter((t) => t.service?.slug === service.slug).concat(testimonials.filter((t) => t.service?.slug !== service.slug))).slice(0, 2);
  const crumbs = [{ label: "Services", href: "/services/" }, { label: service.shortTitle || service.title, href: `/services/${service.slug}/` }];

  return (
    <>
      <PageHero eyebrow={service.eyebrow || service.title} title={service.heading || service.title} text={service.excerpt} image={service.heroImage} crumbs={crumbs}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#estimate" className="btn-primary">{settings.ctaPrimary || "Get a Free Estimate"} <Icon name="arrow" className="h-4 w-4" /></a>
          <a href={telHref(settings.phoneE164)} className="btn-outline-light"><Icon name="phone" className="h-4 w-4" /> {settings.phone}</a>
          <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} light />
        </div>
      </PageHero>

      <section className="container-x grid gap-12 py-16 lg:grid-cols-12 sm:py-24">
        <div className="lg:col-span-8">
          {service.intro && <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">{service.intro}</p>}
          {service.highlights && service.highlights.length > 0 && (
            <div className="mt-10 grid gap-6 rounded-3xl bg-stone-100 p-6 sm:grid-cols-2 sm:p-8">
              {service.highlights.map((h) => (<FeatureItem key={h.title} f={h} />))}
            </div>
          )}
          <RichText value={service.body} className="mt-10" />
          {service.materials && service.materials.length > 0 && (
            <div className="mt-10">
              <p className="eyebrow">Materials & options</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.materials.map((m) => (<li key={m} className="rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-[14px] font-semibold">{m}</li>))}
              </ul>
            </div>
          )}
          {service.startingNote && <p className="mt-6 rounded-2xl border-l-4 border-lime bg-stone-100 p-4 text-[15px] font-semibold text-ink">{service.startingNote}</p>}
          {service.gallery && service.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="display-md">Recent {service.shortTitle?.toLowerCase() || "project"} photos</h2>
              <div className="mt-6"><Gallery images={service.gallery} columns={3} /></div>
            </div>
          )}
          {service.faqs && service.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="display-md">Questions about {service.shortTitle?.toLowerCase() || service.title.toLowerCase()}</h2>
              <FaqList items={service.faqs} className="mt-4" />
              <JsonLd data={faqJsonLd(service.faqs)} />
            </div>
          )}
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div id="estimate" className="card scroll-mt-28 p-6">
              <p className="eyebrow">Free estimate</p>
              <h2 className="display-sm mt-2">Plan your {service.shortTitle?.toLowerCase() || "project"}</h2>
              <p className="mt-1 text-sm text-stone-500">Site visit, samples and a written quote at no cost.</p>
              <EstimateForm services={services} thankYouPath={settings.formThankYouPath} compact source={`Service: ${service.title}`} className="mt-5" />
              <a href={telHref(settings.phoneE164)} className="mt-4 flex items-center justify-center gap-2 text-[15px] font-bold text-ink hover:text-moss"><Icon name="phone" className="h-4 w-4 text-moss" /> Or call {settings.phone}</a>
            </div>
            {reviews.map((t) => (<TestimonialCard key={t._id} t={t} compact />))}
          </div>
        </aside>
      </section>

      {relatedProjects.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <h2 className="display-md">{service.shortTitle || service.title} projects</h2>
              <Link href="/projects/" className="hidden items-center gap-2 font-bold text-moss hover:text-ink sm:inline-flex">All projects <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (<ProjectCard key={p.slug} project={p} />))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-stone-100 py-16 sm:py-20">
          <div className="container-x">
            <h2 className="display-md">Often built together</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((s) => (<ServiceCard key={s.slug} service={s} />))}
            </div>
          </div>
        </section>
      )}

      <CtaBand settings={settings} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.excerpt,
        url: absUrl(`/services/${service.slug}/`),
        serviceType: service.title,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: ["New Haven County, CT", "Hartford County, CT", "Fairfield County, CT"],
        ...(service.heroImage ? { image: service.heroImage.src.startsWith("http") ? service.heroImage.src : absUrl(service.heroImage.src) } : {}),
      }]} />
    </>
  );
}
