import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Img } from "@/components/ui/Img";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { Gallery } from "@/components/blocks/Gallery";
import { BeforeAfter } from "@/components/blocks/BeforeAfter";
import { RichText } from "@/components/blocks/RichText";
import { ProjectCard } from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/blocks/JsonLd";
import { allSlugs, getProject, getProjects, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absUrl } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await allSlugs("project")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [p, settings] = await Promise.all([getProject(slug), getSettings()]);
  if (!p) return {};
  return buildMetadata({ title: `${p.title}${p.town ? ` in ${p.town}` : ""}`, description: p.summary, path: `/projects/${p.slug}/`, seo: p.seo, image: p.coverImage, settings });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, projects, settings] = await Promise.all([getProject(slug), getProjects(), getSettings()]);
  if (!project) notFound();
  const all = [project.coverImage, ...(project.images || [])];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const more = projects.filter((p) => p.slug !== project.slug && p.services?.some((s) => project.services?.some((x) => x.slug === s.slug))).slice(0, 2);
  const crumbs = [{ label: "Projects", href: "/projects/" }, { label: project.title, href: `/projects/${project.slug}/` }];
  const completed = project.completedAt ? new Date(project.completedAt).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }) : undefined;
  const meta = [
    ["Services", project.services?.map((s) => s.title).join(", ")],
    ["Location", project.town],
    ["Completed", completed],
    ["Materials", project.materials?.join(", ")],
  ].filter(([, v]) => v) as [string, string][];
  const wide = (project.coverImage.width ?? 2560) >= 1600;

  return (
    <>
      <section className="container-x pt-10 sm:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <h1 className="h-xl lg:col-span-8">{project.title}</h1>
          {project.summary && <p className="text-[1.05rem] leading-relaxed text-muted lg:col-span-4">{project.summary}</p>}
        </div>
        <div className="mt-12">
          {wide ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist sm:aspect-[16/9]">
              <Img image={project.coverImage} fill priority sizes="(max-width: 767px) 200vw, 1320px" quality={85} className="object-cover" />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-lg bg-mist" style={{ maxWidth: Math.round((project.coverImage.width ?? 800) / 1.15), aspectRatio: `${project.coverImage.width ?? 4} / ${project.coverImage.height ?? 3}` }}>
              <Img image={project.coverImage} fill priority sizes="700px" quality={90} className="object-cover" />
            </div>
          )}
        </div>
        {meta.length > 0 && (
          <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map(([k, v]) => (<div key={k}><dt className="text-[13px] text-subtle">{k}</dt><dd className="mt-1 text-[15px] text-ink">{v}</dd></div>))}
          </dl>
        )}
      </section>

      {project.body && project.body.length > 0 && (
        <section className="container-x py-16"><div className="max-w-2xl"><RichText value={project.body} /></div></section>
      )}

      {project.beforeImage && project.afterImage && (
        <section className="container-x py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="label">Before & after</p>
              <h2 className="h-md mt-4">Drag to compare</h2>
            </div>
            <div className="lg:col-span-8"><BeforeAfter before={project.beforeImage} after={project.afterImage} /></div>
          </div>
        </section>
      )}

      {all.length > 1 && (
        <section className="container-x py-16 sm:py-20">
          <p className="label">Photos</p>
          <div className="mt-8"><Gallery images={all} columns={2} /></div>
        </section>
      )}

      {next && next.slug !== project.slug && (
        <section className="border-t border-line">
          <Link href={`/projects/${next.slug}/`} className="container-x group flex items-center justify-between gap-6 py-12 sm:py-16">
            <span><span className="label">Next project</span><span className="h-lg mt-3 block group-hover:text-muted">{next.title}</span></span>
            <span className="text-3xl" aria-hidden="true">→</span>
          </Link>
        </section>
      )}

      {more.length > 0 && (
        <section className="border-t border-line bg-white py-20">
          <div className="container-x">
            <p className="label">Similar projects</p>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2">{more.map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
          </div>
        </section>
      )}
      <CtaBand settings={settings} title="Planning something similar?" />
      <JsonLd data={[breadcrumbJsonLd(crumbs), { "@context": "https://schema.org", "@type": "ImageGallery", name: project.title, description: project.summary, url: absUrl(`/projects/${project.slug}/`), image: all.map((i) => (i.src.startsWith("http") ? i.src : absUrl(i.src))) }]} />
    </>
  );
}
