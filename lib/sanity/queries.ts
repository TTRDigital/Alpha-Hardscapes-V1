/**
 * GROQ projections. Every image is projected to the Img shape in lib/types.ts
 * ({src, alt, width, height}) so components do not care where it came from.
 */
const IMG = `{
  "src": asset->url,
  "alt": coalesce(alt, asset->altText, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  caption,
  "hotspot": hotspot{x, y}
}`;

/** Inline images inside rich text are also resolved to URLs. */
const RICH = `[]{
  ...,
  _type == "photo" => ${IMG.replace("{", '{ "_type": "photo", "_key": _key,')}
}`;

const SEO = `seo{title, description, "image": image${IMG}, noIndex}`;
const FEATURE = `{title, text, icon}`;
const FAQ_ITEM = `{question, answer}`;

export const SERVICE_SUMMARY = `{
  _id, title, shortTitle, "slug": slug.current, category, excerpt, featured, order,
  "heroImage": heroImage${IMG}
}`;

export const PROJECT_SUMMARY = `{
  _id, title, "slug": slug.current, town, summary, featured, order,
  "coverImage": coverImage${IMG},
  "services": services[]->{title, "slug": slug.current, category}
}`;

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  businessName, legalName, tagline, description, foundedYear, yearsExperience, licenseText, serviceAreaSummary,
  "logo": logo{"src": asset->url, "alt": "Alpha Hardscapes", "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height},
  "logoLight": logoLight{"src": asset->url, "alt": "Alpha Hardscapes", "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height},
  phone, phoneE164, email, address, hours[]{days, hours}, facebook, instagram, googleBusinessUrl, googleReviewUrl, googleRating, googleReviewCount,
  headerLinks[]{label, href}, footerLinks[]{label, href},
  ctaPrimary, ctaSecondary, ctaBandTitle, ctaBandText, formThankYouPath, announcement, announcementHref,
  ${SEO}
}`;

export const HOME_QUERY = `*[_type == "homePage"][0]{
  eyebrow, heading, subheading, heroVideoUrl, reelVideoUrl, reelPosterUrl, trustPoints, stats[]{value, label},
  "heroImage": heroImage${IMG},
  servicesHeading, servicesText, "featuredServices": featuredServices[]->${SERVICE_SUMMARY},
  projectsHeading, projectsText, "featuredProjects": featuredProjects[]->${PROJECT_SUMMARY},
  aboutHeading, aboutText, "aboutImage": aboutImage${IMG},
  whyHeading, whyItems[]${FEATURE}, processHeading, processText, processSteps[]${FEATURE},
  reviewsHeading, areasHeading, areasText, faqHeading, ${SEO}
}`;

export const ABOUT_QUERY = `*[_type == "aboutPage"][0]{
  heading, intro, "heroImage": heroImage${IMG}, founderName, founderTitle, "founderBio": founderBio${RICH},
  "founderImage": founderImage${IMG}, values[]${FEATURE}, "body": body${RICH}, ${SEO}
}`;

export const SERVICES_QUERY = `*[_type == "service" && defined(slug.current)] | order(order asc, title asc) ${SERVICE_SUMMARY}`;

export const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  ...${SERVICE_SUMMARY},
  eyebrow, heading, intro, highlights[]${FEATURE}, "body": body${RICH}, "gallery": gallery[]${IMG},
  faqs[]${FAQ_ITEM}, materials, startingNote,
  "relatedServices": relatedServices[]->${SERVICE_SUMMARY}, ${SEO}
}`;

export const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)] | order(order asc, completedAt desc) ${PROJECT_SUMMARY}`;

export const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  ...${PROJECT_SUMMARY},
  "body": body${RICH}, "images": images[]${IMG}, "beforeImage": beforeImage${IMG}, "afterImage": afterImage${IMG},
  materials, completedAt, ${SEO}
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc, date desc){
  _id, name, quote, rating, source, sourceUrl, town, date, featured, order,
  "service": service->{title, "slug": slug.current},
  "avatar": avatar{"src": asset->url, "alt": name, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}
}`;

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc){_id, question, answer, category, showOnHome, order}`;

export const AREA_SUMMARY = `{
  _id, name, "slug": slug.current, kind, intro, order,
  "county": county->{name, "slug": slug.current},
  "image": image${IMG}
}`;

export const AREAS_QUERY = `*[_type == "serviceArea" && defined(slug.current)] | order(kind asc, order asc, name asc) ${AREA_SUMMARY}`;

export const AREA_QUERY = `*[_type == "serviceArea" && slug.current == $slug][0]{
  ...${AREA_SUMMARY},
  heading, "body": body${RICH}, highlights[]${FEATURE}, towns, neighborhoods, mapQuery,
  "projects": projects[]->${PROJECT_SUMMARY}, faqs[]${FAQ_ITEM}, ${SEO}
}`;

export const POST_SUMMARY = `{
  _id, title, "slug": slug.current, publishedAt, updatedAt, author, excerpt,
  "featuredImage": featuredImage${IMG}
}`;

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) ${POST_SUMMARY}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...${POST_SUMMARY},
  "body": body${RICH}, "relatedService": relatedService->${SERVICE_SUMMARY}, faqs[]${FAQ_ITEM}, ${SEO}
}`;

export const PAGES_QUERY = `*[_type == "page" && defined(slug.current)]{_id, title, "slug": slug.current, intro, ${SEO}}`;
export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{_id, title, "slug": slug.current, intro, "body": body${RICH}, ${SEO}}`;
