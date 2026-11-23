import { getPosts, getSettings } from "@/lib/content";
import { absUrl, SITE_URL } from "@/lib/site";

/** RSS feed of the blog, at the live site's /feed/ address. */
export const revalidate = 3600;
const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const [posts, s] = await Promise.all([getPosts(), getSettings()]);
  const items = posts
    .map((p) => `<item><title>${esc(p.title)}</title><link>${absUrl(p.path)}</link><guid>${absUrl(p.path)}</guid>${p.date ? `<pubDate>${new Date(p.date).toUTCString()}</pubDate>` : ""}${p.author ? `<dc:creator>${esc(p.author)}</dc:creator>` : ""}<description>${esc(p.excerpt || "")}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(s.businessName)}</title><link>${SITE_URL}/</link><atom:link href="${absUrl("/feed/")}" rel="self" type="application/rss+xml"/><description>Hardscaping, patio, paver and landscaping tips for Connecticut homeowners</description><language>en-US</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
