/**
 * Seeds Sanity with the built-in content (content/fallback) and uploads the photos.
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
import * as fb from "../content/fallback/index.ts";
import type { Img } from "../lib/types.ts";

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
  const asset = await client.assets.upload("image", buffer, { filename: path.basename(img.src), contentType: img.src.endsWith(".png") ? "image/png" : "image/webp" });
  assetCache.set(img.src, asset._id);
  process.stdout.write(".");
  return asset._id;
}

async function photo(img?: Img | null) {
  if (!img) return undefined;
  const id = await uploadImage(img);
  if (!id) return undefined;
  return { _type: "photo", _key: key(), asset: ref(id), alt: img.alt || "", ...(img.caption ? { caption: img.caption } : {}) };
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

/** Rich text: upload inline photos and make sure every block has a key. */
async function rich(blocks?: unknown[]) {
  if (!blocks) return undefined;
  const out = [];
  for (const b of blocks as Record<string, unknown>[]) {
    if (b._type === "photo") {
      const p = await photo({ src: String(b.src), alt: String(b.alt || "") });
      if (p) out.push(p);
      continue;
    }
    out.push({ _key: key(), ...b });
  }
  return out;
}

const seoOf = async (seo?: { title?: string; description?: string; image?: Img | null; noIndex?: boolean }) =>
  seo ? { title: seo.title, description: seo.description, image: await photo(seo.image), noIndex: seo.noIndex ?? false } : undefined;

