import "server-only";
import { sanityFetch } from "@/lib/sanity/client";
import * as q from "@/lib/sanity/queries";
import * as fb from "@/content/fallback";
import type {
  AboutPage, Faq, HomePage, Page, Post, PostSummary, Project, ProjectSummary, Service, ServiceArea, ServiceAreaSummary, ServiceSummary, SiteSettings, Testimonial,
} from "@/lib/types";

/**
 * Content API used by every page. Each function asks Sanity first and falls back
 * to the built-in copy when Sanity is not configured, returns nothing or fails.
 * An empty CMS therefore shows the live-site content, never an empty page.
 */

const nonEmpty = <T>(v: T[] | undefined) => (v && v.length ? v : undefined);
/** Keep only documents that have the fields the templates rely on (drafts saved half-finished are skipped). */
const valid = <T extends object>(v: T[] | undefined, ...keys: (keyof T)[]) => nonEmpty((v || []).filter((d) => keys.every((k) => d[k] !== null && d[k] !== undefined && d[k] !== "")));

export async function getSettings(): Promise<SiteSettings> {
  const s = await sanityFetch<SiteSettings | null>(q.SETTINGS_QUERY);
  return s && s.businessName ? { ...fb.settings, ...stripNulls(s) } : fb.settings;
}

export async function getHomePage(): Promise<HomePage> {
  const h = await sanityFetch<HomePage | null>(q.HOME_QUERY);
  if (!h || !h.heading) return fb.homePage;
  const merged = { ...fb.homePage, ...stripNulls(h) };
  if (!nonEmpty(h.featuredServices)) merged.featuredServices = undefined;
  if (!nonEmpty(h.featuredProjects)) merged.featuredProjects = undefined;
  return merged;
}

export async function getAboutPage(): Promise<AboutPage> {
  const a = await sanityFetch<AboutPage | null>(q.ABOUT_QUERY);
  return a && a.heading ? { ...fb.aboutPage, ...stripNulls(a) } : fb.aboutPage;
}

export async function getServices(): Promise<ServiceSummary[]> {
  return valid(await sanityFetch<ServiceSummary[]>(q.SERVICES_QUERY), "title", "slug", "category") ?? fb.services.map(summary);
}

export async function getService(slug: string): Promise<Service | undefined> {
  const s = await sanityFetch<Service | null>(q.SERVICE_QUERY, { slug });
  if (s?.title && s.slug) return s;
  const local = fb.services.find((x) => x.slug === slug);
  return local ? fb.withRelated(local) : undefined;
}

export async function getProjects(): Promise<ProjectSummary[]> {
  return valid(await sanityFetch<ProjectSummary[]>(q.PROJECTS_QUERY), "title", "slug", "coverImage") ?? fb.projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const p = await sanityFetch<Project | null>(q.PROJECT_QUERY, { slug });
  return p?.title && p.coverImage?.src ? p : fb.projects.find((x) => x.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return valid(await sanityFetch<Testimonial[]>(q.TESTIMONIALS_QUERY), "name", "quote") ?? fb.testimonials;
}

export async function getFaqs(): Promise<Faq[]> {
  return valid(await sanityFetch<Faq[]>(q.FAQS_QUERY), "question", "answer") ?? fb.faqs;
}

export async function getAreas(): Promise<ServiceAreaSummary[]> {
  return valid(await sanityFetch<ServiceAreaSummary[]>(q.AREAS_QUERY), "name", "slug", "kind") ?? fb.areas;
}

export async function getArea(slug: string): Promise<ServiceArea | undefined> {
  const a = await sanityFetch<ServiceArea | null>(q.AREA_QUERY, { slug });
  return a?.name && a.slug ? a : fb.areas.find((x) => x.slug === slug);
}

export async function getPosts(): Promise<PostSummary[]> {
  return valid(await sanityFetch<PostSummary[]>(q.POSTS_QUERY), "title", "slug", "publishedAt") ?? fb.posts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const p = await sanityFetch<Post | null>(q.POST_QUERY, { slug });
  if (p?.title && p.publishedAt) return p;
  const local = fb.posts.find((x) => x.slug === slug);
  if (!local) return undefined;
  const related = local.relatedService ? fb.services.find((s) => s.slug === local.relatedService) : undefined;
  return { ...local, relatedService: related ? summary(related) : null };
}

export async function getPages(): Promise<Page[]> {
  return valid(await sanityFetch<Page[]>(q.PAGES_QUERY), "title", "slug") ?? fb.pages;
}

export async function getPage(slug: string): Promise<Page | undefined> {
  const p = await sanityFetch<Page | null>(q.PAGE_QUERY, { slug });
  return p?.title ? p : fb.pages.find((x) => x.slug === slug);
}

/** Slugs for generateStaticParams: union of CMS and built-in so nothing 404s. */
export async function allSlugs(kind: "service" | "project" | "area" | "post" | "page"): Promise<string[]> {
  const lists: Record<typeof kind, () => Promise<{ slug: string }[]>> = {
    service: getServices,
    project: getProjects,
    area: getAreas,
    post: getPosts,
    page: getPages,
  };
  const items = await lists[kind]();
  return [...new Set(items.map((i) => i.slug))];
}

function summary(s: Service): ServiceSummary {
  const { _id, title, shortTitle, slug, category, excerpt, heroImage, featured, order } = s;
  return { _id, title, shortTitle, slug, category, excerpt, heroImage, featured, order };
}

/** GROQ returns null for unset fields; drop them so the fallback values survive the merge. */
function stripNulls<T extends object>(o: T): T {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined)) as T;
}
