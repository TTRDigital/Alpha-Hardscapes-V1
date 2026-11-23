import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/blocks/PageHero";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
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
  const crumbs = [{ label: "Service areas", href: "/service-areas/" }];
  return (
    <>
      <PageHero eyebrow="Service areas" title="Where we work." text={`Based in Cheshire and serving ${settings.serviceAreaSummary || "Southern Connecticut"}. If your town is not listed, call us: we often work just beyond these lines.`} crumbs={crumbs} />
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid gap-14 md:grid-cols-3">
          {counties.map((c) => {
            const towns = areas.filter((a) => a.kind === "town" && a.county?.slug === c.slug);
            return (
              <div key={c.slug} className="border-t border-ink pt-6">
                <Link href={`/service-areas/${c.slug}/`} className="h-md hover:text-muted">{c.name} →</Link>
                {c.intro && <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-muted">{c.intro}</p>}
                {towns.length > 0 && (
                  <ul className="mt-6 border-t border-line">
                    {towns.map((t) => (<li key={t.slug} className="border-b border-line"><Link href={`/service-areas/${t.slug}/`} className="flex justify-between py-3 text-[16px] hover:text-muted">{t.name}<span aria-hidden="true">→</span></Link></li>))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
