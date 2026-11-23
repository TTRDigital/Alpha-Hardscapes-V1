import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { Tracking } from "@/components/site/Tracking";
import { QuoteProvider } from "@/components/forms/QuoteDialog";
import { JsonLd } from "@/components/blocks/JsonLd";
import { getSettings } from "@/lib/content";
import { businessJsonLd } from "@/lib/seo";

/** Public site chrome: header, footer, quote pop-up, sticky mobile bar, tracking and business schema. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <QuoteProvider forms={settings.forms} heading={settings.popupHeading}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:font-medium">Skip to content</a>
      <Header settings={{ businessName: settings.businessName, phone: settings.phone, phoneE164: settings.phoneE164, headerNav: settings.headerNav, headerCta: settings.headerCta, logo: settings.logo, logoLight: settings.logoLight }} />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <MobileBar phoneE164={settings.phoneE164} ctaLabel={settings.headerCta.label} formKey={settings.headerCta.formKey} />
      <JsonLd data={businessJsonLd(settings)} />
      <Tracking />
    </QuoteProvider>
  );
}
