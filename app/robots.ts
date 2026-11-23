import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Staging and preview hosts are kept out of search by an X-Robots-Tag: noindex header (next.config.ts).
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/studio/", "/api/", "/wp-admin/"] }],
    sitemap: absUrl("/sitemap_index.xml"),
  };
}
