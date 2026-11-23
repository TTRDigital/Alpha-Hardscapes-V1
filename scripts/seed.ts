/**
 * Seeds Sanity with the built-in copy of the live site (content/site.ts: every page, post and
 * blog list, menus, forms and business details) and uploads the photos.
 *
 *   npm run seed           adds documents that do not exist yet (safe to re-run)
 *   npm run seed -- --force  overwrites every seeded document with the built-in copy
 *   npm run seed:dry       prints what would be sent, no token needed
 *
 * Environment (never commit these): NEXT_PUBLIC_ALPHA_SANITY_PROJECT_ID, NEXT_PUBLIC_ALPHA_SANITY_DATASET
 * and SANITY_API_TOKEN (an Editor token; used only here, never by the site build).
 */
import { createClient, type SanityClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fallbackPages, fallbackSettings } from "../content/site.ts";
import type { Atom, Img, Page, Section } from "../lib/types.ts";

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const FORCE = args.has("--force");
const projectId = process.env.NEXT_PUBLIC_ALPHA_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_ALPHA_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_TOKEN?.trim();
const PUBLIC = path.resolve(process.cwd(), "public");

if (!DRY && (!projectId || !token)) {
  console.error("Set NEXT_PUBLIC_ALPHA_SANITY_PROJECT_ID and SANITY_API_TOKEN (environment variables only). Use --dry-run to preview.");
  process.exit(1);
}

const client: SanityClient | null = DRY ? null : createClient({ projectId: projectId!, dataset, token, apiVersion: "2026-11-01", useCdn: false });

let keyN = 0;
const key = () => `s${(keyN++).toString(36)}`;
const ref = (id: string) => ({ _type: "reference", _ref: id });
const withKeys = <T extends object>(arr?: T[]) => arr?.map((item) => ({ _key: key(), ...item }));

/** Uploads a local image once and returns the Sanity asset id. Sanity de-duplicates identical files itself. */
const assetCache = new Map<string, string>();
async function uploadImage(img: Img): Promise<string | null> {
  if (!img?.src) return null;
  if (img.src.startsWith("http")) return null; // already a CMS image
  if (assetCache.has(img.src)) return assetCache.get(img.src)!;
  const file = path.join(PUBLIC, img.src);
  try {
    await stat(file);
  } catch {
    console.warn(`  ! missing file ${img.src}`);
    return null;
  }
  if (!client) {
    const id = `image-dry-${createHash("md5").update(img.src).digest("hex").slice(0, 8)}`;
    assetCache.set(img.src, id);
    return id;
  }
  const buffer = await readFile(file);
  const asset = await client.assets.upload("image", buffer, { filename: path.basename(img.src), contentType: img.src.endsWith(".png") ? "image/png" : img.src.endsWith(".jpg") ? "image/jpeg" : "image/webp" });
  assetCache.set(img.src, asset._id);
  process.stdout.write(".");
  return asset._id;
}

async function photo(img?: Img | null) {
  if (!img) return undefined;
  const id = await uploadImage(img);
  if (!id) return undefined;
  return { _type: "photo", _key: key(), asset: ref(id), alt: img.alt || "", ...(img.caption ? { caption: img.caption } : {}) } as Record<string, unknown>;
}

async function logo(img?: Img | null) {
  if (!img) return undefined;
  const id = await uploadImage(img);
  return id ? { _type: "image", asset: ref(id) } : undefined;
}

async function photos(list?: Img[]) {
  const out = [];
  for (const i of list || []) {
    const p = await photo(i);
    if (p) out.push(p);
  }
  return out;
}

/** Rich text: make sure every block and span has a key. */
function rich(blocks?: unknown[]) {
  if (!blocks) return undefined;
  return (blocks as Record<string, unknown>[]).map((b) => ({ _key: key(), ...b }));
}

async function atom(a: Atom): Promise<Record<string, unknown> | null> {
  switch (a._type) {
    case "img": { const image = await photo(a.image); return image ? { ...a, image: { ...image, _key: undefined } } : null; }
    case "gallery": return { ...a, images: await photos(a.images) };
    case "rt": return { ...a, body: rich(a.body) };
    case "box": return { ...a, ...(a.body ? { body: rich(a.body) } : {}) };
    case "list": return { ...a, items: a.items.map((i) => ({ ...i, _type: "listItem", body: rich(i.body) })) };
    case "faq": return { ...a, items: a.items.map((i) => ({ ...i, _type: "faqItem", answer: rich(i.answer) })) };
    case "reviews": return { ...a, items: a.items.map((i) => ({ ...i, _type: "review" })) };
    default: return { ...a };
  }
}

