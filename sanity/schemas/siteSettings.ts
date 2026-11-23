import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "contact", title: "Contact & hours" },
    { name: "nav", title: "Navigation" },
    { name: "cta", title: "Calls to action" },
    { name: "seo", title: "SEO defaults" },
  ],
  fields: [
    defineField({ name: "businessName", title: "Business name", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({ name: "legalName", title: "Legal name", type: "string", group: "business", description: "e.g. Alpha Hardscapes LLC" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "business" }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 3, group: "business", description: "One or two sentences used in the footer and search listings." }),
    defineField({ name: "logo", title: "Logo (dark on light)", type: "image", group: "business" }),
    defineField({ name: "logoLight", title: "Logo (light on dark)", type: "image", group: "business" }),
    defineField({ name: "foundedYear", title: "In business since (year)", type: "number", group: "business" }),
    defineField({ name: "yearsExperience", title: "Years of experience (shown as a number)", type: "number", group: "business" }),
    defineField({ name: "licenseText", title: "Licence / insurance line", type: "string", group: "business", description: "Shown in the footer and trust bar, e.g. 'Fully insured. CT HIC #0000000'." }),
    defineField({ name: "serviceAreaSummary", title: "Service area (one line)", type: "string", group: "business", description: "e.g. New Haven, Hartford & Fairfield Counties, CT" }),

    defineField({ name: "phone", title: "Phone (display)", type: "string", group: "contact", description: "As shown, e.g. (475) 227-6896" }),
    defineField({ name: "phoneE164", title: "Phone (for links)", type: "string", group: "contact", description: "Digits only with country code, e.g. +14752276896" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State", type: "string" }),
        defineField({ name: "zip", title: "ZIP", type: "string" }),
        defineField({ name: "showStreet", title: "Show street address on the site", type: "boolean", initialValue: false }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "hoursRow",
          fields: [
            defineField({ name: "days", title: "Days", type: "string", description: "e.g. Monday to Friday" }),
            defineField({ name: "hours", title: "Hours", type: "string", description: "e.g. 8:00 AM to 5:00 PM, or Closed" }),
          ],
          preview: { select: { title: "days", subtitle: "hours" } },
        }),
      ],
    }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url", group: "contact" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "contact" }),
    defineField({ name: "googleBusinessUrl", title: "Google Business Profile URL", type: "url", group: "contact" }),
    defineField({ name: "googleReviewUrl", title: "'Write a review' URL", type: "url", group: "contact" }),
    defineField({ name: "googleRating", title: "Google rating (e.g. 5.0)", type: "number", group: "contact" }),
    defineField({ name: "googleReviewCount", title: "Google review count", type: "number", group: "contact" }),

    defineField({ name: "headerLinks", title: "Header menu", type: "array", of: [{ type: "link" }], group: "nav" }),
    defineField({ name: "footerLinks", title: "Footer links", type: "array", of: [{ type: "link" }], group: "nav" }),

    defineField({ name: "ctaPrimary", title: "Main button text", type: "string", group: "cta", initialValue: "Get a Free Estimate" }),
    defineField({ name: "ctaSecondary", title: "Phone button text", type: "string", group: "cta", initialValue: "Call" }),
    defineField({ name: "ctaBandTitle", title: "Bottom call-to-action title", type: "string", group: "cta" }),
    defineField({ name: "ctaBandText", title: "Bottom call-to-action text", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "formThankYouPath", title: "Thank-you page path", type: "string", group: "cta", initialValue: "/thank-you/" }),
    defineField({ name: "announcement", title: "Announcement bar (optional)", type: "string", group: "cta", description: "Short seasonal message shown above the header. Leave empty to hide." }),
    defineField({ name: "announcementHref", title: "Announcement link", type: "string", group: "cta" }),

    defineField({ name: "seo", title: "Default SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
