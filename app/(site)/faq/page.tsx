import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/PageHero";
import { FaqList, faqJsonLd } from "@/components/blocks/Faq";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { getFaqs, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({ title: "Hardscaping & Masonry FAQ", description: "Answers about estimates, timelines, materials, financing, maintenance and the areas Alpha Hardscapes serves in Connecticut.", path: "/faq/", settings });
}

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSettings()]);
  const categories = [...new Set(faqs.map((f) => f.category || "General"))];
  const crumbs = [{ label: "FAQ", href: "/faq/" }];
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered." text="If yours is not here, call us. We are happy to talk a project through before you decide anything." crumbs={crumbs} />
      <section className="container-x space-y-20 pb-24 sm:pb-32">
        {categories.map((c) => (
          <div key={c} className="grid gap-8 lg:grid-cols-12">
            <h2 className="h-md lg:col-span-4">{c}</h2>
            <div className="lg:col-span-8"><FaqList items={faqs.filter((f) => (f.category || "General") === c)} /></div>
          </div>
        ))}
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(faqs)]} />
    </>
  );
}
