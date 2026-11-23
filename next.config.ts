import type { NextConfig } from "next";
import { redirects } from "./redirects";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
  async redirects() {
    return redirects;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      { source: "/images/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
