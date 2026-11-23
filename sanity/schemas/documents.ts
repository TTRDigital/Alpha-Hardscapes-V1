import { defineArrayMember, defineField, defineType } from "sanity";
import { sectionsField } from "./blocks";

const pathField = defineField({
  name: "path",
  title: "Address",
  type: "string",
  description: "The page's address, e.g. /masonry/. Lowercase, starts and ends with a slash. Changing it breaks links and search rankings: ask TTR first.",
  validation: (r) => r.required().regex(/^\/([a-z0-9-]+\/)*$/, { name: "lowercase address with slashes" }),
});

const heroField = defineField({ name: "heroImage", title: "Main photo", type: "photo", description: "Large photo at the top of the page. A real project photo." });

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }, { name: "seo", title: "SEO" }],
  fields: [
    defineField({ name: "title", title: "Page name", type: "string", group: "content", validation: (r) => r.required() }),
    { ...pathField, group: "content" },
    { ...heroField, group: "content" },
    { ...sectionsField, group: "content" },
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Address", name: "path", by: [{ field: "path", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "path", media: "heroImage" } },
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }, { name: "seo", title: "SEO" }],
  fields: [
    defineField({ name: "title", title: "Title (main heading)", type: "string", group: "content", validation: (r) => r.required() }),
    { ...pathField, group: "content", description: "e.g. /blog/my-post/ (older posts live under /uncategorized/)." },
    defineField({ name: "date", title: "Published", type: "datetime", group: "content", validation: (r) => r.required() }),
    defineField({ name: "modified", title: "Last updated", type: "datetime", group: "content" }),
    defineField({ name: "author", type: "string", group: "content", initialValue: "Sebastian Ullrich" }),
    defineField({ name: "authorSlug", title: "Author page", type: "string", group: "content", initialValue: "sebastian", description: "Author page address part: sebastian → /author/sebastian/" }),
    defineField({ name: "categories", type: "array", group: "content", of: [defineArrayMember({ type: "string" })], options: { list: ["blog", "uncategorized"] }, initialValue: ["blog"] }),
    defineField({ name: "excerpt", title: "Summary (for the blog list)", type: "text", rows: 3, group: "content" }),
    { ...heroField, name: "featuredImage", title: "Featured photo", group: "content" },
    { ...sectionsField, group: "content", description: "The post's text. Use Text blocks with Heading 2 and 3 for sub-headings." },
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "path", media: "featuredImage" } },
});

export const archive = defineType({
  name: "archive",
  title: "Blog list page",
  type: "document",
  description: "The blog index, category pages and author pages. The post list fills in by itself.",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    pathField,
    defineField({ name: "archive", title: "Kind", type: "string", options: { list: ["blog", "category", "author"] }, validation: (r) => r.required() }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "category", title: "Category (category pages)", type: "string" }),
    defineField({ name: "author", title: "Author name (author pages)", type: "string" }),
    defineField({ name: "authorSlug", title: "Author (author pages)", type: "string" }),
    sectionsField,
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "path" } },
});
