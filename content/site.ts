/**
 * Built-in copy of the live site, used whenever Sanity is empty or unreachable.
 * Pages, navigation and forms come from the live site's content (generated file);
 * business facts are below. Location is town and ZIP only (never a street address).
 */
import { legacyPages, legacySite } from "./legacy/site.data.ts";
import type { Page, SiteSettings } from "@/lib/types";

export const fallbackPages = legacyPages as unknown as Page[];

export const fallbackSettings: SiteSettings = {
  businessName: "Alpha Hardscapes",
  phone: "(475) 227-6896",
  phoneE164: "+14752276896",
  email: "alphahardscapes1@gmail.com",
  locality: "New Haven",
  region: "CT",
  postalCode: "06510",
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    { days: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],
  areaServed: [
    "New Haven County, CT", "Fairfield County, CT", "Hartford County, CT", "New Haven, CT", "Hamden, CT", "North Haven, CT", "West Haven, CT",
    "Cheshire, CT", "Wallingford, CT", "Branford, CT", "Guilford, CT", "Madison, CT", "Milford, CT", "Orange, CT", "Woodbridge, CT", "Shelton, CT",
    "Trumbull, CT", "Fairfield, CT", "Stratford, CT", "Avon, CT", "Berlin, CT", "Farmington, CT", "Glastonbury, CT", "Southington, CT", "West Hartford, CT",
  ],
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/AlphaHardscapes" },
    { label: "Instagram", href: "https://www.instagram.com/alphahardscapes/" },
  ],
  headerNav: legacySite.headerNav as unknown as SiteSettings["headerNav"],
  headerCta: { label: legacySite.headerCta?.label || "Book Your Quote", formKey: legacySite.headerCta?.formKey },
  footerNav: legacySite.footerNav as unknown as SiteSettings["footerNav"],
  popupHeading: legacySite.popupHeading,
  forms: legacySite.forms as unknown as SiteSettings["forms"],
  heroVideoUrl: "/images/brand/hero.mp4",
  heroPoster: { src: "/images/brand/hero-poster.webp", alt: "", width: 1094, height: 720 },
  logo: { src: "/images/brand/logo.webp", alt: "Alpha Hardscapes", width: 420, height: 59 },
  logoLight: { src: "/images/brand/logo-light.webp", alt: "Alpha Hardscapes", width: 420, height: 56 },
  defaultOgImage: "/og/home.jpg",
  authors: [
    {
      slug: "sebastian",
      name: "Sebastian Ullrich",
      role: "Founder & Hardscaping Specialist at Alpha Hardscapes",
      bio: "Sebastian Ullrich is the Founder and Hardscaping Specialist at Alpha Hardscapes, a hardscaping and outdoor living company serving Fairfield County, New Haven County, and the surrounding Southern Connecticut region. Based in Hamden, CT, and a graduate of Southern Connecticut State University, Sebastian brings hands-on field experience to every project, from patios and walkways to retaining walls and outdoor living spaces. He focuses on durable materials suited to New England's freeze-thaw climate, clean installation practices, and designs built to hold up season after season.",
    },
  ],
};
