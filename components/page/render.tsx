import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPages, getPage, getPosts, getSettings } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, firstText, isNoindex, pageMetadata, postJsonLd, visibleFaqs, webPageJsonLd } from "@/lib/seo";
import { plainText, readingTime } from "@/lib/site";
import { JsonLd } from "@/components/blocks/JsonLd";
import { ArchiveView, HomeView, PageView, PostView } from "./PageView";

/** Card summary: the post's opening words, as WordPress showed them. */
function excerptOf(text: string) {
  const w = text.split(/\s+/).filter(Boolean);
  return w.length > 20 ? `${w.slice(0, 20).join(" ")}…` : text;
}

export async function metadataFor(path: string): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage(path), getSettings()]);
  if (!page) return {};
  return pageMetadata(page, settings);
}

/** Renders any address the live site has: pages, posts and blog lists. */
export async function renderPath(path: string) {
  const [page, settings, all] = await Promise.all([getPage(path), getSettings(), getAllPages()]);
  if (!page) notFound();
  const titleOf = (p: string) => all.find((x) => x.path === p)?.title;
  const faqs = visibleFaqs(page);
  const ld: object[] = [webPageJsonLd(page, page.seo.description || firstText(page).slice(0, 160)), breadcrumbJsonLd(page, titleOf)];
  if (faqs.length && !isNoindex(page)) ld.push(faqJsonLd(faqs));

  let body: React.ReactNode;
  const contentH1 = page.sections.some((s) => s.atoms.some((a) => a._type === "hdg" && a.level === 1));
  if (page.kind === "post" && contentH1) {
    // A post built like a page (the West Hartford location page): shown as a page, its own H1 kept.
    ld.push(postJsonLd(page, settings));
    body = <PageView page={page} settings={settings} />;
  } else if (page.kind === "post") {
    ld.push(postJsonLd(page, settings));
    const posts = await getPosts();
    const related = posts.filter((p) => p.path !== page.path && !/automation-my-facebook/.test(p.path)).slice(0, 3);
    body = <PostView page={page} settings={settings} related={related} />;
  } else if (page.kind === "archive") {
    const posts = (await getPosts()).filter((p) =>
      page.archive === "category" ? (p.categories || []).includes(page.category || page.path.split("/")[2]) : page.archive === "author" ? p.authorSlug === (page.authorSlug || page.path.split("/")[2]) : true,
    );
    // Reading time needs each post's text; the list only carries the summary, so estimate from the full post.
    const withMinutes = await Promise.all(posts.map(async (p) => {
      const full = await getPage(p.path);
      const words = plainText((full?.sections || []).flatMap((s) => s.atoms).flatMap((a) => (a._type === "rt" ? a.body : [])) as never);
      return { ...p, minutes: readingTime(words), excerpt: p.excerpt || excerptOf(words) };
    }));
    body = <ArchiveView page={page} settings={settings} posts={withMinutes} />;
  } else if (page.path === "/") {
    body = <HomeView page={page} settings={settings} />;
  } else {
    body = <PageView page={page} settings={settings} />;
  }
  return (
    <>
      {body}
      {ld.map((d, i) => <JsonLd key={i} data={d} />)}
    </>
  );
}
