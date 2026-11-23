import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", weight: ["400"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Alpha Hardscapes", template: "%s" },
  icons: { icon: [{ url: "/images/brand/favicon.ico" }, { url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/images/brand/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#0e0f0e", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
