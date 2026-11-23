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
      <PageHero eyebrow="FAQ" title="Answers to your hardscaping and masonry questions" text="If your question is not here, call us. We are happy to talk through a project before you decide anything." crumbs={crumbs} compact />
      <section className="container-x grid gap-12 py-12 lg:grid-cols-12 sm:py-16">
        <nav className="lg:col-span-3" aria-label="FAQ categories">
          <ul className="sticky top-24 space-y-1 text-[15px] font-semibold">
            {categories.map((c) => (<li key={c}><a href={`#${c.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="block rounded-lg px-3 py-2 text-ink-700 hover:bg-stone-100 hover:text-ink">{c}</a></li>))}
          </ul>
        </nav>
        <div className="space-y-12 lg:col-span-9">
          {categories.map((c) => (
            <div key={c} id={c.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
              <h2 className="display-md">{c}</h2>
              <FaqList items={faqs.filter((f) => (f.category || "General") === c)} className="mt-2" />
            </div>
          ))}
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(faqs)]} />
    </>
  );
}