async function sections(list: Section[]) {
  const out = [];
  for (const s of list) {
    const atoms = [];
    for (const a of s.atoms) { const x = await atom(a); if (x) atoms.push(x); }
    out.push({ _type: "section", _key: s._key || key(), atoms });
  }
  return out;
}

async function seoOf(p: Page) {
  const { ogImage, ...rest } = p.seo;
  const img = ogImage && !ogImage.startsWith("http") ? await photo({ src: ogImage, alt: "" }) : undefined;
  return { _type: "seo", ...rest, ...(img ? { ogImage: { ...img, _key: undefined } } : {}) };
}

const docId = (p: Page) => (p._id.startsWith("drafts.") ? p._id.slice(7) : p._id).replace(/[^a-zA-Z0-9._-]/g, "-");
const navWithKeys = (items: { label: string; href: string; children?: unknown[] }[]): unknown[] =>
  items.map((i) => ({ _key: key(), label: i.label, href: i.href, ...(i.children?.length ? { children: navWithKeys(i.children as never) } : {}) }));

async function buildDocuments() {
  const docs: Record<string, unknown>[] = [];
  const s = fallbackSettings;
  console.log("Site settings");
  docs.push({
    _id: "siteSettings", _type: "siteSettings",
    businessName: s.businessName, phone: s.phone, phoneE164: s.phoneE164, email: s.email, locality: s.locality, region: s.region, postalCode: s.postalCode,
    hours: withKeys(s.hours), areaServed: s.areaServed, socials: withKeys(s.socials),
    headerNav: navWithKeys(s.headerNav), headerCta: s.headerCta, footerNav: navWithKeys(s.footerNav), popupHeading: s.popupHeading,
    forms: s.forms.map((f) => ({ _key: key(), ...f, fields: withKeys(f.fields) })),
    authors: withKeys(s.authors),
    heroPoster: await logo(s.heroPoster), logo: await logo(s.logo), logoLight: await logo(s.logoLight),
  });
  console.log(`Pages, posts and blog lists (${fallbackPages.length})`);
  for (const p of fallbackPages) {
    const base = { _id: docId(p), title: p.title, path: p.path, sections: await sections(p.sections), seo: await seoOf(p) };
    if (p.kind === "post") {
      docs.push({ ...base, _type: "post", date: p.date, modified: p.modified, author: p.author, authorSlug: p.authorSlug, categories: p.categories, excerpt: p.excerpt, featuredImage: await photo(p.featuredImage) });
    } else if (p.kind === "archive") {
      docs.push({ ...base, _type: "archive", archive: p.archive, heading: p.heading, category: p.category, author: p.author, authorSlug: p.authorSlug });
    } else {
      docs.push({ ...base, _type: "page", heroImage: await photo(p.heroImage) });
    }
  }
  return docs.map(clean);
}

/** Drop undefined fields so Sanity does not store them. */
function clean<T>(v: T): T {
  if (Array.isArray(v)) return v.map(clean) as T;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v as object).filter(([, x]) => x !== undefined).map(([k, x]) => [k, clean(x)])) as T;
  return v;
}

async function main() {
  console.log(`${DRY ? "[dry run] " : ""}Seeding ${projectId || "(no project)"}/${dataset} ${FORCE ? "(force: overwrite)" : "(add missing only)"}`);
  const docs = await buildDocuments();
  console.log(`\n${docs.length} documents, ${assetCache.size} images`);
  if (DRY) {
    for (const d of docs) console.log(` - ${d._type} ${d._id}`);
    return;
  }
  const BATCH = 40;
  for (let i = 0; i < docs.length; i += BATCH) {
    const tx = client!.transaction();
    for (const d of docs.slice(i, i + BATCH)) {
      if (FORCE) tx.createOrReplace(d as { _id: string; _type: string });
      else tx.createIfNotExists(d as { _id: string; _type: string });
    }
    await tx.commit();
    console.log(`committed ${Math.min(i + BATCH, docs.length)}/${docs.length}`);
  }
  console.log("Done. Open /studio to review, then publish any drafts (seeded documents are published immediately).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
