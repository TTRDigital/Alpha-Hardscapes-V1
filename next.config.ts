import type { NextConfig } from "next";
import { redirects } from "./redirects";

const PRODUCTION_HOST = "alphahardscapes.com";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Every address keeps the live site's trailing slash.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    const year = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/images/:path*", headers: year },
      { source: "/og/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      // Only the real domain may be indexed. Staging (the vercel.app address) and previews get
      // noindex on every page; crawling stays allowed so search engines see the header.
      {
        source: "/:path*",
        missing: [{ type: "host", value: PRODUCTION_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  // The season-end ad page is one static file in public/patios-walkways/. Serve it at the folder address.
  async rewrites() {
    return { beforeFiles: [{ source: "/patios-walkways/", destination: "/patios-walkways/index.html" }], afterFiles: [], fallback: [] };
  },
  async redirects() {
    return [
      // One host: www goes to the bare domain, keeping the path.
      { source: "/:path*", has: [{ type: "host", value: `www.${PRODUCTION_HOST}` }], destination: `https://${PRODUCTION_HOST}/:path*`, permanent: true },
      ...redirects,
    ];
  },
};

export default nextConfig;
