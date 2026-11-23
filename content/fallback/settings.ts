import type { SiteSettings } from "@/lib/types";

/**
 * Built-in site settings: the live-site facts (phone, email, hours, social links,
 * service areas). Edited in Sanity > Site settings once the CMS is connected.
 */
export const settings: SiteSettings = {
  businessName: "Alpha Hardscapes",
  legalName: "Alpha Hardscapes LLC",
  tagline: "Paver patios, walkways, retaining walls and outdoor living, built to last in Connecticut.",
  description:
    "Alpha Hardscapes is a hardscaping, paver and masonry contractor based in Cheshire, Connecticut. We design and build patios, walkways, retaining walls, stone steps, outdoor kitchens, fire features and pool surrounds for homeowners across New Haven, Hartford and Fairfield Counties.",
  logo: { src: "/images/brand/logo.png", alt: "Alpha Hardscapes", width: 552, height: 78 },
  logoLight: { src: "/images/brand/logo-light.png", alt: "Alpha Hardscapes", width: 622, height: 83 },
  yearsExperience: 20,
  // Connecticut requires the Home Improvement Contractor registration number on advertising.
  // Add it here (Sanity > Site settings) as soon as the client provides it, e.g. "Fully insured · CT HIC #0000000".
  licenseText: "Fully insured",
  serviceAreaSummary: "New Haven, Hartford & Fairfield Counties, CT",
  phone: "(475) 227-6896",
  phoneE164: "+14752276896",
  email: "alphahardscapes1@gmail.com",
  address: { street: "1813 Peck Ln", city: "Cheshire", state: "CT", zip: "06410", showStreet: false },
  hours: [
    { days: "Monday to Friday", hours: "8:00 AM to 5:00 PM" },
    { days: "Saturday", hours: "9:00 AM to 1:00 PM" },
    { days: "Sunday", hours: "Closed" },
  ],
  facebook: "https://www.facebook.com/AlphaHardscapes",
  instagram: "https://www.instagram.com/alphahardscapes/",
  googleBusinessUrl: "https://maps.app.goo.gl/FgHxbjYRenueVuuf7",
  googleReviewUrl: "https://maps.app.goo.gl/pLz1Aie8pkVUstaf7",
  googleRating: 5,
  googleReviewCount: undefined,
  headerLinks: [
    { label: "Services", href: "/services/" },
    { label: "Projects", href: "/projects/" },
    { label: "About", href: "/about/" },
    { label: "Reviews", href: "/reviews/" },
    { label: "Contact", href: "/contact/" },
  ],
  footerLinks: [
    { label: "About", href: "/about/" },
    { label: "Projects", href: "/projects/" },
    { label: "Reviews", href: "/reviews/" },
    { label: "Service Areas", href: "/service-areas/" },
    { label: "FAQ", href: "/faq/" },
    { label: "Blog", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
  ],
  ctaPrimary: "Get a Free Estimate",
  ctaSecondary: "Call",
  ctaBandTitle: "Ready to transform your outdoor space?",
  ctaBandText:
    "Tell us about your patio, walkway, wall or outdoor living project. We will visit the site, talk through materials and send a clear written estimate, free of charge.",
  formThankYouPath: "/thank-you/",
  seo: {
    title: "Hardscaping & Masonry Contractor, Cheshire CT | Alpha Hardscapes",
    description: "Paver patios, walkways, retaining walls, stone steps, outdoor kitchens and fire pits across New Haven, Hartford and Fairfield Counties, CT. Free estimates.",
  },
};
