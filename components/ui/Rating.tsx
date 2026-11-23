import { Icon } from "./Icon";

export function Stars({ n = 5, className = "h-4 w-4" }: { n?: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-lime-600" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className={`${className} ${i < n ? "" : "opacity-25"}`} />
      ))}
    </span>
  );
}

export function GoogleBadge({ rating, count, href, light }: { rating?: number; count?: number; href?: string; light?: boolean }) {
  const content = (
    <>
      <Icon name="google" className="h-4 w-4" />
      <span className="font-bold">{(rating ?? 5).toFixed(1)}</span>
      <Stars n={Math.round(rating ?? 5)} className="h-3.5 w-3.5" />
      <span className={light ? "text-stone-300" : "text-stone-500"}>{count ? `${count} Google reviews` : "on Google"}</span>
    </>
  );
  const cls = `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm ring-1 ${light ? "bg-white/10 text-stone-50 ring-white/15 backdrop-blur" : "bg-white text-ink ring-ink/10"}`;
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a> : <span className={cls}>{content}</span>;
}
