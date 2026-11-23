import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
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
  const prev = idx > 0 ? projects[idx - 1] : undefined;
  const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : undefined;
  const more = projects.filter((p) => p.slug !== project.slug && p.services?.some((s) => project.services?.some((x) => x.slug === s.slug))).slice(0, 3);
  const crumbs = [{ label: "Projects", href: "/projects/" }, { label: project.title, href: `/projects/${project.slug}/` }];
  const completed = project.completedAt ? new Date(project.completedAt).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }) : undefined;

  return (
    <>
      <section className="container-x pt-8 sm:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {project.services?.[0] && <p className="eyebrow">{project.services.map((s) => s.title).join(" · ")}</p>}
            <h1 className="display-lg mt-3">{project.title}</h1>
            {project.summary && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">{project.summary}</p>}
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm lg:col-span-4">
            {project.town && (<div><dt className="font-bold uppercase tracking-wider text-stone-500 text-[11px]">Location</dt><dd className="mt-1 font-semibold">{project.town}</dd></div>)}
            {completed && (<div><dt className="font-bold uppercase tracking-wider text-stone-500 text-[11px]">Completed</dt><dd className="mt-1 font-semibold">{completed}</dd></div>)}
            {project.materials && project.materials.length > 0 && (<div className="col-span-2"><dt className="font-bold uppercase tracking-wider text-stone-500 text-[11px]">Materials</dt><dd className="mt-1 font-semibold">{project.materials.join(", ")}</dd></div>)}
          </dl>
        </div>
        {(project.coverImage.width ?? 2560) >= 1600 ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-stone-200">
            <Img image={project.coverImage} fill priority sizes="(min-width: 1280px) 1240px, 100vw" quality={85} className="object-cover" />
          </div>
        ) : (
          <div className="mt-8 rounded-3xl bg-stone-100 p-4 sm:p-6">
            <div className="relative mx-auto overflow-hidden rounded-2xl" style={{ maxWidth: Math.round((project.coverImage.width ?? 800) / 1.15), aspectRatio: `${project.coverImage.width ?? 4} / ${project.coverImage.height ?? 3}` }}>
              <Img image={project.coverImage} fill priority sizes="700px" quality={90} className="object-cover" />
            </div>
          </div>
        )}
      </section>

      <section className="container-x grid gap-12 py-12 lg:grid-cols-12 sm:py-16">
        <div className="lg:col-span-8">
          {project.beforeImage && project.afterImage && (
            <div className="mb-12">
              <h2 className="display-md">Before and after</h2>
              <p className="mt-2 text-stone-700">Drag the handle to compare.</p>
              <BeforeAfter before={project.beforeImage} after={project.afterImage} className="mt-5" />
            </div>
          )}
          <RichText value={project.body} />
          {all.length > 1 && (
            <div className="mt-10">
              <h2 className="display-md">Project photos</h2>
              <div className="mt-5"><Gallery images={all} columns={2} /></div>
            </div>
          )}
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-24 card p-6">
            <p className="eyebrow">Planning something similar?</p>
            <h2 className="display-sm mt-2">Get a free estimate</h2>
            <p className="mt-2 text-[15px] text-stone-700">We will visit your property, talk through materials and send a written quote.</p>
            <Link href="/contact/" className="btn-primary mt-5 w-full">{settings.ctaPrimary || "Get a Free Estimate"} <Icon name="arrow" className="h-4 w-4" /></Link>
            {project.services && project.services.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-ink/10 pt-5 text-[15px]">
                {project.services.map((s) => (<li key={s.slug}><Link href={`/services/${s.slug}/`} className="inline-flex items-center gap-2 font-semibold text-moss hover:text-ink"><Icon name="arrow" className="h-4 w-4" />About {s.title.toLowerCase()}</Link></li>))}
              </ul>
            )}
          </div>
        </aside>
      </section>

      <nav className="container-x flex items-center justify-between border-t border-ink/10 py-6 text-[15px] font-semibold" aria-label="Project navigation">
        {prev ? <Link href={`/projects/${prev.slug}/`} className="inline-flex items-center gap-2 hover:text-moss"><Icon name="arrow" className="h-4 w-4 rotate-180" /> {prev.title}</Link> : <span />}
        {next ? <Link href={`/projects/${next.slug}/`} className="inline-flex items-center gap-2 text-right hover:text-moss">{next.title} <Icon name="arrow" className="h-4 w-4" /></Link> : <span />}
      </nav>

      {more.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-x">
            <h2 className="display-md">More projects like this</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{more.map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
          </div>
        </section>
      )}
      <CtaBand settings={settings} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), { "@context": "https://schema.org", "@type": "ImageGallery", name: project.title, description: project.summary, url: absUrl(`/projects/${project.slug}/`), image: all.map((i) => (i.src.startsWith("http") ? i.src : absUrl(i.src))) }]} />
    </>
  );
}
