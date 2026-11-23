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
  const crumbs = [{ label: "Blog", href: "/blog/" }];
  return (
    <>
      <PageHero eyebrow="Journal" title="Guides for Connecticut homeowners." text="What things cost, which materials last, and how to plan and care for a project. Written from the jobs we build." crumbs={crumbs} />
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-mist">{p.featuredImage && <Img image={p.featuredImage} fill priority={i < 3} quality={90} sizes="(min-width: 1024px) 760px, (min-width: 640px) 95vw, 190vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" />}</div>
              <p className="mt-5 text-[13px] text-subtle">{formatDate(p.publishedAt)}</p>
              <h2 className="h-sm mt-2 group-hover:text-muted">{p.title}</h2>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
