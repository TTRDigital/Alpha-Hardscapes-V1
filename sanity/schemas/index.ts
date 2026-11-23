import { navItem, photo, richText, seo } from "./shared";
import { box, btn, faq, form, gallery, hdg, html, img, list, map, reviews, rt, section, video } from "./blocks";
import { archive, page, post } from "./documents";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [photo, seo, richText, navItem, hdg, rt, btn, box, list, faq, reviews, img, gallery, form, html, map, video, section, page, post, archive, siteSettings];
export const singletonTypes = new Set(["siteSettings"]);
