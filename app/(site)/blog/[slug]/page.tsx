import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { RichText, headingsOf } from "@/components/blocks/RichText";
import { FaqList, faqJsonLd } from "@/components/blocks/Faq";
import { ServiceCard } from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { allSlugs, getPost, getPosts, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absUrl, formatDate, plainText, readingTime, SITE_URL, telHref } from "@/lib/site";

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
        <header className="container-x pt-8 sm:pt-12">
          <Breadcrumbs items={crumbs} />
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="eyebrow justify-center">{formatDate(post.publishedAt)} · {minutes} min read</p>
            <h1 className="display-lg mt-4">{post.title}</h1>
            {post.excerpt && <p className="mt-5 text-lg leading-relaxed text-stone-700">{post.excerpt}</p>}
            <p className="mt-4 text-sm text-stone-500">By {post.author || settings.businessName}</p>
          </div>
          {post.featuredImage && (
            <div className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl bg-stone-200" style={{ aspectRatio: `${post.featuredImage.width ?? 16} / ${post.featuredImage.height ?? 9}` }}>
              <Img image={post.featuredImage} fill priority sizes="(min-width: 1024px) 1024px, 100vw" quality={90} className="object-cover" />
            </div>
          )}
        </header>
        <div className="container-x grid gap-12 py-12 lg:grid-cols-12 sm:py-16">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {toc.length > 1 && (
                <nav aria-label="In this article" className="hidden lg:block">
                  <p className="eyebrow">In this article</p>
                  <ol className="mt-3 space-y-2 border-l border-ink/10 text-[14px]">
                    {toc.map((h) => (<li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent pl-4 text-stone-700 hover:border-lime hover:text-ink">{h.text}</a></li>))}
                  </ol>
                </nav>
              )}
              <div className="card p-5">
                <p className="font-bold">Planning this project?</p>
                <p className="mt-1 text-[14px] text-stone-700">We give free on-site estimates across New Haven, Hartford and Fairfield Counties.</p>
                <Link href="/contact/" className="btn-primary mt-4 w-full !py-3">Get a free estimate</Link>
                <a href={telHref(settings.phoneE164)} className="mt-3 flex items-center justify-center gap-2 text-[14px] font-bold hover:text-moss"><Icon name="phone" className="h-4 w-4 text-moss" />{settings.phone}</a>
              </div>
            </div>
          </aside>
          <div className="order-1 lg:order-2 lg:col-span-8">
            <RichText value={post.body} />
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="display-md">Frequently asked questions</h2>
                <FaqList items={post.faqs} className="mt-4" />
                <JsonLd data={faqJsonLd(post.faqs)} />
              </div>
            )}
            {post.relatedService && (
              <div className="mt-12">
                <p className="eyebrow">Related service</p>
                <div className="mt-4 max-w-md"><ServiceCard service={post.relatedService} /></div>
              </div>
            )}
          </div>
        </div>
      </article>
      {more.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-x">
            <h2 className="display-md">More guides</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-200">{p.featuredImage && <Img image={p.featuredImage} fill quality={90} sizes="(min-width: 1024px) 760px, (min-width: 640px) 95vw, 190vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />}</div>
                  <h3 className="display-sm mt-4 group-hover:text-moss">{p.title}</h3>
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
