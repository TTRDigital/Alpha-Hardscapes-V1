import type { Metadata } from "next";
import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/blocks/PageHero";
import { FeatureItem, ProjectCard, TestimonialCard } from "@/components/blocks/Cards";
import { RichText } from "@/components/blocks/RichText";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { GoogleBadge } from "@/components/ui/Rating";
import { getAboutPage, getHomePage, getProjects, getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([getAboutPage(), getSettings()]);
  return buildMetadata({ title: "About Alpha Hardscapes", description: about.intro, path: "/about/", seo: about.seo, image: about.heroImage, settings });
}

export default async function AboutPage() {
  const [about, home, settings, projects, testimonials] = await Promise.all([getAboutPage(), getHomePage(), getSettings(), getProjects(), getTestimonials()]);
  const crumbs = [{ label: "About", href: "/about/" }];
  return (
    <>
      <PageHero eyebrow="About" title={about.heading} text={about.intro} image={about.heroImage} crumbs={crumbs} />

      <section className="container-x grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {about.founderImage && (
            <div className="relative mx-auto aspect-square max-w-[380px] overflow-hidden rounded-lg bg-ink">
              <Img image={about.founderImage} fill sizes="380px" quality={90} className="object-cover object-top" />
            </div>
          )}
        </div>
        <div className="lg:col-span-7">
          <p className="label">Founder</p>
          <h2 className="h-xl mt-4">{about.founderName}</h2>
          {about.founderTitle && <p className="mt-2 text-[17px] text-muted">{about.founderTitle}</p>}
          <RichText value={about.founderBio} className="mt-8" />
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} />
            <Link href="/reviews/" className="link-arrow">Read the reviews →</Link>
          </div>
        </div>
      </section>

      {about.values && about.values.length > 0 && (
        <section className="border-t border-line bg-white py-20 sm:py-28">
          <div className="container-x">
            <p className="label">What we stand for</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{about.values.map((v) => (<FeatureItem key={v.title} f={v} />))}</div>
          </div>
        </section>
      )}

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4"><p className="label">How we work</p></div>
        <ol className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
          {(home.processSteps || []).map((s, i) => (<li key={s.title}><FeatureItem f={s} index={i} numbered /></li>))}
        </ol>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <div className="container-x">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">{projects.slice(0, 2).map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
          <div className="mt-20 grid gap-10 md:grid-cols-3">{testimonials.slice(0, 3).map((t) => (<TestimonialCard key={t._id} t={t} compact />))}</div>
        </div>
      </section>
      <section className="container-x pb-20"><RichText value={about.body} className="max-w-2xl" /></section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
