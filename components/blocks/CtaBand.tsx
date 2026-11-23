import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/lib/site";
import type { SiteSettings } from "@/lib/types";

export function CtaBand({ settings, title, text }: { settings: SiteSettings; title?: string; text?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-stone-50 sm:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/20 blur-3xl" aria-hidden="true" />
      <div className="container-x grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow-light">Free on-site estimate</p>
          <h2 className="display-lg mt-3">{title || settings.ctaBandTitle || "Ready to transform your outdoor space?"}</h2>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">{text || settings.ctaBandText}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
          <Link href="/contact/" className="btn-primary">{settings.ctaPrimary || "Get a Free Estimate"} <Icon name="arrow" className="h-4 w-4" /></Link>
          <a href={telHref(settings.phoneE164)} className="btn-outline-light"><Icon name="phone" className="h-4 w-4" /> {settings.phone}</a>
        </div>
      </div>
    </section>
  );
}
