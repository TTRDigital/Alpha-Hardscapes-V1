/** Site-wide constants and helpers (no server-only imports so client components can use it). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alphahardscapes.com").replace(/\/$/, "");

export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  hardscaping: "Hardscaping",
  masonry: "Masonry",
  "outdoor-living": "Outdoor living",
  landscaping: "Landscaping",
  maintenance: "Maintenance & seasonal",
};

export const absUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "America/New_York" });
}

export function telHref(e164: string) {
  return `tel:${e164.replace(/[^+\d]/g, "")}`;
}

/** Plain-text excerpt from Portable Text, for descriptions and reading time. */
export function plainText(blocks?: { _type: string; children?: { text?: string }[] }[]): string {
  return (blocks || [])
    .filter((b) => b._type === "block")
    .map((b) => (b.children || []).map((c) => c.text || "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function readingTime(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}
