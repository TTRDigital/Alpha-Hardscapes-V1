import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/blocks/PageHero";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { getAreas, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({ title: "Service Areas in Connecticut", description: "Alpha Hardscapes builds patios, walkways, retaining walls and outdoor living spaces throughout New Haven, Hartford and Fairfield Counties, CT. See our towns.", path: "/service-areas/", settings });
}

export default async function AreasPage() {
  const [areas, settings] = await Promise.all([getAreas(), getSettings()]);
  const counties = areas.filter((a) => a.kind === "county");
  const towns = areas.filter((a) => a.kind === "town");
  const crumbs = [{ label: "Service areas", href: "/service-areas/" }];
  return (
    <>
      <PageHero eyebrow="Service areas" title="Where we work" text={`Based in Cheshire and serving ${settings.serviceAreaSummary || "Southern Connecticut"}. If your town is not listed, call us: we often work just beyond these lines.`} crumbs={crumbs} compact />
      <section className="container-x py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {counties.map((c) => (
            <Link key={c.slug} href={`/service-areas/${c.slug}/`} className="group card overflow-hidden hover:shadow-lift">
              <div className="relative aspect-[4/3] bg-stone-200">{c.image && <Img image={c.image} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />}</div>
              <div className="p-6">
                <h2 className="display-sm">{c.name}</h2>
                {c.intro && <p className="mt-2 line-clamp-3 text-[15px] text-stone-700">{c.intro}</p>}
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-bold text-moss">Explore {c.name} <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        {towns.length > 0 && (
          <div className="mt-16">
            <h2 className="display-md">Town pages</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {towns.map((t) => (
                <Link key={t.slug} href={`/service-areas/${t.slug}/`} className="card flex items-center justify-between p-4 hover:shadow-lift">
                  <span><span className="font-bold">{t.name}</span>{t.county && <span className="block text-sm text-stone-500">{t.county.name}</span>}</span>
                  <Icon name="arrow" className="h-4 w-4 text-stone-500" />
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mx-auto mt-16 max-w-[560px] overflow-hidden rounded-3xl bg-stone-200">
          <Img image={{ src: "/images/areas/southern-connecticut-map.webp", alt: "Map of the Alpha Hardscapes service area across Southern Connecticut", width: 702, height: 626 }} className="w-full" sizes="560px" quality={90} />
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
