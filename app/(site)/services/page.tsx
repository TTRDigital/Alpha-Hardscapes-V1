import type { Metadata } from "next";
import Link from "next/link";
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
  return buildMetadata({ title: "Hardscaping & Masonry Services in CT", description: "Patios, walkways, retaining walls, steps, outdoor kitchens, fire pits, pool patios, chimneys and landscaping in New Haven, Hartford and Fairfield Counties.", path: "/services/", settings });
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const order = ["hardscaping", "masonry", "outdoor-living", "landscaping", "maintenance"];
  const featured = services.filter((s) => s.featured).slice(0, 6);
  const crumbs = [{ label: "Services", href: "/services/" }];
  return (
    <>
      <PageHero eyebrow="Services" title="Everything outside the house, built by one crew." text="Hardscaping, masonry, outdoor living and landscaping, designed together so the patio, walls, steps and planting work as one space." crumbs={crumbs} />
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (<ServiceCard key={s.slug} service={s} priority={i < 3} />))}
        </div>
      </section>
      <section className="border-t border-line bg-white py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label">Full list</p>
            <h2 className="h-lg mt-4">All services</h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            {order.map((cat) => {
              const items = services.filter((s) => s.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <p className="text-[14px] text-subtle">{SERVICE_CATEGORY_LABELS[cat]}</p>
                  <ul className="mt-3 border-t border-line">
                    {items.map((s) => (
                      <li key={s.slug} className="border-b border-line">
                        <Link href={`/services/${s.slug}/`} className="flex items-center justify-between py-3.5 text-[17px] tracking-[-0.01em] transition-colors hover:text-muted">{s.title}<span aria-hidden="true">→</span></Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