async function buildDocuments() {
  const docs: Record<string, unknown>[] = [];
  const s = fb.settings;
  console.log("Site settings");
  docs.push({
    _id: "siteSettings", _type: "siteSettings",
    businessName: s.businessName, legalName: s.legalName, tagline: s.tagline, description: s.description,
    logo: await logo(s.logo), logoLight: await logo(s.logoLight),
    foundedYear: s.foundedYear, yearsExperience: s.yearsExperience, licenseText: s.licenseText, serviceAreaSummary: s.serviceAreaSummary,
    phone: s.phone, phoneE164: s.phoneE164, email: s.email, address: s.address, hours: withKeys(s.hours),
    facebook: s.facebook, instagram: s.instagram, googleBusinessUrl: s.googleBusinessUrl, googleReviewUrl: s.googleReviewUrl, googleRating: s.googleRating, googleReviewCount: s.googleReviewCount,
    headerLinks: withKeys(s.headerLinks), footerLinks: withKeys(s.footerLinks),
    ctaPrimary: s.ctaPrimary, ctaSecondary: s.ctaSecondary, ctaBandTitle: s.ctaBandTitle, ctaBandText: s.ctaBandText, formThankYouPath: s.formThankYouPath,
    seo: await seoOf(s.seo),
  });

  console.log("Services");
  for (const sv of fb.services) {
    docs.push({
      _id: sv._id, _type: "service", title: sv.title, shortTitle: sv.shortTitle, slug: { _type: "slug", current: sv.slug }, category: sv.category,
      excerpt: sv.excerpt, heroImage: await photo(sv.heroImage), eyebrow: sv.eyebrow, heading: sv.heading, intro: sv.intro,
      highlights: withKeys(sv.highlights), body: await rich(sv.body), gallery: await photos(sv.gallery), faqs: withKeys(sv.faqs),
      materials: sv.materials, startingNote: sv.startingNote, featured: sv.featured ?? false, order: sv.order ?? 50,
      relatedServices: withKeys(fb.withRelated(sv).relatedServices?.map((r) => ref(r._id))), seo: await seoOf(sv.seo),
    });
  }

  console.log("Projects");
  for (const p of fb.projects) {
    docs.push({
      _id: p._id, _type: "project", title: p.title, slug: { _type: "slug", current: p.slug }, town: p.town, summary: p.summary,
      services: withKeys(p.services?.map((sv) => ref(`service-${sv.slug}`))), body: await rich(p.body),
      coverImage: await photo(p.coverImage), images: await photos(p.images), beforeImage: await photo(p.beforeImage), afterImage: await photo(p.afterImage),
      materials: p.materials, completedAt: p.completedAt, featured: p.featured ?? false, order: p.order ?? 50, seo: await seoOf(p.seo),
    });
  }

  console.log("Reviews");
  for (const t of fb.testimonials) {
    docs.push({ _id: t._id, _type: "testimonial", name: t.name, quote: t.quote, rating: t.rating ?? 5, source: t.source, sourceUrl: t.sourceUrl, town: t.town, service: t.service ? ref(`service-${t.service.slug}`) : undefined, avatar: await logo(t.avatar), date: t.date, featured: t.featured ?? false, order: t.order ?? 50 });
  }

  console.log("FAQs");
  for (const f of fb.faqs) docs.push({ _id: f._id, _type: "faq", question: f.question, answer: f.answer, category: f.category, showOnHome: f.showOnHome ?? false, order: f.order ?? 50 });

  console.log("Service areas");
  for (const a of fb.areas) {
    docs.push({
      _id: a._id, _type: "serviceArea", name: a.name, slug: { _type: "slug", current: a.slug }, kind: a.kind, county: a.county ? ref(`area-${a.county.slug}`) : undefined,
      heading: a.heading, intro: a.intro, body: await rich(a.body), highlights: withKeys(a.highlights), towns: a.towns, neighborhoods: a.neighborhoods,
      image: await photo(a.image), mapQuery: a.mapQuery, projects: withKeys(a.projects?.map((p) => ref(p._id))), faqs: withKeys(a.faqs), order: a.order ?? 50, seo: await seoOf(a.seo),
    });
  }

  console.log("Blog posts");
  for (const p of fb.posts) {
    docs.push({
      _id: p._id, _type: "post", title: p.title, slug: { _type: "slug", current: p.slug }, publishedAt: p.publishedAt, updatedAt: p.updatedAt, author: p.author, excerpt: p.excerpt,
      featuredImage: await photo(p.featuredImage), body: await rich(p.body as unknown[]), relatedService: p.relatedService ? ref(`service-${p.relatedService}`) : undefined, faqs: withKeys(p.faqs), seo: await seoOf(p.seo),
    });
  }

  console.log("Pages");
  for (const p of fb.pages) docs.push({ _id: p._id, _type: "page", title: p.title, slug: { _type: "slug", current: p.slug }, intro: p.intro, body: await rich(p.body), seo: await seoOf(p.seo) });

  console.log("Home & about");
  const h = fb.homePage;
  docs.push({
    _id: "homePage", _type: "homePage", eyebrow: h.eyebrow, heading: h.heading, subheading: h.subheading, heroImage: await photo(h.heroImage), heroVideoUrl: h.heroVideoUrl, reelVideoUrl: h.reelVideoUrl, reelPosterUrl: h.reelPosterUrl,
    trustPoints: h.trustPoints, stats: withKeys(h.stats), servicesHeading: h.servicesHeading, servicesText: h.servicesText,
    featuredServices: withKeys(fb.services.filter((x) => x.featured).map((x) => ref(x._id))), projectsHeading: h.projectsHeading, projectsText: h.projectsText,
    featuredProjects: withKeys(fb.projects.filter((x) => x.featured).map((x) => ref(x._id))), aboutHeading: h.aboutHeading, aboutText: h.aboutText, aboutImage: await photo(h.aboutImage),
    whyHeading: h.whyHeading, whyItems: withKeys(h.whyItems), processHeading: h.processHeading, processText: h.processText, processSteps: withKeys(h.processSteps),
    reviewsHeading: h.reviewsHeading, areasHeading: h.areasHeading, areasText: h.areasText, faqHeading: h.faqHeading, seo: await seoOf(h.seo),
  });
  const a = fb.aboutPage;
  docs.push({ _id: "aboutPage", _type: "aboutPage", heading: a.heading, intro: a.intro, heroImage: await photo(a.heroImage), founderName: a.founderName, founderTitle: a.founderTitle, founderBio: await rich(a.founderBio), founderImage: await photo(a.founderImage), values: withKeys(a.values), body: await rich(a.body), seo: await seoOf(a.seo) });

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
