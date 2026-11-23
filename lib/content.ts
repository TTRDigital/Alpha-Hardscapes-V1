import "server-only";
import { cache } from "react";
import { sanityFetch } from "@/lib/sanity/client";
import * as q from "@/lib/sanity/queries";
import { fallbackPages, fallbackSettings } from "@/content/site";
import type { FormDef, Page, SiteSettings } from "@/lib/types";

/**
 * Content API used by every page. Each function asks Sanity first and falls back to the
 * built-in copy of the live site when Sanity is not configured, empty or unreachable,
 * so the site never shows an empty page.
 */

type Light = Pick<Page, "_id" | "kind" | "title" | "path" | "date" | "modified" | "author" | "authorSlug" | "categories" | "excerpt" | "featuredImage" | "heroImage"> & { seo: { robots?: string } };

/** Drop null values from a Sanity result so they do not hide the fallback's values. */
function stripNulls<T extends object>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))) as Partial<T>;
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const s = await sanityFetch<SiteSettings | null>(q.SETTINGS_QUERY);
  return s && s.businessName && s.phoneE164 ? { ...fallbackSettings, ...stripNulls(s) } : fallbackSettings;
});

export const normalizePath = (p: string) => {
  const x = `/${p}/`.replace(/\/{2,}/g, "/").toLowerCase();
  return x;
};

/** Every page address: Sanity documents plus any built-in page Sanity does not have yet. */
export const getAllPages = cache(async (): Promise<Light[]> => {
  const remote = (await sanityFetch<Light[]>(q.ALL_PAGES_QUERY)) || [];
  const valid = remote.filter((p) => p.title && /^\/([a-z0-9-]+\/)*$/.test(p.path || ""));
  const have = new Set(valid.map((p) => p.path));
  return [...valid, ...fallbackPages.filter((p) => !have.has(p.path))];
});

export const getPage = cache(async (path: string): Promise<Page | undefined> => {
  const p = normalizePath(path);
  const remote = await sanityFetch<Page | null>(q.PAGE_QUERY, { path: p });
  if (remote?.title && remote.sections?.length) return { ...remote, seo: stripNulls(remote.seo || {}) as Page["seo"] };
  return fallbackPages.find((x) => x.path === p);
});

export async function getPosts(): Promise<Light[]> {
  return (await getAllPages()).filter((p) => p.kind === "post").sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function formByKey(settings: SiteSettings, key?: string): FormDef | undefined {
  if (!key) return undefined;
  return settings.forms.find((f) => f.formKey === key) || settings.forms.find((f) => f.formKey.split(":")[0] === key.split(":")[0]);
}
