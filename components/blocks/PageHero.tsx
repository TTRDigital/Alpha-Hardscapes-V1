import { Img } from "@/components/ui/Img";
import { Breadcrumbs, type Crumb } from "@/components/blocks/Breadcrumbs";
import type { Img as ImgT } from "@/lib/types";
import type { ReactNode } from "react";

/**
 * Inner-page header: breadcrumbs, label, large title and intro on the page background,
 * then the photo full container width underneath. Small photos are shown at a size
 * they can fill sharply instead of being stretched.
 */
export function PageHero({ eyebrow, title, text, image, crumbs, children }: { eyebrow?: string; title: string; text?: string; image?: ImgT | null; crumbs: Crumb[]; children?: ReactNode; compact?: boolean }) {
  const wide = image && (image.width ?? 2560) >= 1600;
  return (
    <section className="bg-paper">
      <div className="container-x pb-12 pt-10 sm:pb-16 sm:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {eyebrow && <p className="label">{eyebrow}</p>}
            <h1 className="h-xl mt-5">{title}</h1>
          </div>
          {(text || children) && (
            <div className="lg:col-span-4">
              {text && <p className="text-[1.05rem] leading-relaxed text-muted">{text}</p>}
              {children}
            </div>
          )}
        </div>
      </div>
      {image && (
        <div className="container-x pb-4">
          {wide ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist sm:aspect-[21/9]">
              <Img image={image} fill priority sizes="(max-width: 767px) 200vw, 1320px" quality={85} className="object-cover" />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-lg bg-mist" style={{ maxWidth: Math.min(640, Math.round((image.width ?? 640) / 1.2)), aspectRatio: `${image.width ?? 4} / ${image.height ?? 3}` }}>
              <Img image={image} fill priority sizes="640px" quality={90} className="object-cover" />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
