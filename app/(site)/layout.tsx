import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { JsonLd } from "@/components/blocks/JsonLd";
import { getAreas, getServices, getSettings } from "@/lib/content";
import { businessJsonLd } from "@/lib/seo";

/** Public site chrome: header, footer, sticky mobile bar and business schema. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services, areas] = await Promise.all([getSettings(), getServices(), getAreas()]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:font-bold">Skip to content</a>
      <Header settings={settings} services={services} />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} areas={areas} />
      <MobileBar settings={settings} />
      <JsonLd data={businessJsonLd(settings)} />
    </>
  );
}
