import { defineArrayMember, defineField, defineType } from "sanity";

export const SERVICE_CATEGORIES = [
  { title: "Hardscaping", value: "hardscaping" },
  { title: "Masonry", value: "masonry" },
  { title: "Outdoor living", value: "outdoor-living" },
  { title: "Landscaping", value: "landscaping" },
  { title: "Maintenance & seasonal", value: "maintenance" },
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "shortTitle", title: "Short title (menus)", type: "string", group: "content" }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      description: "The page lives at /services/<slug>/",
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string", group: "content", options: { list: SERVICE_CATEGORIES, layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Summary", type: "text", rows: 3, group: "content", description: "One or two sentences shown on cards and in search results.", validation: (r) => r.required().max(240) }),
    defineField({ name: "heroImage", title: "Hero photo", type: "photo", group: "content" }),
    defineField({ name: "eyebrow", title: "Eyebrow (small label above the heading)", type: "string", group: "content" }),
    defineField({ name: "heading", title: "Page heading (H1)", type: "string", group: "content", description: "Leave empty to use the title." }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 4, group: "content" }),
    defineField({ name: "highlights", title: "Highlights (3 to 6)", type: "array", of: [{ type: "feature" }], group: "content" }),
    defineField({ name: "body", title: "Main text", type: "richText", group: "content" }),
    defineField({ name: "gallery", title: "Photos", type: "array", of: [{ type: "photo" }], group: "content" }),
    defineField({ name: "faqs", title: "Questions & answers", type: "array", of: [{ type: "faqItem" }], group: "content" }),

    defineField({ name: "materials", title: "Materials & options", type: "array", of: [{ type: "string" }], group: "details", description: "e.g. Techo-Bloc pavers, Bluestone, Fieldstone" }),
    defineField({ name: "startingNote", title: "Investment note (optional)", type: "string", group: "details", description: "e.g. 'Most patios start around $X' - leave empty to hide." }),
    defineField({ name: "relatedServices", title: "Related services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], group: "details" }),
    defineField({ name: "featured", title: "Feature on the home page", type: "boolean", initialValue: false, group: "details" }),
    defineField({ name: "order", title: "Sort order", type: "number", group: "details", initialValue: 50 }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "heroImage" } },
});
