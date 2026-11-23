import type { Img } from "@/lib/types";
import dims from "./image-dims.data.ts";

const DIMS = dims as unknown as Record<string, [number, number]>;

/** Local photo with its real pixel size (from content/fallback/image-dims.json). */
export function img(src: string, alt: string, caption?: string): Img {
  const d = DIMS[src];
  if (!d && process.env.NODE_ENV !== "production") console.warn(`[fallback] unknown image size for ${src}`);
  return { src, alt, width: d?.[0], height: d?.[1], caption };
}
