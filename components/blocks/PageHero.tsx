import { Img } from "@/components/ui/Img";
import { Breadcrumbs, type Crumb } from "@/components/blocks/Breadcrumbs";
import type { Img as ImgT } from "@/lib/types";
import type { ReactNode } from "react";

/** Inner-page hero: photo with dark overlay, or a plain stone band when there is no photo. */
export function PageHero({ eyebrow, title, text, image, crumbs, children, compact }: { eyebrow?: string; title: string; text?: string; image?: ImgT | null; crumbs: Crumb[]; children?: ReactNode; compact?: boolean }) {
  if (!image) {
    return (
      <section className="border-b border-ink/10 bg-stone-100">
        <div className={`container-x ${compact ? "py-12 sm:py-16" : "py-16 sm:py-24"}`}>
          <Breadcrumbs items={crumbs} />
          {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
          <h1 className="display-lg mt-3 max-w-3xl">{title}</h1>
          {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">{text}</p>}
          {children}
        </div>
      </section>
    );
  }
  return (
    <section className="relative isolate overflow-hidden bg-ink text-stone-50">
      <Img image={image} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/25" aria-hidden="true" />
      <div className={`container-x flex flex-col justify-end ${compact ? "min-h-[320px] py-10 sm:min-h-[380px]" : "min-h-[420px] py-12 sm:min-h-[520px] sm:py-16"}`}>
        <Breadcrumbs items={crumbs} light />
        {eyebrow && <p className="eyebrow-light mt-6">{eyebrow}</p>}
        <h1 className="display-lg mt-3 max-w-3xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-200">{text}</p>}
        {children}
      </div>
    </section>
  );
}
