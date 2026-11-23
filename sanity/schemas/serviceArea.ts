import { defineArrayMember, defineField, defineType } from "sanity";

export const serviceArea = defineType({
  name: "serviceArea",
  title: "Service area",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required(), description: "e.g. Cheshire or New Haven County" }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "name", maxLength: 60 }, validation: (r) => r.required(), description: "The page lives at /service-areas/<slug>/" }),
    defineField({ name: "kind", title: "Type", type: "string", options: { list: [{ title: "County", value: "county" }, { title: "Town", value: "town" }], layout: "radio" }, initialValue: "town" }),
    defineField({ name: "county", title: "County (for towns)", type: "reference", to: [{ type: "serviceArea" }], options: { filter: 'kind == "county"' } }),
    defineField({ name: "heading", title: "Page heading (H1)", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({ name: "body", title: "Main text", type: "richText" }),
    defineField({ name: "highlights", title: "Why homeowners here choose us", type: "array", of: [{ type: "feature" }] }),
    defineField({ name: "towns", title: "Towns served (counties only)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "neighborhoods", title: "Neighbourhoods / landmarks (towns only)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", title: "Photo", type: "photo" }),
    defineField({ name: "mapQuery", title: "Map search text", type: "string", description: "What Google Maps should show, e.g. 'Cheshire, CT'" }),
    defineField({ name: "projects", title: "Projects in this area", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })] }),
    defineField({ name: "faqs", title: "Questions & answers", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 50 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "kind", media: "image" } },
});
