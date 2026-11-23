import { metadataFor, renderPath } from "@/components/page/render";
import { getAllPages } from "@/lib/content";

/** Every live address (pages, posts, blog lists, thank-you and ad pages) keeps its exact URL. */
export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ path: string[] }> };

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.filter((p) => p.path !== "/").map((p) => ({ path: p.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const { path } = await params;
  return metadataFor(path.join("/"));
}

export default async function LegacyPage({ params }: Props) {
  const { path } = await params;
  return renderPath(path.map(decodeURIComponent).join("/"));
}
