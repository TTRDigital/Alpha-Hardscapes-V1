import test from "node:test";
import assert from "node:assert/strict";
import { fallbackPages, fallbackSettings } from "../content/site.ts";
import { redirects } from "../redirects.ts";

const paths = new Set(fallbackPages.map((p) => p.path));

/** Every address from the SEO rules (section 1) must exist with its exact URL. */
const REQUIRED = `/ /masonry/ /retaining-walls-connecticut/ /walkway-patio-connecticut/ /outdoor-kitchens-connecticut/ /outdoor-living-packages-connecticut/
/fire-features-connecticut/ /stone-steps-connecticut/ /thinstone-connecticut/ /stone/ /wall-block/ /chimney-installation-and-repair-connecticut/
/deck-builders-connecticut/ /landscaping/ /repairs-maintenance-connecticut/ /seasonal-clean-up/ /seasonal-clean-up/leaf-removal/ /seasonal-clean-up/snow-removal/
/pool-builders-south-connecticut/ /masonry/retaining-walls/stone-3/ /masonry/retaining-walls/wall-block-2/ /masonry/walkway-patio-masonry-optin/
/avon/ /berlin/ /farmington/ /glastonbury/ /southington/ /uncategorized/west-hartford/ /hartford-county-ct/ /new-haven-county-ct/ /fairfield-county-ct/
/locations/ /service-areas/ /about-us/ /contact/ /gallery/ /reviews/ /frequently-asked-questions/ /blog/ /category/blog/ /category/uncategorized/
/author/sebastian/ /author/ttrdigital/ /blog/pool-patio-materials-connecticut/ /1000-off/ /20pct-off/ /1000-off-copy/ /20-off-patios-walkways/ /landing-page/ /optin/
/thank-you/ /thank-you-lp/ /optin-thank-you/ /privacy-policy/ /terms-and-conditions/`.split(/\s+/).filter(Boolean);

test("every live address exists, lowercase with a trailing slash", () => {
  for (const p of REQUIRED) assert.ok(paths.has(p), `missing ${p}`);
  for (const p of paths) assert.match(p, /^\/([a-z0-9-]+\/)*$/, p);
  assert.equal(fallbackPages.filter((p) => p.kind === "post").length, 20, "19 blog posts plus the West Hartford page");
});

test("one H1 at most per page", () => {
  for (const p of fallbackPages) {
    const h1 = p.sections.flatMap((s) => s.atoms).filter((a) => a._type === "hdg" && a.level === 1);
    assert.ok(h1.length <= 1, `${p.path} has ${h1.length} H1s`);
  }
});

test("no street address, no rating stars, one phone link format", () => {
  const all = JSON.stringify({ fallbackPages, fallbackSettings });
  assert.doesNotMatch(all, /Peck L/i);
  assert.doesNotMatch(all, /★/);
  const tels = all.match(/tel:[^"]+/g) || [];
  for (const t of tels) assert.ok(t === "tel:+14752276896" || t === "tel:+14722033284", t);
});

test("redirects: one hop, never away from a live page, always to a live page", () => {
  const extra = new Set(["/feed/", "/sitemap_index.xml", "/studio/", "/patios-walkways/"]);
  for (const r of redirects) {
    if (!r.has) assert.ok(!paths.has(r.source), `live page redirected: ${r.source}`);
    const dest = r.destination.split("?")[0];
    assert.ok(paths.has(dest) || extra.has(dest), `${r.source} -> ${dest} is not a live page`);
    if (!r.has) assert.ok(!redirects.some((x) => x.source === dest && !x.has), `chain at ${r.source}`);
  }
});

test("every form button points at a known form", () => {
  const keys = new Set(fallbackSettings.forms.map((f) => f.formKey));
  for (const p of fallbackPages) for (const s of p.sections) for (const a of s.atoms) {
    if (a._type === "btn" && a.formKey) assert.ok(keys.has(a.formKey), `${p.path}: ${a.formKey}`);
    if (a._type === "form") assert.ok(keys.has(a.formKey), `${p.path}: ${a.formKey}`);
  }
});
