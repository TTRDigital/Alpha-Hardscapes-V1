import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/PageHero";
import { ServiceCard } from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { getServices, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { SERVICE_CATEGORY_LABELS } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({ title: "Hardscaping, Masonry & Outdoor Living Services in Connecticut", description: "Paver patios, walkways, retaining walls, stone steps, outdoor kitchens, fire features, pool patios, chimneys, stone veneer, repairs, landscaping and seasonal services across New Haven, Hartford and Fairfield Counties.", path: "/services/", settings });
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const order = ["hardscaping", "masonry", "outdoor-living", "landscaping", "maintenance"];
  const groups = order.map((cat) => ({ cat, label: SERVICE_CATEGORY_LABELS[cat], items: services.filter((s) => s.category === cat) })).filter((g) => g.items.length);
  const crumbs = [{ label: "Services", href: "/services/" }];
  return (
    <>
      <PageHero eyebrow="Services" title="Everything outside the house, built by one crew" text="Hardscaping, masonry, outdoor living and landscaping, designed together so the patio, walls, steps and planting all work as one space." crumbs={crumbs} />
      <section className="container-x py-16 sm:py-24">
        <div className="space-y-16">
          {groups.map((g) => (
            <div key={g.cat} id={g.cat}>
              <div className="flex items-baseline gap-4 border-b border-ink/10 pb-4">
                <h2 className="display-md">{g.label}</h2>
                <span className="text-sm font-semibold text-stone-500">{g.items.length} {g.items.length === 1 ? "service" : "services"}</span>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((s) => (<ServiceCard key={s.slug} service={s} />))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
