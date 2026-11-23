/**
 * One-off migration: converts the live site's Sanity documents (Elementor node trees)
 * into the block model this site renders, keeping every visible word, heading level,
 * list, FAQ, button and in-text link exactly as published.
 *
 *   node scripts/migrate/import-live.mjs <live-seed.json> <old-public-dir>
 *
 * Writes content/legacy/site.data.ts and copies the real project photos it uses to
 * public/images/site/. Images judged to be AI renders or stock (SEO rules: real photos
 * only) are left out; see REAL_EXTRA and isRealPhoto().
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const [seedPath, oldPublic] = process.argv.slice(2);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const docs = JSON.parse(fs.readFileSync(seedPath, "utf8"));
const OUT_IMG = path.join(ROOT, "public/images/site");
fs.mkdirSync(OUT_IMG, { recursive: true });

let k = 0;
const key = () => `b${(k++).toString(36)}`;

/* ---------- text helpers ---------- */
const ENT = { "&nbsp;": " ", "&amp;": "&", "&quot;": '"', "&#039;": "'", "&#39;": "'", "&rsquo;": "’", "&lsquo;": "‘", "&ldquo;": "“", "&rdquo;": "”", "&ndash;": "–", "&mdash;": "—", "&#8217;": "’", "&#8216;": "‘", "&#8220;": "“", "&#8221;": "”", "&#8211;": "–", "&#8212;": "—", "&lt;": "<", "&gt;": ">", "&hellip;": "…", "&#8230;": "…", "&#038;": "&", "&#8243;": "″", "&#215;": "×" };
const decode = (s) => String(s ?? "").replace(/&[#a-z0-9]+;/gi, (m) => ENT[m] ?? (m.startsWith("&#") ? String.fromCodePoint(parseInt(m.slice(2).replace(/^x/i, ""), /^&#x/i.test(m) ? 16 : 10)) : m));
const strip = (h) => decode(String(h ?? "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
const REDIRECTS = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, "content/redirects.json"), "utf8")).filter((r) => !r.query).map((r) => [r.source, r.destination]));
const relHref = (h) => {
  const x = relHref0(h);
  if (typeof x === "string" && x.startsWith("/")) { const [p, hash] = x.split("#"); const q = p.endsWith("/") || p.includes("?") || p.includes(".") ? p : `${p}/`; const to = REDIRECTS.get(q); return to ? to + (hash ? `#${hash}` : "") : x; }
  return x;
};
const relHref0 = (h) => {
  if (!h) return h;
  if (/^tel:/i.test(String(h).trim())) { const d = String(h).replace(/\D/g, ""); return `tel:+${d.length === 10 ? "1" + d : d}`; }
  let x = String(h).trim().replace(/^https?:\/\/(www\.)?alphahardscapes\.com/i, "");
  if (x === "") x = "/";
  return x;
};

/* Popup buttons: "#elementor-action:action=popup:open&settings=<base64 {id}>" -> popup id */
function popupId(href) {
  const m = decodeURIComponent(String(href || "")).match(/action=popup:open&settings=([A-Za-z0-9+/=]+)/);
  if (!m) return null;
  try { return String(JSON.parse(Buffer.from(m[1], "base64").toString()).id); } catch { return null; }
}

