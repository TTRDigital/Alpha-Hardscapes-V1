import type { Atom, BoxAtom, ButtonAtom, HeadingAtom, Img as ImgT, Section, SiteSettings } from "@/lib/types";
import { RichText } from "@/components/blocks/RichText";
import { Img } from "@/components/ui/Img";
import { Boxes, Buttons, CheckList, FaqList, FormCard, Gallery, Heading, HtmlEmbed, MapEmbed, PhoneLink, Reviews, Video, isPhoneBox } from "./atoms";

/**
 * Renders a page's sections (the live page's content, in order) in the site's modern layout.
 * Words, heading levels, lists, FAQs, buttons and links are exactly as stored; only the
 * layout is chosen here, from the kind of blocks a section holds.
 */

type Run =
  | { kind: "text"; atoms: Atom[] }
  | { kind: "buttons"; atoms: ButtonAtom[] }
  | { kind: "boxes"; atoms: BoxAtom[] }
  | { kind: "images"; images: ImgT[] }
  | { kind: "single"; atom: Atom };

const TEXT = new Set(["hdg", "rt", "list"]);
const MEDIA = new Set(["img", "video", "map"]);

export function toRuns(atoms: Atom[]): Run[] {
  const runs: Run[] = [];
  for (const a of atoms) {
    const last = runs[runs.length - 1];
    const kind = TEXT.has(a._type) || isPhoneBox(a) ? "text" : a._type === "btn" ? "buttons" : a._type === "box" ? "boxes" : a._type === "img" ? "images" : "single";
    if (kind === "images") {
      const img = (a as Extract<Atom, { _type: "img" }>).image;
      if (last?.kind === "images") last.images.push(img);
      else runs.push({ kind: "images", images: [img] });
    } else if (kind === "single") runs.push({ kind: "single", atom: a });
    else if (last && last.kind === kind) (last.atoms as Atom[]).push(a);
    else runs.push({ kind, atoms: [a] } as Run);
  }
  return runs;
}

function TextRun({ atoms, dark }: { atoms: Atom[]; dark?: boolean }) {
  return (
    <div className="max-w-3xl">
      {atoms.map((a, i) => {
        const prev = atoms[i - 1];
        if (a._type === "hdg") {
          const afterText = prev && prev._type !== "hdg";
          const eyebrowBefore = prev?._type === "hdg" && prev.level >= 5;
          return <Heading key={a._key} a={a} dark={dark} className={`${afterText ? "mt-12" : i > 0 && !eyebrowBefore ? "mt-3" : ""} ${a.level >= 5 ? "mb-4" : "mb-5"} ${dark && a.level < 5 ? "text-white" : ""}`} />;
        }
        if (a._type === "rt") return <RichText key={a._key} value={a.body} className={`${i > 0 ? "mt-4" : ""} ${dark ? "!text-white/75 [&_a]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_strong]:!text-white" : ""}`} />;
        if (a._type === "list") return <div key={a._key} className="mt-6"><CheckList a={a} dark={dark} /></div>;
        if (isPhoneBox(a)) return <div key={a._key} className="mt-5"><PhoneLink a={a as BoxAtom} dark={dark} /></div>;
        return null;
      })}
    </div>
  );
}

