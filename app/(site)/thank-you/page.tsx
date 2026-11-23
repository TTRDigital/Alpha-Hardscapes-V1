import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ProjectCard } from "@/components/blocks/Cards";
import { getProjects, getSettings } from "@/lib/content";
import { telHref } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you | Alpha Hardscapes", robots: { index: false, follow: false } };

export default async function ThankYouPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  return (
    <>
      <section className="container-x py-20 text-center sm:py-28">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-ink"><Icon name="check" className="h-8 w-8" /></span>
        <h1 className="display-lg mt-6">Thanks, we have your request</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-stone-700">We will call or email within one business day to set up your free on-site visit. If it is urgent, call us now.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={telHref(settings.phoneE164)} className="btn-dark"><Icon name="phone" className="h-4 w-4" /> {settings.phone}</a>
          <Link href="/projects/" className="btn-outline">Browse projects</Link>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="display-md">While you wait, some recent work</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.slice(0, 3).map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
        </div>
      </section>
    </>
  );
}
