/**
 * Shapes the site renders. Sanity queries project into these, and the built-in copy
 * of the live site (content/legacy/site.data.ts) is written in them directly, so every
 * page works the same with or without the CMS.
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

/* ---- Page building blocks (one "atom" = one widget of the live page) ---- */
export type HeadingAtom = { _type: "hdg"; _key: string; level: number; text: string; href?: string };
export type TextAtom = { _type: "rt"; _key: string; body: RichText };
export type ButtonAtom = { _type: "btn"; _key: string; label: string; href?: string; formKey?: string };
export type BoxAtom = { _type: "box"; _key: string; title?: string; text?: string; body?: RichText; href?: string };
export type ListAtom = { _type: "list"; _key: string; items: { _key: string; body: RichText; href?: string }[] };
export type FaqAtom = { _type: "faq"; _key: string; items: { _key: string; question: string; answer: RichText }[] };
export type ReviewsAtom = { _type: "reviews"; _key: string; items: { _key: string; name?: string; meta?: string; text: string; href?: string }[] };
export type ImageAtom = { _type: "img"; _key: string; image: Img; caption?: string };
export type GalleryAtom = { _type: "gallery"; _key: string; images: Img[]; large?: boolean };
export type FormAtom = { _type: "form"; _key: string; formKey: string };
export type HtmlAtom = { _type: "html"; _key: string; html: string };
export type MapAtom = { _type: "map"; _key: string; title?: string; url: string };
export type VideoAtom = { _type: "video"; _key: string; url: string };

export type Atom = HeadingAtom | TextAtom | ButtonAtom | BoxAtom | ListAtom | FaqAtom | ReviewsAtom | ImageAtom | GalleryAtom | FormAtom | HtmlAtom | MapAtom | VideoAtom;
export type Section = { _key: string; atoms: Atom[]; anchor?: string };

export type Seo = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
};

export type PageKind = "page" | "post" | "archive";

export type Page = {
  _id: string;
  kind: PageKind;
  title: string;
  /** Exact address, lowercase with a trailing slash, e.g. /masonry/ */
  path: string;
  seo: Seo;
  sections: Section[];
  heroImage?: Img | null;
  /** Posts */
  date?: string;
  modified?: string;
  author?: string;
  authorSlug?: string;
  categories?: string[];
  excerpt?: string;
  featuredImage?: Img | null;
  /** Archives (blog index, category, author) */
  archive?: "blog" | "category" | "author";
  heading?: string;
  category?: string;
};

export type FormField = { id: string; type: string; label: string; placeholder?: string; required?: boolean; options?: string[]; text?: string };
export type FormDef = { formKey: string; name: string; redirect: string; tag?: string; fields: FormField[]; button?: string };

export type NavItem = { label: string; href: string; children?: NavItem[] };

export type SiteSettings = {
  businessName: string;
  phone: string;
  phoneE164: string;
  email?: string;
  /** Town and ZIP only, never a street address. */
  locality: string;
  region: string;
  postalCode: string;
  hours: { days: string[]; opens: string; closes: string }[];
  areaServed: string[];
  socials: { label: string; href: string }[];
  headerNav: NavItem[];
  headerCta: { label: string; formKey?: string };
  footerNav: NavItem[];
  popupHeading: string;
  forms: FormDef[];
  /** Home hero background video (same clip as the live site) and its first frame. */
  heroVideoUrl?: string;
  heroPoster?: Img | null;
  logo?: Img | null;
  logoLight?: Img | null;
  defaultOgImage?: string;
  /** Blog authors (byline, bio box under posts, author pages). */
  authors: { slug: string; name: string; role?: string; bio?: string }[];
};
