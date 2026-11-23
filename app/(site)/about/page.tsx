import type { Metadata } from "next";
import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
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
      <section className="container-x grid items-start gap-12 py-16 lg:grid-cols-12 sm:py-24">
        <div className="lg:col-span-5">
          {about.founderImage && (
            <div className="relative mx-auto aspect-square max-w-[380px] overflow-hidden rounded-3xl bg-ink">
              <Img image={about.founderImage} fill sizes="380px" quality={90} className="object-cover object-top" />
            </div>
          )}
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow">Meet {about.founderName?.split(" ")[0] || "the founder"}</p>
          <h2 className="display-lg mt-3">{about.founderName}</h2>
          {about.founderTitle && <p className="mt-1 text-lg font-semibold text-stone-500">{about.founderTitle}</p>}
          <RichText value={about.founderBio} className="mt-6" />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} />
            <Link href="/reviews/" className="inline-flex items-center gap-2 font-bold text-moss hover:text-ink">Read the reviews <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {about.values && about.values.length > 0 && (
        <section className="bg-stone-100 py-16 sm:py-24">
          <div className="container-x">
            <p className="eyebrow">What we stand for</p>
            <h2 className="display-lg mt-3 max-w-2xl">The Alpha advantage</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((v) => (<FeatureItem key={v.title} f={v} />))}
            </div>
          </div>
        </section>
      )}

      <section className="container-x grid gap-12 py-16 lg:grid-cols-12 sm:py-24">
        <div className="lg:col-span-7"><RichText value={about.body} /></div>
        <div className="lg:col-span-5">
          <div className="card p-6">
            <p className="eyebrow">How we work</p>
            <ol className="mt-4 space-y-4">
              {(home.processSteps || []).map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime font-display font-semibold text-ink">{i + 1}</span>
                  <div><p className="font-bold">{s.title}</p><p className="mt-0.5 text-[14px] text-stone-700">{s.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display-md">Recent projects</h2>
            <Link href="/projects/" className="hidden items-center gap-2 font-bold text-moss hover:text-ink sm:inline-flex">All projects <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.slice(0, 3).map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">{testimonials.slice(0, 3).map((t) => (<TestimonialCard key={t._id} t={t} compact />))}</div>
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
