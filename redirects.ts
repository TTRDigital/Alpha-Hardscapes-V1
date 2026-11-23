/**
 * 301 redirects from the old site's addresses to the new structure, so search
 * rankings and existing links carry over. Next.js applies them at the edge.
 */
type R = { source: string; destination: string; permanent: boolean };
const r = (source: string, destination: string): R => ({ source, destination, permanent: true });

const SERVICES: Record<string, string> = {
  "/walkway-patio-connecticut": "paver-patios-walkways",
  "/masonry/walkway-patio-masonry": "paver-patios-walkways",
  "/masonry/walkway-patio-masonry-optin": "paver-patios-walkways",
  "/retaining-walls-connecticut": "retaining-walls",
  "/stone": "retaining-walls",
  "/wall-block": "retaining-walls",
  "/masonry/retaining-walls": "retaining-walls",
  "/masonry/retaining-walls/stone": "retaining-walls",
  "/masonry/retaining-walls/stone-3": "retaining-walls",
  "/masonry/retaining-walls/wall-block": "retaining-walls",
  "/masonry/retaining-walls/wall-block-2": "retaining-walls",
  "/stone-steps-connecticut": "stone-steps",
  "/outdoor-kitchens-connecticut": "outdoor-kitchens",
  "/fire-features-connecticut": "fire-pits-fireplaces",
  "/pool-builders-south-connecticut": "pool-patios",
  "/deck-builders-connecticut": "decks",
  "/outdoor-living-packages-connecticut": "outdoor-living-packages",
  "/chimney-installation-and-repair-connecticut": "chimneys",
  "/thinstone-connecticut": "stone-veneer",
  "/repairs-maintenance-connecticut": "paver-repair-maintenance",
  "/masonry/repairs-maintenance": "paver-repair-maintenance",
  "/landscaping": "landscaping",
  "/seasonal-clean-up": "seasonal-cleanup",
  "/seasonal-clean-up/snow-removal": "seasonal-cleanup",
  "/seasonal-clean-up/leaf-removal": "seasonal-cleanup",
};

const AREAS: Record<string, string> = {
  "/new-haven-county-ct": "new-haven-county",
  "/hartford-county-ct": "hartford-county",
  "/fairfield-county-ct": "fairfield-county",
  "/service-areas/new-haven-county-ct": "new-haven-county",
  "/service-areas/hartford-county-ct": "hartford-county",
  "/service-areas/fairfield-county-ct": "fairfield-county",
  "/avon": "avon",
  "/berlin": "berlin",
  "/farmington": "farmington",
  "/glastonbury": "glastonbury",
  "/southington": "southington",
  "/uncategorized/west-hartford": "west-hartford",
  "/service-areas/hartford-county-ct/avon": "avon",
  "/service-areas/hartford-county-ct/berlin": "berlin",
  "/service-areas/hartford-county-ct/farmington": "farmington",
  "/service-areas/hartford-county-ct/glastonbury": "glastonbury",
  "/service-areas/hartford-county-ct/southington": "southington",
  "/service-areas/hartford-county-ct/west-hartford": "west-hartford",
};

export const redirects: R[] = [
  ...Object.entries(SERVICES).map(([from, slug]) => r(from, `/services/${slug}/`)),
  ...Object.entries(AREAS).map(([from, slug]) => r(from, `/service-areas/${slug}/`)),
  r("/masonry", "/services/"),
  r("/gallery", "/projects/"),
  r("/about-us", "/about/"),
  r("/frequently-asked-questions", "/faq/"),
  r("/faq-2", "/faq/"),
  r("/locations", "/service-areas/"),
  r("/terms-and-conditions", "/terms/"),
  r("/contact-us", "/contact/"),
  r("/category/blog", "/blog/"),
  r("/category/uncategorized", "/blog/"),
  r("/author/:slug", "/blog/"),
  r("/uncategorized/:slug", "/blog/:slug/"),
  r("/feed", "/blog/"),
  r("/home-draft", "/"),
  r("/landing-page", "/contact/"),
  // Thank-you pages from the old forms
  r("/thank-you-:rest", "/thank-you/"),
  r("/optin-thank-you", "/thank-you/"),
  r("/thank-you-lp", "/thank-you/"),
  // Google Ads landing pages. NOTE: live ads may point here; see docs/deploy-and-rebuild.md before launch.
  r("/1000-off", "/contact/"),
  r("/1000-off-copy", "/contact/"),
  r("/20pct-off", "/contact/"),
  r("/20-off-patios-walkways", "/contact/"),
  r("/optin", "/contact/"),
  r("/patios-walkways", "/services/paver-patios-walkways/"),
  // CMS moved from /cms to /studio
  r("/cms", "/studio/"),
  r("/cms/:path*", "/studio/:path*"),
];
