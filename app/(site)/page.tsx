import Link from "next/link";
import type { Metadata } from "next";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { GoogleBadge } from "@/components/ui/Rating";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EstimateForm } from "@/components/blocks/EstimateForm";
import { HeroVideo } from "@/components/blocks/HeroVideo";
import { FeatureItem, ProjectCard, ServiceCard, TestimonialCard } from "@/components/blocks/Cards";
import { BeforeAfter } from "@/components/blocks/BeforeAfter";
import { FaqList, faqJsonLd } from "@/components/blocks/Faq";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { getAreas, getFaqs, getHomePage, getProjects, getServices, getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";
import type { Project } from "@/lib/types";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomePage(), getSettings()]);
  return buildMetadata({ title: home.seo?.title || settings.seo?.title || settings.businessName, description: home.seo?.description, path: "/", seo: home.seo, image: home.heroImage, settings });
}

export default async function HomePage() {
  const [home, settings, services, projects, testimonials, faqs, areas] = await Promise.all([
    getHomePage(), getSettings(), getServices(), getProjects(), getTestimonials(), getFaqs(), getAreas(),
  ]);
  const featuredServices = home.featuredServices?.length ? home.featuredServices : services.filter((s) => s.featured).slice(0, 6);
  const featuredProjects = (home.featuredProjects?.length ? home.featuredProjects : projects.filter((p) => p.featured)).slice(0, 6);
  const featuredReviews = testimonials.filter((t) => t.featured).slice(0, 3).length >= 3 ? testimonials.filter((t) => t.featured).slice(0, 3) : testimonials.slice(0, 3);
  const homeFaqs = faqs.filter((f) => f.showOnHome).slice(0, 5);
  const counties = areas.filter((a) => a.kind === "county");
  const towns = areas.filter((a) => a.kind === "town");
  const ba = projects.find((p): p is Project => Boolean((p as Project).beforeImage && (p as Project).afterImage)) as Project | undefined;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-stone-50">
        {home.heroImage && (
          <Img image={home.heroImage} fill priority sizes="100vw" className="-z-20 object-cover" />
        )}
        {home.heroVideoUrl && <HeroVideo src={home.heroVideoUrl} poster={home.heroImage?.src} />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/20" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true" />
        <div className="container-x grid min-h-[calc(100svh-72px)] items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="max-w-2xl lg:col-span-7">
            {home.eyebrow && <p className="eyebrow-light">{home.eyebrow}</p>}
            <h1 className="display-xl mt-4">{home.heading}</h1>
            {home.subheading && <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-200 sm:text-xl">{home.subheading}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact/" className="btn-primary">{settings.ctaPrimary || "Get a Free Estimate"} <Icon name="arrow" className="h-4 w-4" /></Link>
              <a href={telHref(settings.phoneE164)} className="btn-outline-light"><Icon name="phone" className="h-4 w-4" /> {settings.phone}</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-semibold text-stone-200">
              {(home.trustPoints || []).map((t) => (
                <span key={t} className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-lime" />{t}</span>
              ))}
              <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} light />
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <div className="card ml-auto max-w-md p-7 text-ink">
              <p className="eyebrow">Free estimate</p>
              <h2 className="display-sm mt-2">Tell us about your project</h2>
              <p className="mt-1 text-sm text-stone-500">We reply within one business day.</p>
              <EstimateForm services={services} thankYouPath={settings.formThankYouPath} compact source="Home hero" className="mt-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      {home.stats && home.stats.length > 0 && (
        <div className="border-b border-ink/10 bg-stone-100">
          <div className="container-x grid grid-cols-3 divide-x divide-ink/10 py-6">
            {home.stats.map((s) => (
              <div key={s.label} className="px-4 text-center first:pl-0 last:pr-0">
                <p className="font-display text-3xl font-medium text-ink sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-stone-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services */}
      <Section id="services">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Services" title={home.servicesHeading || "What we build"} text={home.servicesText} />
          <Link href="/services/" className="btn-outline self-start md:self-auto">All services <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 80}><ServiceCard service={s} /></Reveal>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section tone="white" id="projects">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Our work" title={home.projectsHeading || "Recent projects"} text={home.projectsText} />
          <Link href="/projects/" className="btn-outline self-start md:self-auto">View all projects <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}><ProjectCard project={p} /></Reveal>
          ))}
        </div>
      </Section>

      {/* About + why */}
      <Section tone="muted" id="why">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {home.reelVideoUrl ? (
              <div className="relative mx-auto max-w-[420px]">
                <div className="relative aspect-[2/3] overflow-hidden rounded-3xl bg-ink shadow-lift">
                  <video className="absolute inset-0 h-full w-full object-cover" src={home.reelVideoUrl} poster={home.reelPosterUrl} muted loop playsInline autoPlay controls preload="metadata" aria-label="Alpha Hardscapes crew at work" />
                </div>
                {home.aboutImage && (
                  <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift ring-1 ring-ink/5 sm:-left-8">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-ink">
                      <Img image={home.aboutImage} fill sizes="112px" quality={90} className="object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold leading-tight">Sebastian Ullrich</p>
                      <p className="text-[13px] text-stone-500">Founder, on site for every job</p>
                    </div>
                  </div>
                )}
              </div>
            ) : home.aboutImage ? (
              <div className="relative mx-auto aspect-square max-w-[440px] overflow-hidden rounded-3xl bg-ink">
                <Img image={home.aboutImage} fill sizes="440px" quality={90} className="object-cover object-top" />
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Why Alpha" title={home.whyHeading || "Why homeowners choose Alpha Hardscapes"} text={home.aboutText} />
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {(home.whyItems || []).map((f) => (<FeatureItem key={f.title} f={f} />))}
            </div>
            <Link href="/about/" className="mt-10 inline-flex items-center gap-2 font-bold text-moss hover:text-ink">More about us <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="dark" id="process">
        <SectionHeading eyebrow="How it works" title={home.processHeading || "How a project works"} text={home.processText} light />
        <ol className="mt-12 grid gap-8 md:grid-cols-5">
          {(home.processSteps || []).map((s, i) => (
            <li key={s.title} className="relative border-t border-white/15 pt-6">
              <span className="font-display text-4xl font-medium text-lime">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[17px] font-bold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-300">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact/" className="btn-primary">Start with a free estimate <Icon name="arrow" className="h-4 w-4" /></Link>
          <a href={telHref(settings.phoneE164)} className="btn-outline-light"><Icon name="phone" className="h-4 w-4" /> {settings.phone}</a>
        </div>
      </Section>

      {/* Before / after */}
      {ba && ba.beforeImage && ba.afterImage && (
        <Section tone="white">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Before & after" title="See the difference a proper base and clean lines make" text="Drag the slider to compare. Every project starts with excavation, a compacted stone base and drainage, which is why our work still looks like this years later." />
              <Link href={`/projects/${ba.slug}/`} className="mt-8 inline-flex items-center gap-2 font-bold text-moss hover:text-ink">See this project <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="lg:col-span-7">
              <BeforeAfter before={ba.beforeImage} after={ba.afterImage} />
            </div>
          </div>
        </Section>
      )}

      {/* Reviews */}
      <Section id="reviews">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Reviews" title={home.reviewsHeading || "What our clients say"} />
          <div className="flex flex-wrap items-center gap-3">
            <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} />
            <Link href="/reviews/" className="btn-outline">All reviews</Link>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredReviews.map((t, i) => (<Reveal key={t._id} delay={i * 80}><TestimonialCard t={t} /></Reveal>))}
        </div>
      </Section>

      {/* Service areas */}
      <Section tone="muted" id="areas">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Service area" title={home.areasHeading || "Where we work"} text={home.areasText} />
            <ul className="mt-8 grid gap-3">
              {counties.map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}/`} className="card flex items-center justify-between p-4 hover:shadow-lift">
                    <span className="flex items-center gap-3 font-bold"><Icon name="map" className="h-5 w-5 text-moss" />{c.name}</span>
                    <Icon name="arrow" className="h-4 w-4 text-stone-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl bg-stone-200">
              <Img image={{ src: "/images/areas/southern-connecticut-map.webp", alt: "Map of the Alpha Hardscapes service area across Southern Connecticut", width: 1400, height: 1000 }} className="w-full" sizes="(min-width: 1024px) 700px, 100vw" />
            </div>
            {towns.length > 0 && (
              <p className="mt-5 text-[15px] leading-relaxed text-stone-700">
                <span className="font-bold text-ink">Towns we work in: </span>
                {towns.map((t, i) => (<span key={t.slug}><Link href={`/service-areas/${t.slug}/`} className="font-semibold text-moss underline decoration-lime decoration-2 underline-offset-2 hover:text-ink">{t.name}</Link>{i < towns.length - 1 ? ", " : ""}</span>))}
                {" "}and the surrounding towns.
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      {homeFaqs.length > 0 && (
        <Section tone="white" id="faq">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="FAQ" title={home.faqHeading || "Common questions"} text="Straight answers about estimates, timing, materials and where we work." />
              <Link href="/faq/" className="mt-6 inline-flex items-center gap-2 font-bold text-moss hover:text-ink">All questions <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="lg:col-span-8"><FaqList items={homeFaqs} /></div>
          </div>
          <JsonLd data={faqJsonLd(homeFaqs)} />
        </Section>
      )}

      <CtaBand settings={settings} />
    </>
  );
}
