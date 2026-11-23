import Link from "next/link";
import type { Metadata } from "next";
import { Img } from "@/components/ui/Img";
import { GoogleBadge } from "@/components/ui/Rating";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVideo } from "@/components/blocks/HeroVideo";
import { FeatureItem, ProjectCard, ServiceCard, TestimonialCard } from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { getHomePage, getProjects, getServices, getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomePage(), getSettings()]);
  return buildMetadata({ title: home.seo?.title || settings.seo?.title || settings.businessName, description: home.seo?.description, path: "/", seo: home.seo, image: home.heroImage, settings });
}

export default async function HomePage() {
  const [home, settings, services, projects, testimonials] = await Promise.all([getHomePage(), getSettings(), getServices(), getProjects(), getTestimonials()]);
  const featuredServices = (home.featuredServices?.length ? home.featuredServices : services.filter((s) => s.featured)).slice(0, 6);
  const featuredProjects = (home.featuredProjects?.length ? home.featuredProjects : projects.filter((p) => p.featured)).slice(0, 5);
  const featured = testimonials.filter((t) => t.featured);
  const reviews = (featured.length >= 3 ? featured : testimonials).slice(0, 3);
  const [leadProject, ...moreProjects] = featuredProjects;

  return (
    <>
      {/* 1. Hero: the live site's background video, headline bottom-left, nothing else competing */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white">
        {home.heroImage && <Img image={home.heroImage} fill priority sizes="(max-width: 767px) 200vw, 100vw" className="-z-20 object-cover" />}
        {home.heroVideoUrl && <HeroVideo src={home.heroVideoUrl} poster={home.heroImage?.src} />}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(14_15_14/0.85)_0%,rgb(14_15_14/0.35)_45%,rgb(14_15_14/0.25)_100%)]" aria-hidden="true" />
        <div className="container-x pb-28 pt-40 sm:pb-20">
          {home.eyebrow && <p className="label-light">{home.eyebrow}</p>}
          <h1 className="h-display mt-6 max-w-5xl">{home.heading}</h1>
          <div className="mt-10 grid gap-10 border-t border-white/15 pt-8 md:grid-cols-12 md:items-end">
            {home.subheading && <p className="max-w-xl text-[1.1rem] leading-relaxed text-white/75 md:col-span-6">{home.subheading}</p>}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center md:col-span-6 md:justify-end">
              <Link href="/contact/" className="btn-lime">{settings.ctaPrimary || "Get a free estimate"}</Link>
              <a href={telHref(settings.phoneE164)} className="text-[16px] font-medium tabular-nums text-white/85 hover:text-white">or call {settings.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statement + three numbers */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="label lg:col-span-3">(01) Who we are</p>
          <div className="lg:col-span-9">
            <p className="text-[1.6rem] leading-[1.3] tracking-[-0.025em] text-ink sm:text-[2.2rem] lg:text-[2.6rem]">{home.aboutText}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/about/" className="link-arrow">About Alpha Hardscapes →</Link>
              <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} />
            </div>
            {home.stats && home.stats.length > 0 && (
              <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-8">
                {home.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-[2.2rem] font-medium tracking-[-0.04em] tabular-nums sm:text-[3rem]">{s.value}</dd>
                    <dd className="mt-1 text-[14px] text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </Section>

      {/* 3. Services */}
      <Section tone="white" id="services">
        <SectionHeading index="02" eyebrow="Services" title={home.servicesHeading || "What we build"} text={home.servicesText} action={<Link href="/services/" className="link-arrow">All services →</Link>} />
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s, i) => (<Reveal key={s.slug} delay={(i % 3) * 70}><ServiceCard service={s} showExcerpt={false} /></Reveal>))}
        </div>
      </Section>

      {/* 4. Selected work */}
      {leadProject && (
        <Section id="projects">
          <SectionHeading index="03" eyebrow="Selected work" title={home.projectsHeading || "Recent projects"} text={home.projectsText} action={<Link href="/projects/" className="link-arrow">All projects →</Link>} />
          <div className="mt-14"><ProjectCard project={leadProject} aspect="aspect-[4/3] sm:aspect-[21/9]" priority={false} /></div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {moreProjects.map((p, i) => (<Reveal key={p.slug} delay={(i % 2) * 70}><ProjectCard project={p} /></Reveal>))}
          </div>
        </Section>
      )}

      {/* 5. The crew: vertical reel + founder line */}
      <Section tone="white" id="about">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {home.reelVideoUrl ? (
              <div className="relative mx-auto aspect-[3/4] max-w-[440px] overflow-hidden rounded-lg bg-ink">
                <video className="absolute inset-0 h-full w-full object-cover" src={home.reelVideoUrl} poster={home.reelPosterUrl} muted loop playsInline autoPlay controls preload="metadata" aria-label="Alpha Hardscapes crew at work" />
              </div>
            ) : home.aboutImage ? (
              <div className="relative mx-auto aspect-square max-w-[380px] overflow-hidden rounded-lg bg-ink">
                <Img image={home.aboutImage} fill sizes="380px" quality={90} className="object-cover object-top" />
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-7">
            <p className="label">(04) The crew</p>
            <blockquote className="h-lg mt-6 max-w-2xl">“The person who writes your estimate is the person who builds your project.”</blockquote>
            <div className="mt-8 flex items-center gap-4">
              {home.aboutImage && (
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-ink">
                  <Img image={home.aboutImage} fill sizes="96px" quality={90} className="object-cover object-top" />
                </div>
              )}
              <p className="text-[15px]"><span className="font-medium">Sebastian Ullrich</span><span className="text-muted"> · Founder, on site for every job</span></p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {(home.whyItems || []).slice(0, 4).map((f) => (<FeatureItem key={f.title} f={f} />))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Process */}
      <Section tone="muted" id="process">
        <SectionHeading index="05" eyebrow="Process" title={home.processHeading || "How a project works"} text={home.processText} />
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {(home.processSteps || []).map((s, i) => (<li key={s.title}><FeatureItem f={s} index={i} numbered /></li>))}
        </ol>
      </Section>

      {/* 7. Reviews */}
      <Section id="reviews">
        <SectionHeading index="06" eyebrow="Reviews" title={home.reviewsHeading || "What our clients say"} action={<GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} />} />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {reviews.map((t, i) => (<Reveal key={t._id} delay={i * 70}><TestimonialCard t={t} /></Reveal>))}
        </div>
        <Link href="/reviews/" className="link-arrow mt-12">Read all reviews →</Link>
      </Section>

      <CtaBand settings={settings} />
    </>
  );
}
