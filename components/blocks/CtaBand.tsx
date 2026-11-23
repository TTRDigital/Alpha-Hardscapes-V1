import Link from "next/link";
import { telHref } from "@/lib/site";
import type { SiteSettings } from "@/lib/types";

/** Closing call to action: one large line, one button, the phone number. */
export function CtaBand({ settings, title, text }: { settings: SiteSettings; title?: string; text?: string }) {
  return (
    <section className="bg-ink py-24 text-white sm:py-32">
      <div className="container-x">
        <p className="label-light">Free on-site estimate</p>
        <h2 className="h-xl mt-6 max-w-4xl">{title || settings.ctaBandTitle || "Ready to transform your outdoor space?"}</h2>
        {(text || settings.ctaBandText) && <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-white/60">{text || settings.ctaBandText}</p>}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/contact/" className="btn-lime">{settings.ctaPrimary || "Get a free estimate"}</Link>
          <a href={telHref(settings.phoneE164)} className="text-[17px] font-medium tabular-nums text-white/80 hover:text-white">or call {settings.phone}</a>
        </div>
      </div>
    </section>
  );
}
