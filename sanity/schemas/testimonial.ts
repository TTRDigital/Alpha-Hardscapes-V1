import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "quote", title: "Review text", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Stars (1 to 5)", type: "number", initialValue: 5, validation: (r) => r.min(1).max(5) }),
    defineField({ name: "source", title: "Source", type: "string", options: { list: ["Google", "Facebook", "Houzz", "Email", "Other"] }, initialValue: "Google" }),
    defineField({ name: "sourceUrl", title: "Link to the review", type: "url" }),
    defineField({ name: "town", title: "Town", type: "string" }),
    defineField({ name: "service", title: "Service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "avatar", title: "Photo (optional)", type: "image" }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "featured", title: "Feature on the home page", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 50 }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "quote", media: "avatar" } },
});
