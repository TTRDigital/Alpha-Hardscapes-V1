import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/blocks/PageHero";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { Img } from "@/components/ui/Img";
import { getPosts, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({ title: "Hardscaping Guides for Connecticut Homeowners", description: "Costs, materials, maintenance and planning guides for patios, walkways, retaining walls, outdoor kitchens and fire features in Connecticut, from Alpha Hardscapes.", path: "/blog/", settings });
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([getPosts(), getSettings()]);
  const [first, ...rest] = posts;
  const crumbs = [{ label: "Blog", href: "/blog/" }];
  return (
    <>
      <PageHero eyebrow="Blog" title="Guides for Connecticut homeowners" text="What things cost, which materials last, how to plan a project and how to look after it afterwards. Written from the jobs we build." crumbs={crumbs} compact />
      <section className="container-x py-12 sm:py-16">
        {first && (
          <Link href={`/blog/${first.slug}/`} className="group grid gap-6 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5 lg:grid-cols-2">
            <div className="relative aspect-[16/9] bg-stone-200 lg:aspect-auto lg:min-h-[360px]">{first.featuredImage && <Img image={first.featuredImage} fill priority sizes="(min-width: 1024px) 620px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}</div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="eyebrow">Latest</p>
              <h2 className="display-md mt-3 group-hover:text-moss">{first.title}</h2>
              {first.excerpt && <p className="mt-4 line-clamp-3 text-[16px] leading-relaxed text-stone-700">{first.excerpt}</p>}
              <p className="mt-5 text-sm text-stone-500">{formatDate(first.publishedAt)}</p>
            </div>
          </Link>
        )}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-200">{p.featuredImage && <Img image={p.featuredImage} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />}</div>
              <p className="mt-4 text-sm text-stone-500">{formatDate(p.publishedAt)}</p>
              <h2 className="display-sm mt-1 group-hover:text-moss">{p.title}</h2>
              {p.excerpt && <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-stone-700">{p.excerpt}</p>}
            </Link>
          ))}
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
