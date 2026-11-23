import { faqItem, feature, link, photo, richText, seo } from "./shared";
import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { project } from "./project";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { serviceArea } from "./serviceArea";
import { post } from "./post";
import { aboutPage, homePage, page } from "./pages";

export const schemaTypes = [photo, seo, richText, faqItem, feature, link, siteSettings, homePage, aboutPage, page, service, project, testimonial, faq, serviceArea, post];

/** Documents that exist exactly once. */
export const singletonTypes = new Set(["siteSettings", "homePage", "aboutPage"]);
