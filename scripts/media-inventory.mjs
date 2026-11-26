/**
 * Media inventory: every image and video file in public/, where the site shows it, and
 * what it is. Follows the same rules the page templates use (which photo is the top photo,
 * which blocks show images, which blog cards appear where), using the built-in content
 * (content/legacy/site.data.ts) and site settings.
 *
 *   node scripts/media-inventory.mjs [live-seed.json]
 *
 * Writes docs/media-inventory.json and docs/media-inventory.md.
 * The optional live CMS export lets it name the live-site file each photo was copied from.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const src = fs.readFileSync(path.join(ROOT, "content/legacy/site.data.ts"), "utf8");
const pages = JSON.parse(src.match(/legacyPages = (\[.*\]) as const;/s)[1]);
const ALT_WRITTEN = JSON.parse(fs.readFileSync(path.join(ROOT, "content/legacy/alt-text.json"), "utf8"));

/* ---------- live-site source of each copied photo ---------- */
const sourceOf = {};
const seedPath = process.argv[2];
if (seedPath && fs.existsSync(seedPath)) {
  const text = fs.readFileSync(seedPath, "utf8");
  const stem = (s) => s.replace(/^.*\/uploads\//, "").replace(/\.[a-z0-9]+$/i, "").replace(/-(scaled|\d+x\d+|e\d{9,})(?=-|$)/g, "").replace(/-r[0-9a-z]{30,}$/, "").replace(/^elementor\/thumbs\//, "");
  for (const m of text.matchAll(/(?:https?:\/\/(?:www\.)?alphahardscapes\.com)?\/wp-content\/uploads\/[^"'\s)\\]+?\.(?:jpe?g|png|webp|gif|avif|mov|mp4|webm)/gi)) {
    const url = m[0].replace(/^https?:\/\/(www\.)?alphahardscapes\.com/, "");
    const name = stem(url).replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-|-$/g, "") + ".webp";
    // keep the shortest (original, unresized) path
    if (!sourceOf[name] || url.length < sourceOf[name].length) sourceOf[name] = url;
  }
}

/* ---------- what each live page showed (to tell "same as live" from "updated") ---------- */
const liveImagesByPath = {};
const DECOR = /filled-bg|dot-gr|logo|\/alpha(-\d+x\d+)?\.png|fav-|icon|footer-logo|Frame-19840|southern-connecticut-map|county-map|gravatar/i;
const stemName = (url) => url.replace(/^.*\/uploads\//, "").replace(/\.[a-z0-9]+$/i, "").replace(/-(scaled|\d+x\d+|e\d{9,})(?=-|$)/g, "").replace(/-[0-9a-z]{30,}$/, "").replace(/^elementor\/thumbs\//, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-|-$/g, "") + ".webp";
if (seedPath && fs.existsSync(seedPath)) {
  for (const d of JSON.parse(fs.readFileSync(seedPath, "utf8"))) {
    if (!d.path) continue;
    const urls = [...JSON.stringify(d.content || []).matchAll(/\/wp-content\/uploads\/[^"'\s)\\]+?\.(?:jpe?g|png|webp|gif|avif)/gi)].map((m) => m[0]);
    if (d.featuredImage?.src) urls.push(d.featuredImage.src.replace(/^https?:\/\/(www\.)?alphahardscapes\.com/, ""));
    liveImagesByPath[d.path] = [...new Set(urls)];
  }
}
const siteFiles = new Set(fs.readdirSync(path.join(ROOT, "public/images/site")));
/** Live images on a page that are not on the new page: AI renders, stock and banners that were taken out. */
const whyRemoved = (u) => (/review-image|avatar/i.test(u) ? "Reviewer profile picture (reviews now show as text only)" : /author-image/i.test(u) ? "Author picture in the old post byline" : /-1024x341\.|featured-1\d{12}|\/1\d{12}-/i.test(u) ? "AI blog banner" : "AI render or stock image (rules: real job photos only)");
const removedFrom = (p) => {
  const seen = new Map();
  for (const u of liveImagesByPath[p] || []) {
    if (DECOR.test(u) || siteFiles.has(stemName(u))) continue;
    const clean = u.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1").replace(/-[0-9a-z]{30,}(\.[a-z]+)$/i, "$1").replace(/^\/wp-content\/uploads\/elementor\/thumbs\//, "/wp-content/uploads/");
    if (siteFiles.has(stemName(clean)) || [...siteFiles].some((f) => f.endsWith("-" + stemName(clean)))) continue; // a thumbnail of a photo still shown
    if (!seen.has(clean)) seen.set(clean, { file: clean, why: whyRemoved(u) });
  }
  return [...seen.values()];
};
const SAME_VIDEO = { "/images/brand/hero.mp4": ["/"], "/images/brand/hero-poster.webp": ["/"], "/images/brand/reel-vertical.mp4": ["/", "/home-draft/"], "/images/brand/reel-vertical-poster.webp": ["/", "/home-draft/"], "/images/site/pool-project.mp4": ["/pool-builders-south-connecticut/"], "/images/site/pool-project-poster.webp": ["/pool-builders-south-connecticut/"] };
/** Was this file on this same live page? */
const sameAsLive = (file, pagePath) => {
  if (SAME_VIDEO[file]) return SAME_VIDEO[file].includes(pagePath);
  const name = path.basename(file);
  return (liveImagesByPath[pagePath] || []).some((u) => stemName(u) === name);
};

/* ---------- placements ---------- */
const uses = new Map(); // file -> [{page, title, role}]
const add = (file, page, role) => {
  if (!file) return;
  const f = file.replace(/\?.*$/, "");
  if (!uses.has(f)) uses.set(f, []);
  uses.get(f).push({ page: page.path, title: page.title, role });
};
const firstHeading = (s) => (s.atoms.find((a) => a._type === "hdg" && a.level <= 3) || s.atoms.find((a) => a._type === "hdg"))?.text?.replace(/\n/g, " ");
const isH1 = (a) => a._type === "hdg" && a.level === 1;
const PLAIN = /^\/(thank-you|optin-thank-you|privacy-policy|terms-and-conditions)/;

const posts = pages.filter((p) => p.kind === "post").sort((a, b) => (b.date || "").localeCompare(a.date || ""));
const cardImage = (p) => p.featuredImage || p.heroImage;
const pageRows = [];

for (const p of pages) {
  const row = { path: p.path, title: p.title, kind: p.kind, noindex: /noindex/i.test(p.seo?.robots || ""), items: [], removed: removedFrom(p.path) };
  const push = (file, role, alt) => {
    if (!file) return;
    const share = /^Share image/.test(role), card = /card:/.test(role);
    const status = share ? "Share image (made by TTR from the page photo)" : card ? (sameAsLive(file, p.path) ? "Same as live" : "Updated") : sameAsLive(file, p.path) ? "Same as live" : "Updated";
    row.items.push({ file, role, alt: alt ?? "", status });
    add(file, p, role);
  };
  const contentH1 = p.sections.some((s) => s.atoms.some(isH1));
  const heroSection = p.sections[0]?.atoms.some(isH1) ? p.sections[0] : null;

  // Top of the page
  let top = null;
  if (p.path === "/") {
    push("/images/brand/hero.mp4", "Banner background video (top of page)");
    push("/images/brand/hero-poster.webp", "Banner still (shows while the video loads)");
  } else if (p.kind === "post" && !contentH1) {
    top = cardImage(p);
    if (top) push(top.src, "Post photo (top of post)", top.alt);
  } else if (p.kind !== "archive" && heroSection && p.heroImage) {
    top = p.heroImage;
    push(top.src, "Top photo (behind the main heading)", top.alt);
  }

  // Sections, in order (the photo already used at the top is not repeated)
  let skipped = false;
  p.sections.forEach((s, i) => {
    const where = firstHeading(s) ? `section "${firstHeading(s)}"` : `section ${i + 1}`;
    for (const a of s.atoms) {
      if (a._type === "img") {
        if (top && !skipped && a.image.src === top.src && s !== heroSection) { skipped = true; continue; }
        push(a.image.src, `Photo in ${where}`, a.image.alt);
      }
      if (a._type === "gallery") a.images.forEach((im, k) => push(im.src, `${a.large ? "Gallery grid" : "Photo carousel"} in ${where} (${k + 1} of ${a.images.length})`, im.alt));
      if (a._type === "video") {
        push(a.url, `Video in ${where}${p.path === "/" ? " (right after the banner)" : ""}`);
        if (a.url.endsWith(".mp4")) push(a.url.replace(/\.mp4$/, "-poster.webp"), `Video still in ${where}`);
      }
    }
  });

  // Blog cards
  if (p.kind === "archive") {
    const list = posts.filter((x) => (p.archive === "category" ? (x.categories || []).includes(p.category || p.path.split("/")[2]) : p.archive === "author" ? x.authorSlug === (p.authorSlug || p.path.split("/")[2]) : true));
    list.forEach((x) => { const im = cardImage(x); if (im) push(im.src, `Blog card: "${x.title}"`, ""); });
  }
  if (p.kind === "post" && !contentH1) {
    posts.filter((x) => x.path !== p.path && !/automation-my-facebook/.test(x.path)).slice(0, 3).forEach((x) => { const im = cardImage(x); if (im) push(im.src, `"More from the blog" card: "${x.title}"`, ""); });
  }

  // Share image (link previews on Facebook, texts, etc.)
  if (p.seo?.ogImage) push(p.seo.ogImage, "Share image (link preview, not shown on the page)");
  pageRows.push(row);
}

/* ---------- every file in public/ ---------- */
const MEDIA = /\.(jpe?g|png|webp|avif|gif|svg|ico|mp4|webm|mov)$/i;
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
const files = walk(path.join(ROOT, "public")).filter((f) => MEDIA.test(f)).map((f) => "/" + path.relative(path.join(ROOT, "public"), f));

// Site-wide uses outside page content
const site = (file, role) => { if (!uses.has(file)) uses.set(file, []); uses.get(file).push({ page: "(every page)", title: "Site-wide", role }); };
site("/images/brand/logo.webp", "Logo in the top bar and mobile menu");
site("/images/brand/logo-light.webp", "Logo in the footer");
site("/images/brand/favicon.ico", "Browser tab icon");
site("/images/brand/icon-192.png", "Browser tab icon (high resolution)");
site("/images/brand/apple-touch-icon.png", "Icon when saved to a phone home screen");
site("/images/brand/icon-512.png", "Business logo in Google's structured data");
site("/favicon.ico", "Default browser icon (requested by browsers at /favicon.ico)");
const AD = "/patios-walkways/";
for (const f of files.filter((f) => f.startsWith("/patios-walkways/"))) { if (!uses.has(f)) uses.set(f, []); uses.get(f).push({ page: AD, title: "Season-end ad page (static, kept as on the live site)", role: "Image on the ad page" }); }

const kindOf = (f) => {
  if (/\.(mp4|webm|mov)$/i.test(f)) return "Video";
  if (f.startsWith("/og/")) return "Share image (made from the page photo)";
  if (f.startsWith("/patios-walkways/")) return "Ad page image (unchanged)";
  if (/brand\/(logo|mark|favicon|icon|apple)/.test(f) || /^\/(favicon|icon|apple)/.test(f)) return "Logo / icon";
  if (/poster/.test(f)) return "Video still";
  if (/sebastian/.test(f)) return "Owner photo (Sebastian)";
  if (/-bna\.webp$|before-after/.test(f)) return "Real job photo (before and after)";
  if (f.startsWith("/images/site/")) return "Real job photo";
  return "Other";
};
const info = (f) => {
  const abs = path.join(ROOT, "public", f);
  const size = fs.statSync(abs).size;
  let dims = "";
  try {
    if (/\.(mp4|webm|mov)$/i.test(f)) dims = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "csv=p=0:s=x", abs]).toString().trim().replace(/\n/, " · ") + " s";
    else if (!/\.(ico|svg)$/i.test(f)) dims = execFileSync("identify", ["-format", "%wx%h", abs + "[0]"]).toString().trim();
  } catch { /* leave empty */ }
  return { size, dims };
};

const altOf = (f) => { for (const r of pageRows) for (const it of r.items) if (it.file === f && it.alt) return it.alt; return ""; };
const items = files.sort().map((f) => {
  const u = uses.get(f) || [];
  const onPages = u.filter((x) => !/^Share image/.test(x.role));
  return {
    file: f, kind: kindOf(f), ...info(f), alt: altOf(f), altWrittenByTTR: !!ALT_WRITTEN[f],
    from: sourceOf[path.basename(f)] || (f === "/images/site/pool-project.mp4" ? "/wp-content/uploads/2026/04/7602D579-9CD6-45B1-BF50-8EECD32AA4301.mov" : f === "/images/brand/reel-vertical.mp4" ? "/wp-content/uploads/2025/08/Alpha-Hardscapes-Reel.webm (live home page)" : f === "/images/brand/hero.mp4" ? "live home page banner video" : ""),
    shownOnPages: [...new Set(onPages.map((x) => x.page))].length,
    uses: u,
  };
});
// Share images that belong to a page
for (const it of items.filter((i) => i.file.startsWith("/og/"))) it.uses = uses.get(it.file) || [];

const unused = items.filter((i) => !i.uses.length).map((i) => i.file);
const out = { generated: new Date().toISOString().slice(0, 10), counts: {}, items, pages: pageRows, unused };
const by = (k) => items.filter((i) => i.kind === k).length;
out.counts = {
  files: items.length, realPhotos: by("Real job photo") + by("Real job photo (before and after)") + by("Owner photo (Sebastian)"), beforeAfter: by("Real job photo (before and after)"),
  videos: by("Video"), videoStills: by("Video still"), shareImages: by("Share image (made from the page photo)"), adPage: by("Ad page image (unchanged)"), logosIcons: by("Logo / icon"), unused: unused.length,
  pages: pageRows.length, placements: pageRows.reduce((n, r) => n + r.items.length, 0),
};
fs.writeFileSync(path.join(ROOT, "docs/media-inventory.json"), JSON.stringify(out, null, 1));

/* ---------- markdown ---------- */
const kb = (n) => (n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);
let md = `# Media inventory\n\nEvery image and video file on the site and where it appears. Generated by \`scripts/media-inventory.mjs\` on ${out.generated} from the site's built-in content (the live site's pages); re-run it after content changes.\n\n`;
md += `| | Count |\n|---|---|\n| Files | ${out.counts.files} |\n| Real job photos (incl. ${out.counts.beforeAfter} before/after and Sebastian's photo) | ${out.counts.realPhotos} |\n| Videos | ${out.counts.videos} |\n| Video stills | ${out.counts.videoStills} |\n| Share images (link previews) | ${out.counts.shareImages} |\n| Ad page images (unchanged) | ${out.counts.adPage} |\n| Logos and icons | ${out.counts.logosIcons} |\n| Not used anywhere | ${out.counts.unused} |\n\n`;
md += `## Videos\n\n`;
for (const v of items.filter((i) => i.kind === "Video")) md += `- **${v.file}** (${v.dims}, ${kb(v.size)}). From: ${v.from || "n/a"}. Used: ${v.uses.map((u) => `${u.page} (${u.role})`).join("; ")}\n`;
md += `\n## Page by page\n\n`;
for (const r of pageRows) {
  md += `### ${r.path} ${r.noindex ? "(not indexed)" : ""}\n\n`;
  const vis = r.items.filter((i) => !/^Share image/.test(i.role));
  if (!vis.length) md += `No images on the page.\n`;
  for (const it of vis) md += `- ${it.role}: \`${it.file}\`${it.alt ? ` (alt: "${it.alt}")` : ""}\n`;
  const og = r.items.find((i) => /^Share image/.test(i.role));
  if (og) md += `- Share image: \`${og.file}\`\n`;
  md += `\n`;
}
md += `## Every file\n\n| File | What it is | Size | Pages shown on | Copied from (live site) | Alt text |\n|---|---|---|---|---|---|\n`;
for (const i of items) md += `| \`${i.file}\` | ${i.kind} | ${i.dims} ${kb(i.size)} | ${i.uses.length ? [...new Set(i.uses.map((u) => u.page))].join(", ") : "**not used**"} | ${i.from ? `\`${i.from}\`` : ""} | ${i.alt ? `${i.alt}${i.altWrittenByTTR ? " *(written by TTR)*" : ""}` : ""} |\n`;
fs.writeFileSync(path.join(ROOT, "docs/media-inventory.md"), md);
console.log(JSON.stringify(out.counts), "unused:", unused);
