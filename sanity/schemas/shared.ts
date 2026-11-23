import { defineArrayMember, defineField, defineType } from "sanity";

/** Image with required alt text (used everywhere a photo appears). */
export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the photo in one sentence for screen readers and Google (e.g. 'Bluestone patio with fire pit in Cheshire').",
      validation: (r) => r.max(160),
    }),
    defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
  ],
});

/** Search-engine fields shared by every page-like document. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Title tag",
      type: "string",
      description: "50 to 60 characters. Leave empty to use the page title.",
      validation: (r) => r.max(70).warning("Google shows about 60 characters"),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "120 to 160 characters. Leave empty to use the page summary.",
      validation: (r) => r.max(170).warning("Google shows about 155 characters"),
    }),
    defineField({ name: "image", title: "Share image (1200x630)", type: "photo" }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
  ],
});

/** Rich text used in long-form content (service pages, posts, areas, legal pages). */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbers", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({ name: "href", title: "URL or path", type: "string", validation: (r) => r.required() }),
              defineField({ name: "newTab", title: "Open in new tab", type: "boolean", initialValue: false }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "photo" }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Call-out box",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
      ],
      preview: { select: { title: "title", subtitle: "text" } },
    }),
    defineArrayMember({
      type: "object",
      name: "table",
      title: "Table",
      fields: [
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "row",
              fields: [defineField({ name: "cells", title: "Cells", type: "array", of: [{ type: "string" }] })],
              preview: { select: { cells: "cells" }, prepare: ({ cells }: { cells?: string[] }) => ({ title: (cells || []).join(" | ") }) },
            }),
          ],
        }),
      ],
      preview: { prepare: () => ({ title: "Table" }) },
    }),
  ],
});

/** Question + answer pair embedded on pages (the FAQ document type is for the global FAQ page). */
export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question" } },
});

/** Short title + text pair (highlights, benefits, values, process steps). */
export const feature = defineType({
  name: "feature",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          "patio", "wall", "steps", "kitchen", "fire", "pool", "deck", "chimney", "veneer", "repair", "leaf", "snow", "plant", "design",
          "check", "shield", "clock", "star", "map", "phone", "ruler", "hammer", "truck", "leafcheck",
        ],
      },
    }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Path or URL", type: "string", description: "e.g. /services/paver-patios/ or https://...", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
