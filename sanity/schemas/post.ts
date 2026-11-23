import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (r) => r.required(), description: "The post lives at /blog/<slug>/" }),
    defineField({ name: "publishedAt", title: "Published", type: "datetime", group: "content", validation: (r) => r.required() }),
    defineField({ name: "updatedAt", title: "Updated", type: "datetime", group: "content" }),
    defineField({ name: "author", title: "Author", type: "string", group: "content", initialValue: "Alpha Hardscapes" }),
    defineField({ name: "excerpt", title: "Summary", type: "text", rows: 3, group: "content", validation: (r) => r.max(300) }),
    defineField({ name: "featuredImage", title: "Featured photo", type: "photo", group: "content" }),
    defineField({ name: "body", title: "Text", type: "richText", group: "content" }),
    defineField({ name: "relatedService", title: "Related service", type: "reference", to: [{ type: "service" }], group: "content" }),
    defineField({ name: "faqs", title: "Questions & answers", type: "array", of: [{ type: "faqItem" }], group: "content" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "featuredImage" } },
});
