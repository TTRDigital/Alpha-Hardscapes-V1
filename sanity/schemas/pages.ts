import { defineArrayMember, defineField, defineType } from "sanity";

/** Home page (singleton). */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", group: "hero", description: "Small line above the headline, e.g. 'Cheshire, CT hardscape & masonry'" }),
    defineField({ name: "heading", title: "Headline", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "subheading", title: "Supporting text", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Hero photo", type: "photo", group: "hero" }),
    defineField({ name: "heroVideoUrl", title: "Hero background video (MP4)", type: "string", group: "hero", description: "Plays silently behind the headline on all screens. The hero photo is shown until it loads. Path like /images/brand/hero.mp4 or a full URL." }),
    defineField({ name: "reelVideoUrl", title: "'Why us' video (vertical MP4, optional)", type: "string", group: "sections", description: "Shown next to the 'Why us' section with play controls. Leave empty to show the About photo instead." }),
    defineField({ name: "reelPosterUrl", title: "'Why us' video cover image path", type: "string", group: "sections" }),
    defineField({ name: "trustPoints", title: "Trust points under the headline", type: "array", of: [{ type: "string" }], group: "hero", description: "Three short items, e.g. 'Free on-site estimates'" }),
    defineField({ name: "stats", title: "Numbers", type: "array", group: "hero", of: [defineArrayMember({ type: "object", name: "stat", fields: [defineField({ name: "value", title: "Value", type: "string" }), defineField({ name: "label", title: "Label", type: "string" })], preview: { select: { title: "value", subtitle: "label" } } })] }),

    defineField({ name: "servicesHeading", title: "Services heading", type: "string", group: "sections" }),
    defineField({ name: "servicesText", title: "Services text", type: "text", rows: 2, group: "sections" }),
    defineField({ name: "featuredServices", title: "Featured services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], group: "sections" }),
    defineField({ name: "projectsHeading", title: "Projects heading", type: "string", group: "sections" }),
    defineField({ name: "projectsText", title: "Projects text", type: "text", rows: 2, group: "sections" }),
    defineField({ name: "featuredProjects", title: "Featured projects", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })], group: "sections" }),
    defineField({ name: "aboutHeading", title: "About heading", type: "string", group: "sections" }),
    defineField({ name: "aboutText", title: "About text", type: "text", rows: 5, group: "sections" }),
    defineField({ name: "aboutImage", title: "About photo", type: "photo", group: "sections" }),
    defineField({ name: "whyHeading", title: "'Why us' heading", type: "string", group: "sections" }),
    defineField({ name: "whyItems", title: "'Why us' items", type: "array", of: [{ type: "feature" }], group: "sections" }),
    defineField({ name: "processHeading", title: "Process heading", type: "string", group: "sections" }),
    defineField({ name: "processText", title: "Process text", type: "text", rows: 2, group: "sections" }),
    defineField({ name: "processSteps", title: "Process steps", type: "array", of: [{ type: "feature" }], group: "sections" }),
    defineField({ name: "reviewsHeading", title: "Reviews heading", type: "string", group: "sections" }),
    defineField({ name: "areasHeading", title: "Service area heading", type: "string", group: "sections" }),
    defineField({ name: "areasText", title: "Service area text", type: "text", rows: 3, group: "sections" }),
    defineField({ name: "faqHeading", title: "FAQ heading", type: "string", group: "sections" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

/** About page (singleton). */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({ name: "heroImage", title: "Photo", type: "photo" }),
    defineField({ name: "founderName", title: "Founder name", type: "string" }),
    defineField({ name: "founderTitle", title: "Founder title", type: "string" }),
    defineField({ name: "founderBio", title: "Founder bio", type: "richText" }),
    defineField({ name: "founderImage", title: "Founder photo", type: "photo" }),
    defineField({ name: "values", title: "What we stand for", type: "array", of: [{ type: "feature" }] }),
    defineField({ name: "body", title: "More text", type: "richText" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});

/** Simple editable page (privacy policy, terms, thank-you...). */
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: (r) => r.required(), description: "The page lives at /<slug>/" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Text", type: "richText" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
