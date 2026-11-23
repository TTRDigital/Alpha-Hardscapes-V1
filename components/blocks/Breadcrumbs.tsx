import Link from "next/link";
import { absUrl } from "@/lib/site";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, light }: { items: Crumb[]; light?: boolean }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] ${light ? "text-white/60" : "text-subtle"}`}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href && i < all.length - 1 ? <Link href={c.href} className={light ? "hover:text-white" : "hover:text-ink"}>{c.label}</Link> : <span aria-current="page" className={light ? "text-white" : "text-muted"}>{c.label}</span>}
            {i < all.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[]) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, ...(c.href ? { item: absUrl(c.href) } : {}) })),
  };
}
