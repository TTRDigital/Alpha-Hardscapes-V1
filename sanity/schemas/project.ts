import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required(), description: "e.g. 'Bluestone patio with fire pit'" }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: "town", title: "Town", type: "string", description: "e.g. Cheshire, CT (shown on the card and used for local search)" }),
    defineField({ name: "services", title: "Services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], description: "Which services this project shows. Used for the gallery filters." }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3, description: "One or two sentences: the problem and what was built." }),
    defineField({ name: "body", title: "Story (optional)", type: "richText" }),
    defineField({ name: "coverImage", title: "Cover photo", type: "photo", validation: (r) => r.required() }),
    defineField({ name: "images", title: "More photos", type: "array", of: [{ type: "photo" }] }),
    defineField({ name: "beforeImage", title: "Before photo (optional)", type: "photo" }),
    defineField({ name: "afterImage", title: "After photo (optional)", type: "photo", description: "When both before and after are set, the page shows a slider." }),
    defineField({ name: "materials", title: "Materials used", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "completedAt", title: "Completed (month/year)", type: "date", options: { dateFormat: "MMMM YYYY" } }),
    defineField({ name: "featured", title: "Feature on the home page", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 50 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "town", media: "coverImage" } },
});
