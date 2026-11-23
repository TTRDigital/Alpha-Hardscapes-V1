import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Img } from "@/components/ui/Img";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { RichText, headingsOf } from "@/components/blocks/RichText";
import { FaqList, faqJsonLd } from "@/components/blocks/Faq";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { allSlugs, getPost, getPosts, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absUrl, formatDate, plainText, readingTime, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await allSlugs("post")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [p, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!p) return {};
  return buildMetadata({ title: p.seo?.title || p.title, description: p.excerpt, path: `/blog/${p.slug}/`, seo: p.seo, image: p.featuredImage, type: "article", publishedTime: p.publishedAt, modifiedTime: p.updatedAt, settings });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, posts, settings] = await Promise.all([getPost(slug), getPosts(), getSettings()]);
  if (!post) notFound();
  const text = plainText(post.body as { _type: string; children?: { text?: string }[] }[]);
  const minutes = readingTime(text);
  const toc = headingsOf(post.body).slice(0, 12);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const crumbs = [{ label: "Blog", href: "/blog/" }, { label: post.title, href: `/blog/${post.slug}/` }];

  return (
    <>
      <article>
        <header className="container-x pt-10 sm:pt-14">
          <Breadcrumbs items={crumbs} />
          <div className="mx-auto mt-14 max-w-3xl">
            <p className="label">{formatDate(post.publishedAt)} · {minutes} min read</p>
            <h1 className="h-xl mt-5">{post.title}</h1>
            {post.excerpt && <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">{post.excerpt}</p>}
          </div>
          {post.featuredImage && (
            <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-lg bg-mist" style={{ aspectRatio: `${post.featuredImage.width ?? 16} / ${post.featuredImage.height ?? 9}` }}>
              <Img image={post.featuredImage} fill priority sizes="(min-width: 1024px) 1024px, 100vw" quality={90} className="object-cover" />
            </div>
          )}
        </header>
        <div className="container-x py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            {toc.length > 2 && (
              <nav aria-label="In this article" className="mb-14 border-y border-line py-6">
                <p className="text-[13px] text-subtle">In this article</p>
                <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-[15px] sm:grid-cols-2">
                  {toc.map((h) => (<li key={h.id}><a href={`#${h.id}`} className="text-muted hover:text-ink">{h.text}</a></li>))}
                </ol>
              </nav>
            )}
            <RichText value={post.body} />
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-16">
                <h2 className="h-md">Frequently asked questions</h2>
                <FaqList items={post.faqs} className="mt-6" />
                <JsonLd data={faqJsonLd(post.faqs)} />
              </div>
            )}
            <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[16px]">Planning this project? <span className="text-muted">Free on-site estimates across Southern Connecticut.</span></p>
              <Link href="/contact/" className="btn-primary shrink-0">Get a free estimate</Link>
            </div>
            {post.relatedService && (
              <Link href={`/services/${post.relatedService.slug}/`} className="mt-10 flex items-center justify-between border-y border-line py-5 hover:text-muted">
                <span><span className="block text-[13px] text-subtle">Related service</span><span className="h-sm">{post.relatedService.title}</span></span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </article>
      {more.length > 0 && (
        <section className="border-t border-line bg-white py-20">
          <div className="container-x">
            <p className="label">More guides</p>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-mist">{p.featuredImage && <Img image={p.featuredImage} fill quality={90} sizes="(min-width: 1024px) 760px, (min-width: 640px) 95vw, 190vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" />}</div>
                  <h3 className="h-sm mt-5 group-hover:text-muted">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand settings={settings} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: { "@type": "Organization", name: settings.businessName, url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#business` },
        mainEntityOfPage: absUrl(`/blog/${post.slug}/`),
        image: post.featuredImage ? (post.featuredImage.src.startsWith("http") ? post.featuredImage.src : absUrl(post.featuredImage.src)) : undefined,
        wordCount: text.split(/\s+/).length,
      }]} />
    </>
  );
}
