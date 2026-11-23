import Link from "next/link";
import { GoogleBadge } from "@/components/ui/Rating";
import { telHref } from "@/lib/site";
import type { SiteSettings } from "@/lib/types";

/** Estimate button, phone and rating, used under inner-page intros. */
export function HeroActions({ settings, href = "/contact/" }: { settings: SiteSettings; href?: string }) {
  return (
    <div className="mt-8 flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href={href} className="btn-primary">{settings.ctaPrimary || "Get a free estimate"}</Link>
        <a href={telHref(settings.phoneE164)} className="text-[15px] font-medium tabular-nums hover:text-muted">{settings.phone}</a>
      </div>
      <GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} />
    </div>
  );
}
