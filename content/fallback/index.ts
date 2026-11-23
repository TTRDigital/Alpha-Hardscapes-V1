/**
 * Built-in content: a complete copy of the site that renders when Sanity is not
 * configured, empty or unreachable. It is also the source for `npm run seed`.
 */
import type { Post } from "@/lib/types";
import postsJson from "./posts.data.ts";

export { settings } from "./settings.ts";
export { services, withRelated } from "./services.ts";
export { projects } from "./projects.ts";
export { testimonials } from "./testimonials.ts";
export { faqs } from "./faqs.ts";
export { areas } from "./areas.ts";
export { homePage, aboutPage, pages } from "./pages.ts";

type RawPost = Omit<Post, "relatedService"> & { relatedService?: string };
export const posts: RawPost[] = postsJson as unknown as RawPost[];
