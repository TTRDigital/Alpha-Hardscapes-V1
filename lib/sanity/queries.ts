/** GROQ queries. Images are projected to the Img shape the components use. */
const IMG = `{"src": asset->url, "alt": coalesce(alt, ""), "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, hotspot, caption}`;

const SECTIONS = `sections[]{_key, atoms[]{..., _type == "img" => {"image": image${IMG}}, _type == "gallery" => {"images": images[]${IMG}}}}`;

const SEO = `"seo": {"title": seo.title, "description": seo.description, "canonical": seo.canonical, "robots": seo.robots, "ogTitle": seo.ogTitle, "ogDescription": seo.ogDescription, "ogImage": seo.ogImage.asset->url}`;

export const PAGE_FIELDS = `_id, "kind": select(_type == "archive" => "archive", _type), title, path, ${SEO}, "heroImage": heroImage${IMG}, "featuredImage": featuredImage${IMG}, date, modified, author, authorSlug, categories, excerpt, archive, heading, category, ${SECTIONS}`;

export const PAGE_QUERY = `*[_type in ["page", "post", "archive"] && path == $path] | order(_updatedAt desc)[0]{${PAGE_FIELDS}}`;

/** Light list of every page (for routing, the sitemap and blog lists). */
export const ALL_PAGES_QUERY = `*[_type in ["page", "post", "archive"] && defined(path)]{_id, "kind": select(_type == "archive" => "archive", _type), title, path, "seo": {"robots": seo.robots}, date, modified, author, authorSlug, categories, excerpt, "featuredImage": featuredImage${IMG}, "heroImage": heroImage${IMG}}`;

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  businessName, phone, phoneE164, email, locality, region, postalCode, hours[]{days, opens, closes}, areaServed, socials[]{label, href},
  headerNav[]{label, href, children[]{label, href, children[]{label, href}}}, headerCta, footerNav[]{label, href, children[]{label, href}},
  popupHeading, forms[]{formKey, name, redirect, tag, button, fields[]{id, type, label, placeholder, required, options, text}},
  "heroVideoUrl": heroVideo.asset->url, "heroPoster": heroPoster${IMG}, "logo": logo${IMG}, "logoLight": logoLight${IMG}, "defaultOgImage": defaultOgImage.asset->url, authors[]{slug, name, role, bio}
}`;
