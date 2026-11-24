"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { QuoteButton } from "@/components/forms/QuoteDialog";
import type { NavItem, SiteSettings } from "@/lib/types";

type Props = { settings: Pick<SiteSettings, "businessName" | "phone" | "phoneE164" | "headerNav" | "headerCta" | "logo" | "logoLight"> };

const isActive = (item: NavItem, path: string): boolean => item.href === path || (item.children || []).some((c) => isActive(c, path));

/** Fixed white header with the live site's menu (same items and links), uppercase and tracked, with the quote button as a pill. */
export function Header({ settings }: Props) {
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

  const logo = settings.logo ?? { src: "/images/brand/logo.webp", alt: settings.businessName, width: 420, height: 59 };
  const tel = `tel:${settings.phoneE164}`;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled || open ? "shadow-[0_10px_30px_-24px_rgb(34_36_31/0.5)]" : ""} border-b border-line/60`}>
        <div className="container-x flex h-20 items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={`${settings.businessName} home`}>
            <Image src={logo.src} alt={logo.alt || settings.businessName} width={logo.width ?? 420} height={logo.height ?? 59} unoptimized={logo.src.startsWith("/")} className="h-6 w-auto sm:h-[26px]" />
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
            {settings.headerNav.map((item) => (
              <div key={item.label} className="group relative">
                {item.href === "#" ? (
                  <button type="button" className={navCls(isActive(item, pathname))} aria-haspopup="true">{item.label}<Chevron /></button>
                ) : (
                  <Link href={item.href} className={navCls(isActive(item, pathname))}>{item.label}{item.children?.length ? <Chevron /> : null}</Link>
                )}
                {!!item.children?.length && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="card p-3 text-ink">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className={`block rounded-xl px-3.5 py-2.5 text-[14.5px] transition-colors hover:bg-paper ${c.href === pathname ? "text-ink" : "text-muted hover:text-ink"}`}>{c.label}</Link>
                          {!!c.children?.length && (
                            <ul className="mb-1 ml-3.5 border-l border-line pl-2">
                              {c.children.map((g) => (
                                <li key={g.href}><Link href={g.href} className="block rounded-xl px-3 py-1.5 text-[14px] text-muted hover:bg-paper hover:text-ink">{g.label}</Link></li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={tel} className="hidden whitespace-nowrap text-[13px] font-semibold tracking-[0.06em] text-ink hover:text-muted 2xl:inline-flex">{settings.phone}</a>
            <QuoteButton formKey={settings.headerCta.formKey} className="btn-primary !h-10 whitespace-nowrap !px-5 !text-[10.5px] max-[380px]:hidden">{settings.headerCta.label}</QuoteButton>
            <button type="button" onClick={() => setOpen((o) => !o)} className="-mr-2 rounded-full p-2.5 text-ink xl:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`fixed inset-0 z-30 overflow-y-auto bg-paper pt-20 transition-opacity duration-200 xl:hidden ${open ? "opacity-100" : "pointer-events-none invisible opacity-0"}`}>
        <nav className="container-x py-6" aria-label="Mobile">
          <ul className="divide-y divide-line border-b border-line">
            {settings.headerNav.map((item) => (
              <li key={item.label} className="py-3">
                {item.href === "#" ? <p className="h-sm py-2">{item.label}</p> : <Link href={item.href} className="h-sm block py-2">{item.label}</Link>}
                {!!item.children?.length && (
                  <ul className="grid gap-0.5 pb-2 pl-1">
                    {item.children.flatMap((c) => [c, ...(c.children || []).map((g) => ({ ...g, sub: true }))]).map((c) => (
                      <li key={c.href}><Link href={c.href} className={`block py-1.5 text-[15.5px] text-muted hover:text-ink ${"sub" in c ? "pl-4" : ""}`}>{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <QuoteButton formKey={settings.headerCta.formKey} className="btn-primary w-full">{settings.headerCta.label}</QuoteButton>
            <a href={tel} className="btn-outline w-full"><Icon name="phone" className="h-4 w-4" />{settings.phone}</a>
          </div>
        </nav>
      </div>
    </>
  );
}

function Chevron() {
  return <svg viewBox="0 0 12 8" className="ml-1.5 inline h-2 w-2.5 opacity-60" aria-hidden="true"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

function navCls(active: boolean) {
  return `inline-flex items-center whitespace-nowrap py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${active ? "text-ink" : "text-ink/70 hover:text-ink"}`;
}
