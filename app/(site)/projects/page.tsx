import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/PageHero";
import { ProjectGrid } from "@/components/blocks/ProjectGrid";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { getProjects, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({ title: "Patio, Walkway & Retaining Wall Projects", description: "Photos of paver patios, walkways, retaining walls, steps, pool patios and fire pits built by Alpha Hardscapes across New Haven, Hartford and Fairfield Counties, CT.", path: "/projects/", settings });
}

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  const crumbs = [{ label: "Projects", href: "/projects/" }];
  return (
    <>
      <PageHero eyebrow="Projects" title="Real yards, real work." text="Patios, walkways, walls, steps and outdoor living spaces, photographed on site by our crew." crumbs={crumbs} />
      <section className="container-x pb-24 pt-4 sm:pb-32"><ProjectGrid projects={projects} /></section>
      <CtaBand settings={settings} title="Want your yard here next?" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
