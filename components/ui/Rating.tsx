/** Quiet rating line: "★ 5.0 · Google reviews". */
export function Stars({ n = 5, className = "" }: { n?: number; className?: string }) {
  return <span className={`tracking-[0.1em] ${className}`} aria-label={`${n} out of 5 stars`}>{"★".repeat(Math.round(n))}</span>;
}

export function GoogleBadge({ rating, count, href, light }: { rating?: number; count?: number; href?: string; light?: boolean }) {
  const content = (
    <>
      <span className={light ? "text-lime" : "text-ink"}>★</span>
      <span className="font-medium tabular-nums">{(rating ?? 5).toFixed(1)}</span>
      <span className={light ? "text-white/60" : "text-muted"}>{count ? `from ${count} Google reviews` : "on Google"}</span>
    </>
  );
  const cls = `inline-flex items-center gap-1.5 text-[14px] ${light ? "text-white" : "text-ink"}`;
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:underline underline-offset-4`}>{content}</a> : <span className={cls}>{content}</span>;
}
