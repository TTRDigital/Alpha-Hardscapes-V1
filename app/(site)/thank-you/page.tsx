import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/blocks/Cards";
import { getProjects, getSettings } from "@/lib/content";
import { telHref } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you | Alpha Hardscapes", robots: { index: false, follow: false } };

export default async function ThankYouPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  return (
    <>
      <section className="container-x py-24 sm:py-36">
        <p className="label">Request received</p>
        <h1 className="h-xl mt-5 max-w-3xl">Thank you. We&apos;ll be in touch within one business day.</h1>
        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">We will call or email to set up your free on-site visit. If it is urgent, call us now.</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={telHref(settings.phoneE164)} className="btn-primary">Call {settings.phone}</a>
          <Link href="/projects/" className="link-arrow">Browse projects →</Link>
        </div>
      </section>
      <section className="border-t border-line bg-white py-20">
        <div className="container-x grid gap-x-8 gap-y-14 sm:grid-cols-2">{projects.slice(0, 2).map((p) => (<ProjectCard key={p.slug} project={p} />))}</div>
      </section>
    </>
  );
}
