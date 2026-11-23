import type { MetadataRoute } from "next";
import { getAreas, getPages, getPosts, getProjects, getServices } from "@/lib/content";
import { absUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, areas, posts, pages] = await Promise.all([getServices(), getProjects(), getAreas(), getPosts(), getPages()]);
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified: Date = now) => ({ url: absUrl(path), lastModified, changeFrequency, priority });
  return [
    entry("/", 1, "weekly"),
    entry("/services/", 0.9, "weekly"),
    ...services.map((s) => entry(`/services/${s.slug}/`, 0.9)),
    entry("/projects/", 0.8, "weekly"),
    ...projects.map((p) => entry(`/projects/${p.slug}/`, 0.6)),
    entry("/service-areas/", 0.8),
    ...areas.map((a) => entry(`/service-areas/${a.slug}/`, a.kind === "county" ? 0.8 : 0.7)),
    entry("/about/", 0.6),
    entry("/reviews/", 0.6),
    entry("/faq/", 0.5),
    entry("/contact/", 0.8),
    entry("/blog/", 0.6, "weekly"),
    ...posts.map((p) => entry(`/blog/${p.slug}/`, 0.5, "monthly", new Date(p.updatedAt || p.publishedAt))),
    ...pages.map((p) => entry(`/${p.slug}/`, 0.2, "yearly")),
  ];
}
