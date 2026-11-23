import type { MetadataRoute } from "next";
import { absUrl, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Only the production domain may be indexed; previews carry noindex headers from the host or Vercel.
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/studio", "/api/", "/thank-you"] }],
    sitemap: absUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
