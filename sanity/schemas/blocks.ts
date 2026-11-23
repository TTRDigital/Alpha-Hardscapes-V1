import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Page building blocks. A page is a list of sections; each section is a list of
 * these blocks, shown in order. They mirror the widgets of the live site, so every
 * heading, paragraph, list, FAQ and button was carried over word for word.
 */

const formKeyField = defineField({
  name: "formKey",
  title: "Form",
  type: "string",
  description: "Which form opens (the list is in Site settings > Forms, e.g. 4206:d854bea for Walkway Patio).",
});

export const hdg = defineType({
  name: "hdg",
  title: "Heading",
  type: "object",
  fields: [
    defineField({ name: "text", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "level", title: "Level", type: "number", description: "1 = the page's main heading (one per page). 2 = section heading, 3 and 4 = smaller.", options: { list: [1, 2, 3, 4, 5, 6] }, initialValue: 2, validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link (optional)", type: "string" }),
  ],
  preview: { select: { title: "text", level: "level" }, prepare: ({ title, level }) => ({ title, subtitle: `Heading ${level}` }) },
});

export const rt = defineType({
  name: "rt",
  title: "Text",
  type: "object",
  fields: [defineField({ name: "body", title: "Text", type: "richText" })],
  preview: { select: { body: "body" }, prepare: ({ body }) => ({ title: plain(body) || "Text", subtitle: "Text" }) },
});

export const btn = defineType({
  name: "btn",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", description: "Leave empty when the button opens a form." }),
    formKeyField,
  ],
  preview: { select: { title: "label", href: "href", formKey: "formKey" }, prepare: ({ title, href, formKey }) => ({ title, subtitle: `Button → ${href || `form ${formKey}`}` }) },
});

export const box = defineType({
  name: "box",
  title: "Feature box",
  type: "object",
  fields: [defineField({ name: "title", type: "string" }), defineField({ name: "text", type: "text", rows: 4 }), defineField({ name: "body", title: "More text (optional, e.g. a bullet list)", type: "richText" }), defineField({ name: "href", title: "Link (optional)", type: "string" })],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const list = defineType({
  name: "list",
  title: "Check list",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "object", name: "listItem", fields: [defineField({ name: "body", title: "Text", type: "richText" }), defineField({ name: "href", title: "Link (optional)", type: "string" })], preview: { select: { body: "body" }, prepare: ({ body }) => ({ title: plain(body) }) } })],
    }),
  ],
  preview: { select: { items: "items" }, prepare: ({ items }) => ({ title: `${items?.length || 0} items`, subtitle: "Check list" }) },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [defineArrayMember({ type: "object", name: "faqItem", fields: [defineField({ name: "question", type: "string", validation: (r) => r.required() }), defineField({ name: "answer", type: "richText" })], preview: { select: { title: "question" } } })],
    }),
  ],
  preview: { select: { items: "items" }, prepare: ({ items }) => ({ title: `${items?.length || 0} questions`, subtitle: "FAQ" }) },
});

export const reviews = defineType({
  name: "reviews",
  title: "Reviews",
  type: "object",
  description: "Shown as text only (no stars).",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "object", name: "review", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "meta", title: "Detail (optional)", type: "string" }), defineField({ name: "text", type: "text", rows: 5, validation: (r) => r.required() }), defineField({ name: "href", title: "Link (optional)", type: "url" })], preview: { select: { title: "name", subtitle: "text" } } })],
    }),
  ],
  preview: { select: { items: "items" }, prepare: ({ items }) => ({ title: `${items?.length || 0} reviews`, subtitle: "Reviews" }) },
});

export const img = defineType({
  name: "img",
  title: "Photo",
  type: "object",
  fields: [defineField({ name: "image", title: "Photo", type: "photo", validation: (r) => r.required() }), defineField({ name: "caption", type: "string" })],
  preview: { select: { media: "image", title: "image.alt" }, prepare: ({ media, title }) => ({ media, title: title || "Photo" }) },
});

export const gallery = defineType({
  name: "gallery",
  title: "Photo gallery",
  type: "object",
  fields: [defineField({ name: "images", title: "Photos", type: "array", of: [defineArrayMember({ type: "photo" })], options: { layout: "grid" } }), defineField({ name: "large", title: "Large grid (gallery page)", type: "boolean" })],
  preview: { select: { images: "images", media: "images.0" }, prepare: ({ images, media }) => ({ title: `${images?.length || 0} photos`, subtitle: "Gallery", media }) },
});

export const form = defineType({
  name: "form",
  title: "Quote form",
  type: "object",
  fields: [{ ...formKeyField, validation: (r) => r.required() }],
  preview: { select: { k: "formKey" }, prepare: ({ k }) => ({ title: `Form ${k}`, subtitle: "Quote form" }) },
});

export const html = defineType({
  name: "html",
  title: "Embed (HTML)",
  type: "object",
  description: "For booking widgets and ad-page forms from GoHighLevel. Paste only code from a trusted source.",
  fields: [defineField({ name: "html", title: "HTML", type: "text", rows: 6 })],
  preview: { prepare: () => ({ title: "Embed (HTML)" }) },
});

export const map = defineType({
  name: "map",
  title: "Map",
  type: "object",
  fields: [defineField({ name: "title", type: "string" }), defineField({ name: "url", title: "Google Maps embed address", type: "url" })],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Map", subtitle: "Map" }) },
});

export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [defineField({ name: "url", title: "Video address (YouTube or an .mp4 file)", type: "string" })],
  preview: { select: { title: "url" }, prepare: ({ title }) => ({ title: title || "Video", subtitle: "Video" }) },
});

export const section = defineType({
  name: "section",
  title: "Section",
  type: "object",
  fields: [
    defineField({ name: "anchor", title: "Jump-link name (optional)", type: "string", description: "Lets a button link to this section, e.g. services for #services." }),
    defineField({
      name: "atoms",
      title: "Blocks",
      type: "array",
      of: ["hdg", "rt", "btn", "box", "list", "faq", "reviews", "img", "gallery", "form", "html", "map", "video"].map((type) => defineArrayMember({ type })),
    }),
  ],
  preview: {
    select: { a0: "atoms.0.text", a1: "atoms.1.text", n: "atoms" },
    prepare: ({ a0, a1, n }) => ({ title: a0 || a1 || "Section", subtitle: `${n?.length || 0} blocks` }),
  },
});

export const sectionsField = defineField({
  name: "sections",
  title: "Page content",
  description: "Sections from top to bottom. The first section's heading is the page's main heading (H1).",
  type: "array",
  of: [defineArrayMember({ type: "section" })],
});

function plain(body?: { children?: { text?: string }[] }[]) {
  return (body || []).map((b) => (b.children || []).map((c) => c.text || "").join("")).join(" ").slice(0, 90);
}
