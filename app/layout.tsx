import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
// Headings: a light serif display face. Body and labels: Geist. Two families in total.
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Alpha Hardscapes", template: "%s" },
  icons: { icon: [{ url: "/images/brand/favicon.ico" }, { url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/images/brand/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#f6f4ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
