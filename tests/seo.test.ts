import test from "node:test";
import assert from "node:assert/strict";
import { businessJsonLd } from "../lib/seo.ts";
import { settings } from "../content/fallback/settings.ts";

test("business schema has the fields Google needs", () => {
  const ld = businessJsonLd(settings) as Record<string, unknown>;
  assert.equal(ld.name, "Alpha Hardscapes");
  assert.equal(ld.telephone, "+14752276896");
  const hours = ld.openingHoursSpecification as { dayOfWeek: string[]; opens: string; closes: string }[];
  assert.equal(hours.length, 2, "Sunday (closed) is left out");
  assert.deepEqual(hours[0].dayOfWeek, ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
  assert.equal(hours[0].opens, "08:00");
  assert.equal(hours[0].closes, "17:00");
  assert.equal(hours[1].opens, "09:00");
  assert.equal(hours[1].closes, "13:00");
  const addr = ld.address as { streetAddress?: string; addressLocality: string };
  assert.equal(addr.addressLocality, "Cheshire");
  assert.equal(addr.streetAddress, undefined, "street hidden until the client opts in");
});
