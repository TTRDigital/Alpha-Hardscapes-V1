import { defineArrayMember, defineField, defineType } from "sanity";

/** Image with alt text (used everywhere a photo appears). Real project photos only. */
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
      description: "Describe the photo in one sentence for screen readers and Google (e.g. 'Paver patio with seat wall in Cheshire'). Leave empty only for decorative images.",
      validation: (r) => r.max(160),
    }),
    defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
  ],
});

/** Search fields. The live site's values were carried over; keep the target search in the title. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: "title", title: "Title tag", type: "string", description: "30 to 60 characters, ending with “Alpha Hardscapes” where it fits. Keep the page's target search in it.", validation: (r) => r.max(70).warning("Google shows about 60 characters") }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, description: "110 to 160 characters naming the service and the area.", validation: (r) => r.max(170).warning("Google shows about 155 characters") }),
    defineField({ name: "ogTitle", title: "Share title (optional)", type: "string" }),
    defineField({ name: "ogDescription", title: "Share description (optional)", type: "text", rows: 2 }),
    defineField({ name: "ogImage", title: "Share image (1200x630, optional)", type: "photo" }),
    defineField({ name: "canonical", title: "Canonical URL (optional)", type: "url", description: "Leave empty: the page's own address is used." }),
    defineField({ name: "robots", title: "Robots", type: "string", description: "Leave empty for normal pages. Thank-you and ad pages use “noindex, nofollow”.", options: { list: ["noindex, nofollow"] } }),
  ],
});

const linkAnnotation = {
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    defineField({ name: "href", title: "Address", type: "string", description: "A page on this site like /masonry/, or a full https:// link.", validation: (r) => r.required() }),
    defineField({ name: "newTab", title: "Open in new tab", type: "boolean", initialValue: false }),
  ],
};

/** Rich text: paragraphs, headings, lists, bold, italic and links. */
export const richText = defineType({
  name: "richText",
  title: "Text",
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
        annotations: [linkAnnotation],
      },
    }),
  ],
});

/** Menu item (two levels of sub-items). */
export const navItem = defineType({
  name: "navItem",
  title: "Menu item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Address", type: "string", description: "e.g. /masonry/ (use # for a heading that only opens its sub-menu)", validation: (r) => r.required() }),
    defineField({
      name: "children",
      title: "Sub-items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navChild",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "Address", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "children",
              title: "Sub-items",
              type: "array",
              of: [defineArrayMember({ type: "object", name: "navGrandchild", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", title: "Address", type: "string" })] })],
            }),
          ],
        }),
      ],
    }),
  ],
});
