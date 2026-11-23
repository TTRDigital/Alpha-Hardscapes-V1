import type { Img } from "@/lib/types";

/** Where object-fit: cover should anchor, from a Sanity hotspot (defaults to centre). */
export function objectPosition(img?: Img | null): string | undefined {
  if (!img?.hotspot) return undefined;
  return `${Math.round(img.hotspot.x * 100)}% ${Math.round(img.hotspot.y * 100)}%`;
}

/** Sanity CDN URLs accept size parameters; local files are served as-is. */
export function imgUrl(img: Img, width?: number): string {
  if (!width || !img.src.startsWith("https://cdn.sanity.io/")) return img.src;
  const sep = img.src.includes("?") ? "&" : "?";
  return `${img.src}${sep}w=${width}&auto=format&fit=max`;
}
