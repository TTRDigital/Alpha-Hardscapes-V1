import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", weight: "variable", axes: ["opsz", "SOFT"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Alpha Hardscapes", template: "%s" },
  icons: { icon: [{ url: "/images/brand/favicon.ico" }, { url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/images/brand/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#141614", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
