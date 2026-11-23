import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/lib/site";
import type { ServiceAreaSummary, ServiceSummary, SiteSettings } from "@/lib/types";

export function Footer({ settings, services, areas }: { settings: SiteSettings; services: ServiceSummary[]; areas: ServiceAreaSummary[] }) {
  const year = new Date().getFullYear();
  const logo = settings.logoLight ?? { src: "/images/brand/logo-light.png", alt: settings.businessName, width: 622, height: 83 };
  const addr = settings.address;
  const counties = areas.filter((a) => a.kind === "county");
  const towns = areas.filter((a) => a.kind === "town");
  return (
    <footer className="bg-ink pb-24 pt-16 text-stone-300 md:pb-16">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src={logo.src} alt={logo.alt} width={logo.width ?? 622} height={logo.height ?? 83} className="h-8 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">{settings.description}</p>
            <div className="mt-6 space-y-2 text-[15px]">
              <a href={telHref(settings.phoneE164)} className="flex items-center gap-2 font-bold text-stone-50 hover:text-lime"><Icon name="phone" className="h-4 w-4 text-lime" />{settings.phone}</a>
              {settings.email && <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-lime"><Icon name="mail" className="h-4 w-4 text-lime" />{settings.email}</a>}
              {addr && <p className="flex items-start gap-2"><Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-lime" /><span>{addr.showStreet && addr.street ? `${addr.street}, ` : ""}{addr.city}, {addr.state} {addr.zip}</span></p>}
            </div>
            {settings.hours && settings.hours.length > 0 && (
              <dl className="mt-6 grid max-w-xs grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[14px]">
                {settings.hours.map((h) => (<div key={h.days} className="contents"><dt className="text-stone-400">{h.days}</dt><dd>{h.hours}</dd></div>))}
              </dl>
            )}
            <div className="mt-6 flex gap-3">
              {settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-2.5 hover:bg-lime hover:text-ink"><Icon name="facebook" className="h-4 w-4" /></a>}
              {settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2.5 hover:bg-lime hover:text-ink"><Icon name="instagram" className="h-4 w-4" /></a>}
              {settings.googleBusinessUrl && <a href={settings.googleBusinessUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile" className="rounded-full bg-white/10 p-2.5 hover:bg-lime hover:text-ink"><Icon name="google" className="h-4 w-4" /></a>}
            </div>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow-light">Services</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {services.map((s) => (<li key={s.slug}><Link href={`/services/${s.slug}/`} className="hover:text-lime">{s.shortTitle || s.title}</Link></li>))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow-light">Service areas</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {counties.map((a) => (<li key={a.slug}><Link href={`/service-areas/${a.slug}/`} className="font-semibold text-stone-50 hover:text-lime">{a.name}</Link></li>))}
            </ul>
            {towns.length > 0 && (
              <p className="mt-4 text-[14px] leading-relaxed text-stone-400">
                {towns.map((t, i) => (<span key={t.slug}><Link href={`/service-areas/${t.slug}/`} className="hover:text-lime">{t.name}</Link>{i < towns.length - 1 ? " · " : ""}</span>))}
              </p>
            )}
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow-light">Company</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {(settings.footerLinks || []).map((l) => (<li key={l.href}><Link href={l.href} className="hover:text-lime">{l.label}</Link></li>))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {settings.legalName || settings.businessName}. All rights reserved.{settings.licenseText ? ` ${settings.licenseText}.` : ""}</p>
          <p className="flex flex-wrap gap-x-4">
            <Link href="/privacy-policy/" className="hover:text-lime">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-lime">Terms & Conditions</Link>
            <a href="https://ttrdigitalmarketing.com/" target="_blank" rel="noopener noreferrer" className="hover:text-lime">Website by TTR Digital Marketing</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
