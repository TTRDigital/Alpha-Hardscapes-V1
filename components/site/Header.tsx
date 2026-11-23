"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/lib/site";
import type { Link as NavLink, ServiceSummary, SiteSettings } from "@/lib/types";

type Props = { settings: SiteSettings; services: ServiceSummary[] };

export function Header({ settings, services }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const links: NavLink[] = settings.headerLinks?.length ? settings.headerLinks : [];
  const tel = telHref(settings.phoneE164);

  // Close the menu on navigation (derived state, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(false); }
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  const logo = settings.logo ?? { src: "/images/brand/logo.png", alt: settings.businessName, width: 552, height: 78 };

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled ? "border-ink/10 bg-stone-50/90 backdrop-blur-md" : "border-transparent bg-stone-50"}`}>
      {settings.announcement && (
        <div className="bg-ink text-center text-[13px] font-semibold text-stone-50">
          {settings.announcementHref ? <Link href={settings.announcementHref} className="block px-4 py-2 hover:text-lime">{settings.announcement}</Link> : <p className="px-4 py-2">{settings.announcement}</p>}
        </div>
      )}
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={`${settings.businessName} home`}>
          <Image src={logo.src} alt={logo.alt} width={logo.width ?? 552} height={logo.height ?? 78} priority className="h-7 w-auto sm:h-8" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {links.map((l) =>
            l.href === "/services/" ? (
              <div key={l.href} className="group relative">
                <Link href={l.href} className={navCls(pathname.startsWith("/services"))}>
                  {l.label}
                  <Icon name="arrow" className="ml-1 h-3.5 w-3.5 rotate-90 opacity-60" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="card grid grid-cols-2 gap-x-6 gap-y-1 p-4">
                    {services.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}/`} className="rounded-lg px-3 py-2 text-[14px] font-semibold text-ink-700 hover:bg-stone-100 hover:text-ink">
                        {s.shortTitle || s.title}
                      </Link>
                    ))}
                    <Link href="/services/" className="col-span-2 mt-1 rounded-lg px-3 py-2 text-[13px] font-bold uppercase tracking-wider text-moss hover:bg-stone-100">All services →</Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={l.href} href={l.href} className={navCls(pathname.startsWith(l.href))}>{l.label}</Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a href={tel} className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-bold text-ink hover:bg-stone-100 md:inline-flex">
            <Icon name="phone" className="h-4 w-4 text-moss" /> {settings.phone}
          </a>
          <Link href="/contact/" className="btn-primary hidden whitespace-nowrap !px-5 !py-3 sm:inline-flex">{settings.ctaPrimary || "Get a Free Estimate"}</Link>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-stone-100 lg:hidden" aria-label={open ? "Close menu" : "Open menu"}>
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-stone-50 lg:hidden ${open ? "block" : "hidden"}`}>
        <nav className="container-x flex flex-col py-4" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="border-b border-ink/10 py-4 font-display text-2xl text-ink">{l.label}</Link>
          ))}
          <p className="eyebrow mt-6">Services</p>
          <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="rounded-lg py-2 text-[15px] font-semibold text-ink-700">{s.shortTitle || s.title}</Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 pb-24">
            <a href={tel} className="btn-dark"><Icon name="phone" className="h-4 w-4" /> Call {settings.phone}</a>
            <Link href="/contact/" className="btn-primary">{settings.ctaPrimary || "Get a Free Estimate"}</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function navCls(active: boolean) {
  return `inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-semibold transition-colors ${active ? "bg-stone-200/70 text-ink" : "text-ink-700 hover:bg-stone-100 hover:text-ink"}`;
}
