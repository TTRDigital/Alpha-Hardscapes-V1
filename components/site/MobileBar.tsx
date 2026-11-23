import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/lib/site";
import type { SiteSettings } from "@/lib/types";

/** Sticky call / estimate bar on phones. Hidden on the Studio and thank-you pages via layout. */
export function MobileBar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-px border-t border-ink/10 bg-ink/10 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden print:hidden">
      <a href={telHref(settings.phoneE164)} className="flex items-center justify-center gap-2 bg-ink py-3.5 text-[15px] font-bold text-stone-50">
        <Icon name="phone" className="h-4 w-4 text-lime" /> Call now
      </a>
      <Link href="/contact/" className="flex items-center justify-center gap-2 bg-lime py-3.5 text-[15px] font-bold text-ink">
        Free estimate <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </div>
  );
}
