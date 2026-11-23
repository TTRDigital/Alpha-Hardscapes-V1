import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/PageHero";
import { RichText } from "@/components/blocks/RichText";
import { allSlugs, getPage, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await allSlugs("page")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [p, settings] = await Promise.all([getPage(slug), getSettings()]);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.intro, path: `/${p.slug}/`, seo: p.seo, settings });
}

/** Simple editable pages (privacy policy, terms and any page added in Sanity). */
export default async function SimplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  return (
    <>
      <PageHero title={page.title} text={page.intro} crumbs={[{ label: page.title, href: `/${page.slug}/` }]} compact />
      <section className="container-x py-12 sm:py-16"><div className="max-w-3xl"><RichText value={page.body} /></div></section>
    </>
  );
}
