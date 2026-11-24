import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

const DAY = (d: string) => d.slice(0, 3);
const time = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
};

/** Footer: the live footer menu, contact details (town and ZIP only), hours and legal links. */
export function Footer({ settings }: { settings: SiteSettings }) {
  const logo = settings.logoLight ?? { src: "/images/brand/logo-light.webp", alt: settings.businessName, width: 420, height: 56 };
  return (
    <footer className="bg-basalt pb-28 text-white md:pb-0">
      <div className="container-x border-t border-white/10 py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src={logo.src} alt={settings.businessName} width={logo.width ?? 420} height={logo.height ?? 56} unoptimized={logo.src.startsWith("/")} loading="lazy" className="h-7 w-auto brightness-0 invert" />
            <a href={`tel:${settings.phoneE164}`} className="mt-10 block font-display text-[2.6rem] leading-none text-white hover:text-lime-light">{settings.phone}</a>
            <div className="mt-5 grid gap-1.5 text-[15px] text-white/65">
              {settings.email && <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>}
              <p>{settings.locality}, {settings.region} {settings.postalCode}</p>
            </div>
            <div className="mt-8 flex gap-2">
              {settings.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white hover:text-ink">
                  <Icon name={s.label.toLowerCase()} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Footer" className="lg:col-span-4">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-white/70">
              {settings.footerNav.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}
              <li><Link href="/contact/" className="hover:text-white">Contact</Link></li>
              <li><Link href="/blog/" className="hover:text-white">Blog</Link></li>
            </ul>
          </nav>
          <div className="text-[15px] text-white/70 lg:col-span-3">
            <ul className="grid gap-3">
              {settings.hours.map((h) => (
                <li key={h.days.join()} className="flex justify-between gap-6 border-b border-white/10 pb-3">
                  <span>{h.days.length > 2 ? `${DAY(h.days[0])}–${DAY(h.days[h.days.length - 1])}` : h.days.map(DAY).join(", ")}</span>
                  <span className="text-white">{time(h.opens)} – {time(h.closes)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-7 text-[12.5px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} {settings.businessName} – All Rights Reserved.</p>
          <p className="flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/privacy-policy/" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-and-conditions/" className="hover:text-white">Terms and Conditions</Link>
            <a href="https://ttrdigitalmarketing.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Website by TTR Digital Marketing</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
