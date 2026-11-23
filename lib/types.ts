/**
 * Shapes the site renders. Sanity queries project into these, and the
 * built-in content in content/fallback/ is written in them directly, so
 * every page works the same with or without the CMS.
 */
import type { PortableTextBlock } from "@portabletext/react";

export type Img = {
  /** Local path (/images/...) or a Sanity CDN URL. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  /** Sanity image hotspot (0..1), used for object-position. */
  hotspot?: { x: number; y: number } | null;
};

export type RichText = PortableTextBlock[];

export type Seo = {
  title?: string;
  description?: string;
  image?: Img | null;
  noIndex?: boolean;
};

export type Feature = { title: string; text?: string; icon?: string };
export type FaqItem = { question: string; answer: string };
export type Link = { label: string; href: string };

export type SiteSettings = {
  businessName: string;
  legalName?: string;
  tagline?: string;
  description?: string;
  logo?: Img | null;
  logoLight?: Img | null;
  foundedYear?: number;
  yearsExperience?: number;
  licenseText?: string;
  serviceAreaSummary?: string;
  phone: string;
  phoneE164: string;
  email?: string;
  address?: { street?: string; city?: string; state?: string; zip?: string; showStreet?: boolean };
  hours?: { days: string; hours: string }[];
  facebook?: string;
  instagram?: string;
  googleBusinessUrl?: string;
  googleReviewUrl?: string;
  googleRating?: number;
  googleReviewCount?: number;
  headerLinks?: Link[];
  footerLinks?: Link[];
  ctaPrimary?: string;
  ctaSecondary?: string;
  ctaBandTitle?: string;
  ctaBandText?: string;
  formThankYouPath?: string;
  announcement?: string;
  announcementHref?: string;
  seo?: Seo;
};

export type ServiceCategory = "hardscaping" | "masonry" | "outdoor-living" | "landscaping" | "maintenance";

export type ServiceSummary = {
  _id: string;
  title: string;
  shortTitle?: string;
  slug: string;
  category: ServiceCategory;
  excerpt: string;
  heroImage?: Img | null;
  featured?: boolean;
  order?: number;
};

export type Service = ServiceSummary & {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  highlights?: Feature[];
  body?: RichText;
  gallery?: Img[];
  faqs?: FaqItem[];
  materials?: string[];
  startingNote?: string;
  relatedServices?: ServiceSummary[];
  seo?: Seo;
};

export type ProjectSummary = {
  _id: string;
  title: string;
  slug: string;
  town?: string;
  summary?: string;
  coverImage: Img;
  services?: { title: string; slug: string; category?: ServiceCategory }[];
  featured?: boolean;
  order?: number;
};

export type Project = ProjectSummary & {
  body?: RichText;
  images?: Img[];
  beforeImage?: Img | null;
  afterImage?: Img | null;
  materials?: string[];
  completedAt?: string;
  seo?: Seo;
};

export type Testimonial = {
  _id: string;
  name: string;
  quote: string;
  rating?: number;
  source?: string;
  sourceUrl?: string;
  town?: string;
  service?: { title: string; slug: string } | null;
  avatar?: Img | null;
  date?: string;
  featured?: boolean;
  order?: number;
};

export type Faq = { _id: string; question: string; answer: string; category?: string; showOnHome?: boolean; order?: number };

export type ServiceAreaSummary = {
  _id: string;
  name: string;
  slug: string;
  kind: "county" | "town";
  county?: { name: string; slug: string } | null;
  intro?: string;
  image?: Img | null;
  order?: number;
};

export type ServiceArea = ServiceAreaSummary & {
  heading?: string;
  body?: RichText;
  highlights?: Feature[];
  towns?: string[];
  neighborhoods?: string[];
  mapQuery?: string;
  projects?: ProjectSummary[];
  faqs?: FaqItem[];
  seo?: Seo;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  excerpt?: string;
  featuredImage?: Img | null;
};

export type Post = PostSummary & {
  body?: RichText;
  relatedService?: ServiceSummary | null;
  faqs?: FaqItem[];
  seo?: Seo;
};

export type HomePage = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  heroImage?: Img | null;
  heroVideoUrl?: string;
  trustPoints?: string[];
  stats?: { value: string; label: string }[];
  servicesHeading?: string;
  servicesText?: string;
  featuredServices?: ServiceSummary[];
  projectsHeading?: string;
  projectsText?: string;
  featuredProjects?: ProjectSummary[];
  aboutHeading?: string;
  aboutText?: string;
  aboutImage?: Img | null;
  whyHeading?: string;
  whyItems?: Feature[];
  processHeading?: string;
  processText?: string;
  processSteps?: Feature[];
  reviewsHeading?: string;
  areasHeading?: string;
  areasText?: string;
  faqHeading?: string;
  seo?: Seo;
};

export type AboutPage = {
  heading: string;
  intro?: string;
  heroImage?: Img | null;
  founderName?: string;
  founderTitle?: string;
  founderBio?: RichText;
  founderImage?: Img | null;
  values?: Feature[];
  body?: RichText;
  seo?: Seo;
};

export type Page = { _id: string; title: string; slug: string; intro?: string; body?: RichText; seo?: Seo };