function Images({ images }: { images: ImgT[] }) {
  if (images.length === 1)
    return (
      <div className="overflow-hidden rounded-2xl bg-mist">
        <Img image={images[0]} loading="lazy" sizes="(min-width: 1024px) 1200px, 100vw" className="h-auto max-h-[720px] w-full object-cover" />
      </div>
    );
  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((im, i) => (
        <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
          <Img image={im} fill loading="lazy" sizes="(min-width: 1024px) 600px, 50vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

/** Text of the last heading before this run (gives generic buttons a clear accessible name). */
function headingBefore(runs: Run[], i: number) {
  for (let j = i; j >= 0; j--) {
    const r = runs[j];
    if (r.kind === "text") { const h = [...r.atoms].reverse().find((a) => a._type === "hdg"); if (h && h._type === "hdg") return h.text; }
  }
  return undefined;
}

function RunView({ run, settings, dark, context }: { run: Run; settings: SiteSettings; dark?: boolean; context?: string }) {
  switch (run.kind) {
    case "text": return <TextRun atoms={run.atoms} dark={dark} />;
    case "buttons": return <Buttons items={run.atoms} dark={dark} context={context} />;
    case "boxes": return <Boxes items={run.atoms} dark={dark} />;
    case "images": return <Images images={run.images} />;
    case "single": {
      const a = run.atom;
      switch (a._type) {
        case "faq": return <FaqList a={a} />;
        case "reviews": return <Reviews a={a} />;
        case "gallery": return <Gallery a={a} />;
        case "video": return <div className="max-w-3xl"><Video url={a.url} /></div>;
        case "map": return <MapEmbed title={a.title} url={a.url} />;
        case "form": return <div className="max-w-xl"><FormCard formKey={a.formKey} settings={settings} /></div>;
        case "html": return <div className="max-w-2xl"><HtmlEmbed html={a.html} /></div>;
        default: return null;
      }
    }
  }
}

type Layout = "cta" | "faq" | "split" | "flow";

export function layoutOf(s: Section, isLast: boolean): Layout {
  const types = s.atoms.map((a) => a._type);
  const has = (t: string) => types.includes(t as Atom["_type"]);
  if (has("faq") && types.every((t) => ["hdg", "rt", "btn", "faq"].includes(t))) return "faq";
  if (isLast && has("btn") && types.length <= 5 && types.every((t) => ["hdg", "rt", "btn"].includes(t))) return "cta";
  const media = s.atoms.filter((a) => MEDIA.has(a._type)).length;
  const text = s.atoms.filter((a) => TEXT.has(a._type)).length;
  if (media >= 1 && media <= 2 && text >= 1 && !["box", "gallery", "reviews", "faq", "form", "html"].some(has)) return "split";
  return "flow";
}

export function Sections({ sections, settings, startIndex = 0 }: { sections: Section[]; settings: SiteSettings; startIndex?: number }) {
  let splitCount = 0;
  return (
    <>
      {sections.map((s, i) => {
        const layout = layoutOf(s, i === sections.length - 1);
        const n = startIndex + i;
        if (layout === "cta") {
          const heads = s.atoms.filter((a): a is HeadingAtom => a._type === "hdg");
          const rts = s.atoms.filter((a) => a._type === "rt");
          const btns = s.atoms.filter((a): a is ButtonAtom => a._type === "btn");
          return (
            <section key={s._key} id={s.anchor} className="scroll-mt-20 bg-ink text-white">
              <div className="container-x py-20 sm:py-28">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-7">
                    {heads.map((h) => <Heading key={h._key} a={h} dark className="text-white" />)}
                  </div>
                  <div className="lg:col-span-5">
                    {rts.map((r) => r._type === "rt" && <RichText key={r._key} value={r.body} plain className="text-[17px] leading-relaxed text-white/70 [&_a]:text-white [&_a]:underline [&_p+p]:mt-3" />)}
                    <Buttons items={btns} dark className="mt-8" />
                  </div>
                </div>
              </div>
            </section>
          );
        }
        if (layout === "faq") {
          const side = s.atoms.filter((a) => a._type !== "faq");
          return (
            <section key={s._key} id={s.anchor} className="scroll-mt-20 border-t border-line bg-mist/60">
              <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">{toRuns(side).map((r, j) => <div key={j} className={j ? "mt-6" : ""}><RunView run={r} settings={settings} /></div>)}</div>
                </div>
                <div className="lg:col-span-8">{s.atoms.filter((a) => a._type === "faq").map((a) => a._type === "faq" && <FaqList key={a._key} a={a} />)}</div>
              </div>
            </section>
          );
        }
        if (layout === "split") {
          const media = s.atoms.filter((a) => MEDIA.has(a._type));
          const rest = s.atoms.filter((a) => !MEDIA.has(a._type));
          const flip = splitCount++ % 2 === 1;
          return (
            <section key={s._key} id={s.anchor} className="scroll-mt-20 border-t border-line">
              <div className="container-x grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                  {toRuns(rest).map((r, j, all) => <div key={j} className={j ? "mt-8" : ""}><RunView run={r} settings={settings} context={headingBefore(all, j)} /></div>)}
                </div>
                <div className={`grid gap-3 lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                  {media.map((m) =>
                    m._type === "img" ? (
                      <div key={m._key} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist lg:aspect-[4/5]">
                        <Img image={m.image} fill loading="lazy" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                      </div>
                    ) : m._type === "video" ? (
                      <Video key={m._key} url={m.url} />
                    ) : m._type === "map" ? (
                      <MapEmbed key={m._key} title={m.title} url={m.url} />
                    ) : null,
                  )}
                </div>
              </div>
            </section>
          );
        }
        // flow
        const runs = toRuns(s.atoms);
        const tinted = s.atoms.some((a) => a._type === "reviews");
        return (
          <section key={s._key} id={s.anchor} className={`scroll-mt-20 border-t border-line ${tinted ? "bg-mist/60" : ""}`} data-n={n}>
            <div className="container-x py-20 sm:py-24">
              {runs.map((r, j) => {
                const prev = runs[j - 1];
                const gap = !prev ? "" : prev.kind === "text" && (r.kind === "buttons") ? "mt-8" : r.kind === "text" && r.atoms[0]?._type === "hdg" ? "mt-20" : "mt-12";
                return <div key={j} className={gap}><RunView run={r} settings={settings} context={headingBefore(runs, j)} /></div>;
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
