import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import * as fb from "../content/fallback/index.ts";
import { redirects } from "../redirects.ts";

const PUBLIC = path.resolve(process.cwd(), "public");
const localImages: string[] = [];
function collect(v: unknown) {
  if (Array.isArray(v)) return v.forEach(collect);
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    if (typeof o.src === "string" && o.src.startsWith("/images/")) localImages.push(o.src);
    Object.values(o).forEach(collect);
  }
}
collect({ ...fb });

test("every built-in image file exists", () => {
  const missing = [...new Set(localImages)].filter((src) => !existsSync(path.join(PUBLIC, src)));
  assert.deepEqual(missing, []);
});

test("built-in content has unique slugs per type", () => {
  for (const [name, list] of Object.entries({ services: fb.services, projects: fb.projects, areas: fb.areas, posts: fb.posts, pages: fb.pages })) {
    const slugs = list.map((x) => x.slug);
    assert.equal(new Set(slugs).size, slugs.length, `${name} slugs are unique`);
    for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/, `${name} slug ${s} is URL safe`);
  }
});

test("project and testimonial service references point at real services", () => {
  const known = new Set(fb.services.map((s) => s.slug));
  for (const p of fb.projects) for (const s of p.services || []) assert.ok(known.has(s.slug), `${p.slug} -> ${s.slug}`);
  for (const p of fb.posts) if (p.relatedService) assert.ok(known.has(p.relatedService), `${p.slug} -> ${p.relatedService}`);
  for (const a of fb.areas) if (a.county) assert.ok(fb.areas.some((c) => c.kind === "county" && c.slug === a.county!.slug), `${a.slug} county`);
});

test("redirects point at pages that exist in the built-in content", () => {
  const paths = new Set<string>([
    "/", "/services/", "/projects/", "/about/", "/faq/", "/service-areas/", "/terms/", "/contact/", "/blog/", "/thank-you/", "/studio/",
    ...fb.services.map((s) => `/services/${s.slug}/`),
    ...fb.areas.map((a) => `/service-areas/${a.slug}/`),
    ...fb.posts.map((p) => `/blog/${p.slug}/`),
  ]);
  for (const r of redirects) {
    if (r.destination.includes(":")) continue; // pattern redirects
    assert.ok(paths.has(r.destination), `${r.source} -> ${r.destination} exists`);
    assert.ok(r.permanent, `${r.source} is permanent`);
  }
  const sources = redirects.map((r) => r.source);
  assert.equal(new Set(sources).size, sources.length, "no duplicate redirect sources");
});


test("internal links inside content resolve to a page or a redirect", () => {
  const known = new Set<string>([
    "/", "/services/", "/projects/", "/about/", "/faq/", "/service-areas/", "/contact/", "/blog/", "/reviews/", "/privacy-policy/", "/terms/",
    ...fb.services.map((s) => `/services/${s.slug}/`),
    ...fb.areas.map((a) => `/service-areas/${a.slug}/`),
    ...fb.posts.map((p) => `/blog/${p.slug}/`),
    ...fb.projects.map((p) => `/projects/${p.slug}/`),
  ]);
  const redirected = new Set(redirects.map((r) => r.source));
  const broken: string[] = [];
  const walk = (v: unknown, where: string) => {
    if (Array.isArray(v)) return v.forEach((x) => walk(x, where));
    if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      if (o._type === "link" && typeof o.href === "string") {
        const h = o.href.replace(/^https?:\/\/(www\.)?alphahardscapes\.com/, "").split("#")[0];
        if (h.startsWith("/")) {
          const withSlash = h.endsWith("/") ? h : `${h}/`;
          if (!known.has(withSlash) && !redirected.has(withSlash.replace(/\/$/, ""))) broken.push(`${where}: ${h}`);
        }
      }
      Object.values(o).forEach((x) => walk(x, where));
    }
  };
  for (const p of fb.posts) walk(p.body, `post ${p.slug}`);
  for (const p of fb.pages) walk(p.body, `page ${p.slug}`);
  for (const s of fb.services) walk(s.body, `service ${s.slug}`);
  for (const a of fb.areas) walk(a.body, `area ${a.slug}`);
  assert.deepEqual(broken, []);
});

test("SEO titles and descriptions on every built-in page fit in search results", () => {
  const all: [string, { title?: string; description?: string } | undefined][] = [
    ["home", fb.homePage.seo], ["about", fb.aboutPage.seo],
    ...fb.services.map((s) => [`service ${s.slug}`, s.seo] as [string, typeof s.seo]),
    ...fb.areas.map((a) => [`area ${a.slug}`, a.seo] as [string, typeof a.seo]),
  ];
  for (const [k, s] of all) {
    assert.ok((s?.title || "").length <= 65, `${k} title is ${(s?.title || "").length} characters`);
    assert.ok((s?.description || "").length <= 160, `${k} description is ${(s?.description || "").length} characters`);
  }
});
