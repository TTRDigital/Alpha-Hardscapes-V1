import Link from "next/link";
import Image from "next/image";
import { telHref } from "@/lib/site";
import type { ServiceAreaSummary, ServiceSummary, SiteSettings } from "@/lib/types";

export function Footer({ settings, services, areas }: { settings: SiteSettings; services: ServiceSummary[]; areas: ServiceAreaSummary[] }) {
  const year = new Date().getFullYear();
  const logo = settings.logoLight ?? { src: "/images/brand/logo-light.png", alt: settings.businessName, width: 622, height: 83 };
  const addr = settings.address;
  return (
    <footer className="bg-ink pb-28 pt-20 text-white/70 md:pb-12">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src={logo.src} alt={logo.alt} width={logo.width ?? 622} height={logo.height ?? 83} className="h-6 w-auto brightness-0 invert" />
            <a href={telHref(settings.phoneE164)} className="mt-10 block text-[2rem] font-medium tracking-[-0.03em] text-white tabular-nums hover:text-lime sm:text-[2.6rem]">{settings.phone}</a>
            {settings.email && <a href={`mailto:${settings.email}`} className="mt-2 block text-[15px] hover:text-white">{settings.email}</a>}
            {addr && <p className="mt-1 text-[15px]">{addr.showStreet && addr.street ? `${addr.street}, ` : ""}{addr.city}, {addr.state} {addr.zip}</p>}
            {settings.hours && settings.hours.length > 0 && (
              <p className="mt-6 text-[14px] leading-relaxed text-white/50">{settings.hours.map((h) => `${h.days}: ${h.hours}`).join(" · ")}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="label-light">Services</p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {services.map((s) => (<li key={s.slug}><Link href={`/services/${s.slug}/`} className="hover:text-white">{s.shortTitle || s.title}</Link></li>))}
              </ul>
            </div>
            <div>
              <p className="label-light">Areas</p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {areas.map((a) => (<li key={a.slug}><Link href={`/service-areas/${a.slug}/`} className="hover:text-white">{a.name}</Link></li>))}
              </ul>
            </div>
            <div>
              <p className="label-light">Company</p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {(settings.footerLinks || []).map((l) => (<li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>))}
                {settings.instagram && <li><a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>}
                {settings.facebook && <li><a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {settings.legalName || settings.businessName}{settings.licenseText ? ` · ${settings.licenseText}` : ""}</p>
          <p className="flex flex-wrap gap-x-5">
            <Link href="/privacy-policy/" className="hover:text-white">Privacy</Link>
            <Link href="/terms/" className="hover:text-white">Terms</Link>
            <a href="https://ttrdigitalmarketing.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Website by TTR Digital</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
