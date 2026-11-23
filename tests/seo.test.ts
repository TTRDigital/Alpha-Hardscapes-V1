import test from "node:test";
import assert from "node:assert/strict";
import { businessJsonLd, visibleFaqs } from "../lib/seo.ts";
import { fallbackPages, fallbackSettings } from "../content/site.ts";

test("business schema: town and ZIP only, hours, no ratings", () => {
  const ld = businessJsonLd(fallbackSettings) as Record<string, unknown>;
  assert.equal(ld.name, "Alpha Hardscapes");
  assert.equal(ld.telephone, "+14752276896");
  const addr = ld.address as Record<string, string>;
  assert.equal(addr.addressLocality, "New Haven");
  assert.equal(addr.postalCode, "06510");
  assert.equal(addr.streetAddress, undefined, "never a street address");
  const hours = ld.openingHoursSpecification as { dayOfWeek: string[]; opens: string; closes: string }[];
  assert.equal(hours.length, 2);
  assert.equal(hours[0].opens, "08:00");
  const json = JSON.stringify(ld);
  assert.doesNotMatch(json, /aggregateRating|"Review"|ratingValue/i);
});

test("FAQ schema only from questions that are on the page", () => {
  const masonry = fallbackPages.find((p) => p.path === "/masonry/")!;
  const faqs = visibleFaqs(masonry);
  assert.ok(faqs.length > 0);
  const text = JSON.stringify(masonry.sections);
  for (const f of faqs) assert.ok(text.includes(JSON.stringify(f.q).slice(1, -1)), f.q);
});
