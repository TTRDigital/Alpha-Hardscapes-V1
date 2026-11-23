"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/lib/site";
import type { Link as NavLink, ServiceSummary, SiteSettings } from "@/lib/types";

type Props = { settings: SiteSettings; services: ServiceSummary[] };

/** Fixed header. Transparent with white text over the home hero video, solid everywhere else. */
export function Header({ settings, services }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(false); }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  const overHero = pathname === "/" && !scrolled && !open;
  const links: NavLink[] = settings.headerLinks?.length ? settings.headerLinks : [];
  const tel = telHref(settings.phoneE164);
  const logo = overHero
    ? settings.logoLight ?? { src: "/images/brand/logo-light.png", alt: settings.businessName, width: 622, height: 83 }
    : settings.logo ?? { src: "/images/brand/logo.png", alt: settings.businessName, width: 552, height: 78 };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${overHero ? "bg-transparent text-white" : "border-b border-line bg-paper/90 text-ink backdrop-blur-md"}`}>
        {settings.announcement && !overHero && (
          <div className="bg-ink text-center text-[13px] text-white">
            {settings.announcementHref ? <Link href={settings.announcementHref} className="block px-4 py-2 hover:text-lime">{settings.announcement}</Link> : <p className="px-4 py-2">{settings.announcement}</p>}
          </div>
        )}
        <div className="container-x flex h-[72px] items-center justify-between gap-8">
          <Link href="/" className="shrink-0" aria-label={`${settings.businessName} home`}>
            <Image src={logo.src} alt={logo.alt} width={logo.width ?? 552} height={logo.height ?? 78} priority className={`h-6 w-auto sm:h-7 ${overHero ? "brightness-0 invert" : ""}`} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {links.map((l) =>
              l.href === "/services/" ? (
                <div key={l.href} className="group relative">
                  <Link href={l.href} className={navCls(pathname.startsWith("/services"), overHero)}>{l.label}</Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 rounded-lg bg-white p-6 text-ink shadow-[0_24px_60px_-20px_rgb(0_0_0/0.25)] ring-1 ring-line">
                      {services.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}/`} className="py-1.5 text-[15px] text-muted transition-colors hover:text-ink">{s.shortTitle || s.title}</Link>
                      ))}
                      <Link href="/services/" className="col-span-2 mt-3 border-t border-line pt-3 text-[14px] font-medium">All services →</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={l.href} href={l.href} className={navCls(pathname.startsWith(l.href), overHero)}>{l.label}</Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-5">
            <a href={tel} className={`hidden text-[15px] font-medium tabular-nums md:inline ${overHero ? "text-white/90 hover:text-white" : "text-ink hover:text-muted"}`}>{settings.phone}</a>
            <Link href="/contact/" className={`hidden !px-5 !py-2.5 sm:inline-flex ${overHero ? "btn-light" : "btn-primary"}`}>Free estimate</Link>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden" aria-label={open ? "Close menu" : "Open menu"}>
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-paper text-ink lg:hidden ${open ? "block" : "hidden"}`}>
          <nav className="container-x flex flex-col pb-28 pt-6" aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="border-b border-line py-4 text-[1.75rem] font-medium tracking-[-0.03em]">{l.label}</Link>
            ))}
            <p className="label mt-10">Services</p>
            <div className="mt-3 grid grid-cols-1 gap-y-2 sm:grid-cols-2">
              {services.map((s) => (<Link key={s.slug} href={`/services/${s.slug}/`} className="text-[16px] text-muted">{s.shortTitle || s.title}</Link>))}
            </div>
            <div className="mt-10 flex flex-col gap-3">
              <Link href="/contact/" className="btn-primary">Get a free estimate</Link>
              <a href={tel} className="btn-outline">Call {settings.phone}</a>
            </div>
          </nav>
        </div>
      </header>
      {/* Spacer so content starts below the fixed header (the home hero sits underneath it on purpose). */}
      {pathname !== "/" && <div aria-hidden="true" className="h-[72px]" />}
    </>
  );
}

function navCls(active: boolean, light: boolean) {
  if (light) return `text-[15px] transition-colors ${active ? "text-white" : "text-white/80 hover:text-white"}`;
  return `text-[15px] transition-colors ${active ? "text-ink" : "text-muted hover:text-ink"}`;
}
