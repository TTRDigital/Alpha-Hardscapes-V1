import test from "node:test";
import assert from "node:assert/strict";
import { pt } from "../content/fallback/pt.ts";

test("pt converts headings, paragraphs, lists, bold and links", () => {
  const blocks = pt(`
## Heading
A paragraph with **bold** and a [link](/services/retaining-walls/).
- first
- second
1. step
`) as unknown as Array<{ _key: string; style: string; listItem?: string; markDefs: { href: string }[]; children: { text: string; marks: string[] }[] }>;
  assert.equal(blocks.length, 5);
  assert.equal(blocks[0].style, "h2");
  assert.equal(blocks[0].children[0].text, "Heading");
  const para = blocks[1];
  assert.equal(para.style, "normal");
  assert.ok(para.children.some((c) => c.text === "bold" && c.marks.includes("strong")));
  assert.equal(para.markDefs[0].href, "/services/retaining-walls/");
  assert.equal(blocks[2].listItem, "bullet");
  assert.equal(blocks[4].listItem, "number");
  const keys = new Set(blocks.map((b) => b._key));
  assert.equal(keys.size, blocks.length, "every block has a unique key");
});
