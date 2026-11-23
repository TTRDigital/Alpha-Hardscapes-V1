import { getAllPages } from "@/lib/content";
import { absUrl } from "@/lib/site";

/** The live site's sitemap address (/sitemap.xml redirects here). Lists every indexable page. */
export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

export async function GET() {
  const pages = (await getAllPages()).filter((p) => !/noindex/i.test(p.seo?.robots || ""));
  const urls = pages
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((p) => `  <url><loc>${esc(absUrl(p.path))}</loc>${p.modified || p.date ? `<lastmod>${new Date(p.modified || p.date!).toISOString()}</lastmod>` : ""}</url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
