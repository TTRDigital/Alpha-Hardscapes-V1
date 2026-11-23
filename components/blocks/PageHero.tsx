import { Img } from "@/components/ui/Img";
import { Breadcrumbs, type Crumb } from "@/components/blocks/Breadcrumbs";
import type { Img as ImgT } from "@/lib/types";
import type { ReactNode } from "react";

const FULL_BLEED_MIN = 1600;

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
  // Photos narrower than FULL_BLEED_MIN px would look soft stretched across a wide screen:
  // show them in a contained card next to the text instead.
  if ((image.width ?? 2560) < FULL_BLEED_MIN) {
    return (
      <section className="bg-ink text-stone-50">
        <div className={`container-x grid items-center gap-10 lg:grid-cols-12 ${compact ? "py-10 sm:py-14" : "py-12 sm:py-16"}`}>
          <div className="lg:col-span-7">
            <Breadcrumbs items={crumbs} light />
            {eyebrow && <p className="eyebrow-light mt-6">{eyebrow}</p>}
            <h1 className="display-lg mt-3 max-w-3xl">{title}</h1>
            {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-200">{text}</p>}
            {children}
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto overflow-hidden rounded-3xl bg-ink-700 shadow-lift" style={{ maxWidth: Math.min(520, Math.round((image.width ?? 520) / 1.3)), aspectRatio: `${image.width ?? 4} / ${image.height ?? 3}` }}>
              <Img image={image} fill priority sizes="520px" quality={90} className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative isolate overflow-hidden bg-ink text-stone-50">
      <Img image={image} fill priority sizes="100vw" quality={85} className="-z-20 object-cover" />
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
