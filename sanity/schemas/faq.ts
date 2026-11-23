import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["General", "Pricing & payment", "Process & timeline", "Materials", "Maintenance", "Service area"] }, initialValue: "General" }),
    defineField({ name: "showOnHome", title: "Show on the home page", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 50 }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "category" } },
});