/** Minimal HTML -> Portable Text (paragraphs, h2-h6, ul/ol li, strong/b, em/i, a). */
function htmlToPt(html) {
  const src = String(html ?? "").replace(/\r/g, "");
  const blocks = [];
  const opens = [...src.matchAll(/<(ul|ol)\b|<\/(ul|ol)>/gi)];
  const listAt = (pos) => { const st = []; for (const o of opens) { if (o.index > pos) break; if (o[1]) st.push(o[1].toLowerCase()); else st.pop(); } return st[st.length - 1] || null; };
  const push = (tag, inner, at) => {
    const children = []; const markDefs = [];
    const inl = /<(strong|b|em|i|a)\b([^>]*)>([\s\S]*?)<\/\1>|<br\s*\/?>|([^<]+)|<[^>]+>/gi; let t;
    while ((t = inl.exec(inner))) {
      if (t[4] !== undefined) { const text = decode(t[4]).replace(/\s+/g, " "); if (text) children.push({ _type: "span", _key: key(), text, marks: [] }); continue; }
      if (/^<br/i.test(t[0])) { children.push({ _type: "span", _key: key(), text: "\n", marks: [] }); continue; }
      if (!t[1]) continue;
      const tg = t[1].toLowerCase(); const marks = [];
      if (tg === "strong" || tg === "b") marks.push("strong");
      if (tg === "em" || tg === "i") marks.push("em");
      if (tg === "a") { const href = (t[2].match(/href\s*=\s*"([^"]*)"/i) || [])[1]; if (href) { const kk = key(); markDefs.push({ _type: "link", _key: kk, href: relHref(decode(href)), ...(/target="_blank"/i.test(t[2]) ? { newTab: true } : {}) }); marks.push(kk); } }
      const text = decode(String(t[3]).replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).replace(/[ \t]+/g, " "); if (text) children.push({ _type: "span", _key: key(), text, marks });
    }
    while (children.length && !children[0].text.trim()) children.shift();
    while (children.length && !children[children.length - 1].text.trim()) children.pop();
    if (!children.length) return;
    children[0].text = children[0].text.replace(/^\s+/, ""); children[children.length - 1].text = children[children.length - 1].text.replace(/\s+$/, "");
    const block = { _type: "block", _key: key(), style: /^h[1-6]$/.test(tag) ? `h${Math.min(Math.max(+tag[1], 2), 4)}` : tag === "blockquote" ? "blockquote" : "normal", markDefs, children };
    if (tag === "li") { block.listItem = listAt(at) === "ol" ? "number" : "bullet"; block.level = 1; }
    blocks.push(block);
  };
  const loose = (chunk, at) => {
    const c = chunk.replace(/<\/?(ul|ol|div|section|span|font)\b[^>]*>/gi, " ");
    for (const part of c.split(/(?:<br\s*\/?>\s*){2,}|\n{2,}/i)) if (strip(part)) push("p", part, at);
  };
  const re = /<(p|h[1-6]|li|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi; let m; let last = 0;
  while ((m = re.exec(src))) { loose(src.slice(last, m.index), m.index); push(m[1].toLowerCase(), m[2], m.index); last = re.lastIndex; }
  loose(src.slice(last), last);
  return blocks;
}

function normPt(body) {
  const out = [];
  for (const b of body || []) {
    if (b._type === "htmlBlock") { out.push(...htmlToPt(b.html)); continue; }
    if (b._type !== "block") continue;
    const style = { bare: "normal", h1: "h2", h5: "h4", h6: "h4" }[b.style] || b.style || "normal";
    // Links stay; inline styles become bold (when bold) or are dropped.
    const defs = b.markDefs || [];
    const markDefs = defs.filter((d) => d._type === "link").map((d) => ({ ...d, href: relHref(d.href) }));
    const styleMap = Object.fromEntries(defs.filter((d) => d._type !== "link").map((d) => [d._key, /font-weight:\s*(bold|[6-9]00)/.test(d.style || "") ? "strong" : null]));
    const children = (b.children || []).map((c) => ({ _type: "span", _key: c._key || key(), text: c.text || "", marks: [...new Set((c.marks || []).map((x) => (x in styleMap ? styleMap[x] : ({ b: "strong", i: "em" })[x] || x)).filter((x) => x && x !== "underline"))] }));
    if (!children.some((c) => c.text.trim())) continue;
    const nb = { _type: "block", _key: b._key || key(), style, markDefs, children };
    if (b.listItem) { nb.listItem = b.listItem; nb.level = b.level || 1; }
    out.push(nb);
  }
  return out;
}
const ptText = (blocks) => blocks.map((b) => (b.children || []).map((c) => c.text).join("")).join(" ");

/* ---------- images ---------- */
const REAL_EXTRA = new Set([
  "2025/06/alphahardscapes-background-image", "2025/05/grid-image-1", "2025/05/grid-image-2", "2024/11/alphahardscapes-image-8", "2024/12/alphahardscapes-image-9",
  "2024/11/alphahardscapes-image-6", "2024/11/alphahardscapes-image-2", "2025/05/grid-image-3", "2024/11/alphahardscapes-image-3", "2025/04/left-image", "2025/04/our-passion-image",
  "2025/05/landscaping-image-1", "2025/05/before-after-1", "2025/05/before-after-2", "2025/05/before-after-3", "2025/06/big-image", "2025/06/patio-8", "2025/06/walkway-photo-1",
  "2025/06/1000004722", "2025/06/patio-6", "2025/06/patio-7", "2025/06/patio-5", "2025/02/alphahardscapes-image-9", "2026/04/pool-installation", "2025/02/masonry-3",
  "2025/06/outdoor-image", "2025/06/image-725", "2024/11/image-725", "2024/11/alphahardscapes-image-5", "2024/11/alphahardscapes-image-4", "2024/11/alphahardscapes-image-1",
]);
const DECOR = /filled-bg|dot-gr|logo|\/alpha\.png|fav-|icon|footer-logo|Frame-19840|southern-connecticut-map|county-map/i;
function stem(src) {
  const p = src.replace(/^.*\/uploads\//, "").replace(/\.[a-z0-9]+$/i, "");
  return p.replace(/-(scaled|\d+x\d+|e\d{9,})(?=-|$)/g, "").replace(/-r[0-9a-z]{30,}$/, "").replace(/^elementor\/thumbs\//, "");
}
function isRealPhoto(src) {
  if (!src || DECOR.test(src)) return false;
  const s = stem(src);
  if (/^(2025\/09|2026\/07)\//.test(s)) return true;
  if (/sebastian/i.test(s)) return true;
  if (/-bna$/.test(s)) return true;
  if (/(^|\/)(IMG_\d+|\d{10}|[0-9A-F]{8}-[0-9A-F]{4}-)/i.test(s) && !/^2026\/0[48]\/1\d{12}/.test(s)) return true;
  if (/2026\/05\/IMG_0680/.test(s)) return true;
  for (const r of REAL_EXTRA) if (s === r || s.endsWith(r.split("/").pop()) && s.startsWith(r.split("/")[0])) return true;
  return false;
}
const copied = new Map();
/** Descriptive alt text written for real photos whose live alt text was empty or a file name (content/legacy/alt-text.json). */
const ALT = JSON.parse(fs.readFileSync(path.join(ROOT, "content/legacy/alt-text.json"), "utf8"));
const altFor = (src, alt) => ALT[src] || decode(alt || "");
const fixAlts = (p) => { for (const s of p.sections) for (const a of s.atoms) { if (a._type === "img") a.image.alt = ALT[a.image.src] || a.image.alt; if (a._type === "gallery") a.images.forEach((i) => (i.alt = ALT[i.src] || i.alt)); } for (const k of ["heroImage", "featuredImage"]) if (p[k]) p[k].alt = ALT[p[k].src] || p[k].alt; };
function realImage(src, alt) {
  if (!src) return null;
  const rel = relHref(src).replace(/\?.*$/, "");
  if (!isRealPhoto(rel)) return null;
  if (copied.has(rel)) return { ...copied.get(rel), alt: altFor(copied.get(rel).src, alt) };
  // Prefer the full-size original next to a resized/edited variant
  const candidates = [rel, rel.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1"), rel.replace(/-e\d{9,}(\.[a-z]+)$/i, "$1"), rel.replace(/-e\d{9,}-\d+x\d+(\.[a-z]+)$/i, "$1")];
  let file = null;
  for (const c of candidates.reverse()) { const f = path.join(oldPublic, c); if (fs.existsSync(f)) { file = f; break; } }
  if (!file) { console.warn("missing image", rel); return null; }
  const name = stem(rel).replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-|-$/g, "") + ".webp";
  const out = path.join(OUT_IMG, name);
  if (!fs.existsSync(out)) execFileSync("convert", [file + "[0]", "-auto-orient", "-strip", "-resize", "2560x2560>", "-quality", "88", out]);
  const [w, h] = execFileSync("identify", ["-format", "%w %h", out]).toString().split(" ").map(Number);
  const img = { src: `/images/site/${name}`, width: w, height: h };
  copied.set(rel, img);
  return { ...img, alt: altFor(img.src, alt) };
}

/* ---------- forms ---------- */
const forms = {};
function readForm(tpl) {
  const postId = (tpl.match(/name="post_id" value="(\d+)"/) || [])[1];
  const formId = (tpl.match(/name="form_id" value="([a-z0-9]+)"/) || [])[1];
  const formName = decode((tpl.match(/<form[^>]*name="([^"]+)"/) || [])[1] || "");
  const fields = [];
  const groupRe = /<div class="elementor-field-type-([a-z]+) elementor-field-group[^"]*elementor-field-group-([a-z0-9_]+)([^"]*)"[^>]*>([\s\S]*?)(?=<div class="elementor-field-type-|<div class="elementor-field-group elementor-column elementor-field-type-submit|$)/g;
  let g;
  while ((g = groupRe.exec(tpl))) {
    const [, type, id, cls, inner] = g;
    if (type === "submit" || type === "recaptcha" || type === "honeypot" || type === "html") continue;
    const label = strip((inner.match(/<label[^>]*class="elementor-field-label"[^>]*>([\s\S]*?)<\/label>/) || [])[1] || "");
    const placeholder = decode((inner.match(/placeholder="([^"]*)"/) || [])[1] || "");
    const required = /elementor-field-required/.test(cls) || /required="required"|aria-required="true"/.test(inner);
    const options = [...inner.matchAll(/<option value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g)].map((o) => decode(o[2]).trim()).filter(Boolean);
    const radios = [...inner.matchAll(/<input type="(?:radio|checkbox)" value="([^"]*)"[^>]*>\s*<label[^>]*>([\s\S]*?)<\/label>/g)].map((o) => strip(o[2]));
    const acceptance = type === "acceptance" ? strip((inner.match(/<label[^>]*for="form-field-[^"]*"[^>]*>([\s\S]*?)<\/label>\s*<\/span>/) || inner.match(/<label[^>]*>([\s\S]*?)<\/label>(?![\s\S]*<label)/) || [])[1] || "") : undefined;
    fields.push({ id, type, label, placeholder, required, ...(options.length ? { options } : {}), ...(radios.length ? { options: radios } : {}), ...(acceptance ? { text: acceptance } : {}) });
  }
  const button = strip((tpl.match(/<span class="elementor-button-text">([\s\S]*?)<\/span>/g) || []).pop() || "");
  return { formKey: `${postId}:${formId}`, name: formName, fields, button };
}

/* ---------- node walk ---------- */
const hiddenOf = (tpl) => {
  const head = String(tpl || "").slice(0, 700);
  const d = /elementor-hidden-desktop/.test(head), t = /elementor-hidden-tablet/.test(head), m = /elementor-hidden-mobile/.test(head);
  if (d && t && m) return "all";
  if (d) return "mobileOnly";
  return null;
};
const popupForm = {}; // popup template id -> formKey
/** Hand-written HTML some widgets carry in their template next to the field placeholders (e.g. bullet lists under a box). */
function tplAfter(tpl, marker) {
  const t = String(tpl || "").replace(/<svg[\s\S]*?<\/svg>/g, "");
  const i = t.indexOf(marker);
  if (i < 0) return "";
  let rest = t.slice(i + marker.length).replace(/^\s*<\/(p|h\d|span|div)>/, "");
  rest = rest.replace(/(<\/div>\s*)+$/, "");
  return /[a-z]/i.test(rest.replace(/<[^>]+>/g, "")) ? rest : "";
}

function atomsOf(nodes, ctx, out = []) {
  for (const n of nodes || []) {
    const hid = hiddenOf(n.tpl);
    if (hid === "all") continue;
    const start = out.length;
    switch (n._type) {
      case "elContainer": case "elEmbed": atomsOf(n.children, ctx, out); break;
      case "elHeading": {
        const level = +((n.tpl || "").match(/<h([1-6])/) || [])[1] || 2;
        const text = strip(n.titleHtml || n.title);
        if (text) out.push({ _type: "hdg", _key: key(), level, text, ...(n.link && !popupId(n.link) ? { href: relHref(n.link) } : {}) });
        // Extra headings written straight into the widget (one ad page keeps its H1 there)
        const extra = tplAfter(n.tpl, n.title ? "[[@text:title]]" : "[[@text:title]]");
        for (const m of extra.matchAll(/<(h[1-6]|p)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
          const t = strip(m[2]);
          if (!t) continue;
          if (m[1] === "p") out.push({ _type: "rt", _key: key(), body: htmlToPt(`<p>${m[2]}</p>`) });
          else out.push({ _type: "hdg", _key: key(), level: +m[1][1], text: t });
        }
        break;
      }
      case "elText": case "elRichText": {
        const blocks = n.bodyHtml ? htmlToPt(n.bodyHtml) : normPt(n.body);
        if (blocks.length) out.push({ _type: "rt", _key: key(), body: blocks });
        break;
      }
      case "elImage": {
        const im = realImage(n.image?.src, n.image?.alt);
        if (im) out.push({ _type: "img", _key: key(), image: im, ...(n.caption || n.captionHtml ? { caption: strip(n.captionHtml || n.caption) } : {}) });
        break;
      }
      case "elButton": {
        const label = strip(n.textHtml || n.text);
        if (!label) break;
        const pid = popupId(n.link);
        // In-page jumps to an Elementor section id go to the page's form instead
        const href = /^#(elementor|get-quote|free-quote)/i.test(String(n.link || "")) ? "#quote-form" : relHref(n.link) || "/contact/";
        out.push({ _type: "btn", _key: key(), label, ...(pid ? { popup: pid } : { href }) });
        break;
      }
      case "elIconBox": {
        const title = strip(n.titleHtml || n.title); const text = strip(n.descriptionHtml || n.description);
        const href = n.link && !popupId(n.link) ? relHref(n.link) : undefined;
        const tel = /^\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}$/.test(title) && !text ? "tel:+14752276896" : undefined;
        const extra = tplAfter(n.tpl, "[[@text:description]]") || tplAfter(n.tpl, "[[@html:descriptionHtml]]");
        const body = extra ? htmlToPt(extra) : [];
        if (title || text) out.push({ _type: "box", _key: key(), title, text, ...(body.length ? { body } : {}), ...(href || tel ? { href: href || tel } : {}) });
        break;
      }
      case "elIconList": {
        const items = (n.items || []).map((it) => ({ _key: key(), body: it.textHtml ? htmlToPt(it.textHtml) : [{ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text: strip(it.text), marks: [] }] }], ...(it.link ? { href: relHref(it.link) } : {}) })).filter((it) => ptText(it.body).trim());
        if (items.length) out.push({ _type: "list", _key: key(), items });
        break;
      }
      case "elAccordion": {
        const items = (n.items || []).map((it) => { const a = atomsOf(it.content, ctx, []); const body = a.flatMap((x) => (x._type === "rt" ? x.body : x._type === "list" ? x.items.flatMap((i) => i.body.map((b) => ({ ...b, listItem: "bullet", level: 1 }))) : [])); return { _key: key(), question: strip(it.titleHtml || it.title), answer: body }; }).filter((x) => x.question);
        if (items.length) out.push({ _type: "faq", _key: key(), items });
        break;
      }
      case "elReviews": {
        const items = (n.items || []).map((it) => ({ _key: key(), name: decode(it.name || ""), meta: decode(it.title || ""), text: decode(it.text || ""), ...(it.link ? { href: it.link } : {}), ...(it.image?.src ? { avatar: relHref(it.image.src) } : {}) })).filter((x) => x.text);
        if (items.length) out.push({ _type: "reviews", _key: key(), items });
        break;
      }
      case "elRaw": {
        if (n.widget === "testimonial-carousel") {
          const tpl = n.tpl || "";
          const contents = [...tpl.matchAll(/elementor-testimonial__text">([\s\S]*?)<\/div>/g)].map((x) => strip(x[1]));
          const names = [...tpl.matchAll(/elementor-testimonial__name">([\s\S]*?)<\/(?:span|cite|div)>/g)].map((x) => strip(x[1]));
          const items = contents.map((text, i) => ({ _key: key(), text, name: names[i] || "", meta: "" })).filter((x) => x.text);
          if (items.length) out.push({ _type: "reviews", _key: key(), items });
        }
        break;
      }
      case "elCarousel": case "elImageGallery": {
        const images = (n.items || []).map((it) => realImage(it.image?.src && /-\d+x\d+\./.test(it.image.src) && it.link ? it.link : it.image?.src, it.image?.alt)).filter(Boolean);
        if (images.length) out.push({ _type: "gallery", _key: key(), images });
        break;
      }
      case "elGallery": {
        const images = (n.items || []).map((it) => realImage(it.link || it.thumbnail, "")).filter(Boolean);
        if (images.length) out.push({ _type: "gallery", _key: key(), images, large: true });
        break;
      }
      case "elForm": { const f = readForm(n.tpl || ""); forms[f.formKey] = { ...(forms[f.formKey] || {}), ...f }; out.push({ _type: "form", _key: key(), formKey: f.formKey }); break; }
      case "elHtmlCode": out.push({ _type: "html", _key: key(), html: String(n.html || "") }); break;
      case "elMap": out.push({ _type: "map", _key: key(), title: decode(n.mapTitle || ""), url: n.mapUrl || "" }); break;
      case "elVideo": { const u = relHref(n.videoUrl || ""); out.push({ _type: "video", _key: key(), url: /Alpha-Hardscapes-Reel/i.test(u) ? "/images/brand/reel-vertical.mp4" : /7602D579/i.test(u) ? "/images/site/pool-project.mp4" : u }); break; }
      default: break;
    }
    if (hid === "mobileOnly") for (let i = start; i < out.length; i++) out[i].mobileOnly = true;
  }
  return out;
}

const atomText = (a) => {
  switch (a._type) {
    case "hdg": return a.text; case "rt": return ptText(a.body); case "btn": return a.label; case "box": return `${a.title} ${a.text}`;
    case "list": return a.items.map((i) => ptText(i.body)).join(" "); case "faq": return a.items.map((i) => `${i.question} ${ptText(i.answer)}`).join(" ");
    case "reviews": return a.items.map((i) => `${i.name} ${i.text}`).join(" "); default: return "";
  }
};
const squash = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();

function sectionsOf(content, ctx) {
  const sections = [];
  for (const top of content || []) {
    if (hiddenOf(top.tpl) === "all") continue;
    const atoms = atomsOf([top], ctx, []);
    if (atoms.length) sections.push({ _type: "section", _key: key(), atoms });
  }
  // Drop mobile-only duplicates whose words already appear elsewhere on the page
  const all = sections.flatMap((s) => s.atoms);
  const visibleText = squash(all.filter((a) => !a.mobileOnly).map(atomText).join(" "));
  for (const s of sections) s.atoms = s.atoms.filter((a) => !a.mobileOnly || (atomText(a) && !visibleText.includes(squash(atomText(a)))) || (!atomText(a) && false)).map((a) => { delete a.mobileOnly; return a; });
  return sections.filter((s) => s.atoms.length);
}

/* ---------- popups (forms used by buttons) ---------- */
for (const d of docs.filter((d) => d._type === "elementorTemplate")) {
  const id = d._id.replace(/^template-/, "");
  const a = atomsOf(d.content, {}, []);
  const f = a.find((x) => x._type === "form");
  if (f) popupForm[id] = { formKey: f.formKey, heading: a.find((x) => x._type === "hdg")?.text || "" };
}

/* ---------- settings, header, footer ---------- */
const settingsDoc = docs.find((d) => d._type === "siteSettings");
for (const f of settingsDoc.forms || []) forms[f.formKey] = { ...(forms[f.formKey] || {}), formKey: f.formKey, name: f.name, redirect: f.redirect, ...(f.tag ? { tag: f.tag } : {}) };
const navOf = (doc) => { const items = []; const w = (nodes) => { for (const n of nodes || []) { if (n._type === "elNavMenu") { const m = (it) => ({ label: decode(it.label), href: relHref(it.link), ...(it.children?.length ? { children: it.children.map(m) } : {}) }); items.push(...(n.items || []).map(m)); return true; } w(n.children); } }; w(doc.content); return items; };
const header = docs.find((d) => d._id === "template-61");
const footer = docs.find((d) => d._id === "template-102");
const headerAtoms = atomsOf(header.content, {}, []);
const headerCta = headerAtoms.find((a) => a._type === "btn");
const footerAtoms = atomsOf(footer.content, {}, []);
const footerNav = navOf(footer);
const footerText = footerAtoms.filter((a) => a._type === "rt" || a._type === "list").map(atomText);

/* ---------- documents ---------- */
const authors = Object.fromEntries(docs.filter((d) => d._type === "author").map((d) => [d._id, { name: d.name, slug: d.slug?.current }]));
const categories = Object.fromEntries(docs.filter((d) => d._type === "category").map((d) => [d._id, { name: d.name || d.title, slug: d.slug?.current }]));
const seoOf = (s = {}) => {
  const o = { title: decode(s.title || ""), description: decode(s.description || ""), canonical: s.canonical || "", robots: s.robots || "", ogTitle: decode(s.ogTitle || ""), ogDescription: decode(s.ogDescription || ""), ogType: s.ogType || "" };
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v));
};

/* Page photo: first real photo on the page, else one picked by topic from the real project photos. */
const TOPIC = [
  [/pool/, "2026-04-pool-installation.webp"], [/chimney/, "2025-06-chimney-bna.webp"], [/fire/, "2026-07-fire-pit-2254.webp"],
  [/steps|stairs/, "2026-07-stairs-1823.webp"], [/wall-block|stone|retaining/, "2026-07-retaining-wall-0282.webp"],
  [/walkway|patio|paver|20-off|optin/, "2026-07-patio-1804.webp"], [/landscap|seasonal|leaf|snow/, "2026-07-bed-0084.webp"],
  [/kitchen|outdoor-living|deck/, "2025-06-outdoor-image.webp"], [/repair/, "2026-07-walkway-2065.webp"],
  [/masonry|thinstone/, "2025-06-big-image.webp"],
];
function heroFor(p) {
  const first = p.sections.flatMap((s) => s.atoms).map((a) => (a._type === "img" ? a.image : a._type === "gallery" ? a.images[0] : null)).find(Boolean);
  if (first) return first;
  const hit = TOPIC.find(([re]) => re.test(p.path + " " + p.title.toLowerCase()));
  const name = hit ? hit[1] : "2025-06-img-9324-1.webp";
  const f = path.join(OUT_IMG, name);
  if (!fs.existsSync(f)) return null;
  const [w, h] = execFileSync("identify", ["-format", "%w %h", f]).toString().split(" ").map(Number);
  return { src: `/images/site/${name}`, width: w, height: h, alt: ALT[`/images/site/${name}`] || "" };
}

const pages = [];
for (const d of docs) {
  if (!["page", "post", "archivePage"].includes(d._type)) continue;
  const ctx = { path: d.path };
  const sections = sectionsOf(d.content, ctx);
  if (d._type === "post" && d.body?.length) sections.push({ _type: "section", _key: key(), atoms: [{ _type: "rt", _key: key(), body: normPt(d.body) }] });
  if (d._type === "post" && d.bodyHtml) sections.push({ _type: "section", _key: key(), atoms: [{ _type: "rt", _key: key(), body: htmlToPt(d.bodyHtml) }] });
  // Which popup form the page's buttons open (first one found), for the inline quote form
  const pops = sections.flatMap((s) => s.atoms).filter((a) => a._type === "btn" && a.popup).map((a) => a.popup);
  const page = {
    _id: d._id,
    kind: d._type === "archivePage" ? "archive" : d._type,
    title: decode(d.title || ""),
    path: d.path,
    seo: seoOf(d.seo),
    sections,
    ...(pops[0] ? { quoteForm: popupForm[pops[0]]?.formKey || null } : {}),
  };
  if (d._type === "post") {
    Object.assign(page, {
      date: d.seo?.publishedTime || d.date, modified: d.seo?.modifiedTime || d.modified, author: authors[d.author?._ref]?.name, authorSlug: authors[d.author?._ref]?.slug,
      categories: (d.categories || []).map((c) => categories[c._ref]?.slug).filter(Boolean),
      excerpt: strip(d.excerpt || ""), featuredImage: realImage(d.featuredImage?.src, d.featuredImage?.alt) || null,
    });
  }
  if (d._type === "archivePage") Object.assign(page, { archive: d.kind, heading: decode(d.heading || ""), author: authors[d.author?._ref]?.name, authorSlug: authors[d.author?._ref]?.slug, category: categories[d.category?._ref]?.slug });
  pages.push(page);
}

// Archive pages: intro text as on the live archive template
const INTRO = "Practical guides from Sebastian Ullrich and the Alpha Hardscapes team on patios, walkways, retaining walls and fire features for Connecticut homeowners.";
const para = (text) => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });
for (const p of pages.filter((x) => x.kind === "archive")) {
  if (p.archive === "blog") p.heading = p.heading || "Hardscaping & Landscaping Blog";
  if (p.archive === "category") p.heading = p.title;
  if (p.archive === "author" && p.authorSlug !== "sebastian") p.heading = `Author name: ${p.authorSlug}`;
  if (p.archive !== "author" && !p.sections.length) p.sections = [{ _type: "section", _key: key(), atoms: [{ _type: "rt", _key: key(), body: [para(INTRO)] }] }];
}
// Phone numbers and the email address in text become tap-to-call / mail links
const linkify = (blocks) => { for (const b of blocks || []) { if (b._type !== "block") continue; const out = []; for (const c of b.children) { const hasLink = c.marks.some((m) => b.markDefs.some((d) => d._key === m)); const re = /(\(?475\)?[ .-]?227[ .-]?6896|alphahardscapes1@gmail\.com)/; if (hasLink || !re.test(c.text)) { out.push(c); continue; } for (const part of c.text.split(re)) { if (!part) continue; if (re.test(part)) { const kk = key(); b.markDefs.push({ _type: "link", _key: kk, href: part.includes("@") ? `mailto:${part}` : "tel:+14752276896" }); out.push({ ...c, _key: key(), text: part, marks: [...c.marks, kk] }); } else out.push({ ...c, _key: key(), text: part }); } } b.children = out; } };
for (const p of pages) for (const s of p.sections) for (const a of s.atoms) { if (a._type === "rt") linkify(a.body); if (a._type === "list") a.items.forEach((i) => linkify(i.body)); if (a._type === "faq") a.items.forEach((i) => linkify(i.answer)); }
// "#services" jumps: the first section whose heading mentions services gets that anchor
for (const p of pages) if (JSON.stringify(p.sections).includes('"href":"#services"')) { const s = p.sections.find((x) => x.atoms.some((a) => a._type === "hdg" && /services/i.test(a.text) && a.level > 1)); if (s) s.anchor = "services"; }
// One H1 per page: later H1s (ad pages) become H2s.
for (const p of pages) { let seen = false; for (const s of p.sections) for (const a of s.atoms) if (a._type === "hdg" && a.level === 1) { if (seen) a.level = 2; seen = true; } }
// Page photos and 1200x630 share images made from them
const OG = path.join(ROOT, "public/og"); fs.mkdirSync(OG, { recursive: true });
for (const p of pages) {
  p.heroImage = /^\/(thank-you|optin-thank-you|privacy-policy|terms-and-conditions)/.test(p.path) || p.kind === "archive" ? null : heroFor(p);
  if (p.kind === "post" && !p.featuredImage) p.featuredImage = p.heroImage;
  if (!p.heroImage) { p.seo.ogImage = "/og/home.jpg"; continue; }
  const name = (p.path === "/" ? "home" : p.path.replace(/^\/|\/$/g, "").replace(/\//g, "-")) + ".jpg";
  const out = path.join(OG, name);
  if (!fs.existsSync(out)) execFileSync("convert", [path.join(ROOT, "public", p.heroImage.src), "-resize", "1200x630^", "-gravity", "center", "-extent", "1200x630", "-quality", "82", "-strip", out]);
  p.seo.ogImage = `/og/${name}`;
}
for (const p of pages) fixAlts(p);
// Button popups -> form keys (resolved per button for the renderer)
for (const p of pages) for (const s of p.sections) for (const a of s.atoms) if (a._type === "btn" && a.popup) { a.formKey = popupForm[a.popup]?.formKey || "377:d854bea"; delete a.popup; }

const site = {
  headerNav: navOf(header),
  headerCta: headerCta ? { label: headerCta.label, formKey: headerCta.popup ? popupForm[headerCta.popup]?.formKey : undefined } : null,
  footerNav,
  footerText,
  popupHeading: popupForm["377"]?.heading || "Get A Free Quote",
  forms: Object.values(forms).filter((f) => f.formKey && !f.formKey.startsWith("undefined")),
  businessSchema: settingsDoc.businessSchema || null,
};

const outFile = path.join(ROOT, "content/legacy/site.data.ts");
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `/* Generated by scripts/migrate/import-live.mjs from the live site's content (${new Date().toISOString().slice(0, 10)}). Do not edit by hand: edit in Sanity. */\nexport const legacyPages = ${JSON.stringify(pages)} as const;\nexport const legacySite = ${JSON.stringify(site)} as const;\n`);
console.log(`pages: ${pages.length}, sections: ${pages.reduce((a, p) => a + p.sections.length, 0)}, images copied: ${copied.size}, forms: ${site.forms.length}`);
