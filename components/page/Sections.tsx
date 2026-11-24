import type { Atom, BoxAtom, ButtonAtom, HeadingAtom, Img as ImgT, Section, SiteSettings } from "@/lib/types";
import { RichText } from "@/components/blocks/RichText";
import { Img } from "@/components/ui/Img";
import { Boxes, Buttons, CheckList, FaqList, FormCard, Gallery, Heading, HtmlEmbed, MapEmbed, PhoneLink, Reviews, Video, isPhoneBox } from "./atoms";

/**
 * Renders a page's sections (the live page's content, in order) as a calm, editorial story:
 * one idea per section, generous space, alternating stone backgrounds and hairlines.
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

/** Text of the last heading before this run (gives generic buttons a clear accessible name). */
function headingBefore(runs: Run[], i: number) {
  for (let j = i; j >= 0; j--) {
    const r = runs[j];
    if (r.kind === "text") { const h = [...r.atoms].reverse().find((a) => a._type === "hdg"); if (h && h._type === "hdg") return h.text; }
  }
  return undefined;
}

/**
 * One idea per section: a section that starts a second topic (a new H2 after text, as on the
 * home page's "Landscaping Services") is shown as its own section. Nothing is removed or reordered.
 */
export function splitSections(sections: Section[]): Section[] {
  const out: Section[] = [];
  for (const s of sections) {
    let cur: Atom[] = [];
    let part = 0;
    const atoms = s.atoms;
    for (let i = 0; i < atoms.length; i++) {
      const a = atoms[i];
      // Start of a heading run that contains an H1/H2, after some non-heading content
      // (only after text or boxes: a heading that follows a video or photo still belongs with it)
      if (a._type === "hdg" && cur.some((x) => ["rt", "list", "box", "btn", "faq", "gallery", "reviews"].includes(x._type)) && cur.some((x) => x._type === "hdg") && atoms[i - 1]?._type !== "hdg") {
        let j = i; let hasH2 = false;
        while (j < atoms.length && atoms[j]._type === "hdg") { if ((atoms[j] as HeadingAtom).level <= 2) hasH2 = true; j++; }
        if (hasH2) { out.push({ ...s, _key: `${s._key}-${part++}`, atoms: cur }); cur = []; }
      }
      cur.push(a);
    }
    if (cur.length) out.push({ ...s, _key: part ? `${s._key}-${part}` : s._key, anchor: part ? undefined : s.anchor, atoms: cur });
  }
  return out;
}

function TextRun({ atoms, dark, lead = false }: { atoms: Atom[]; dark?: boolean; lead?: boolean }) {
  return (
    <div className="max-w-[46rem]">
      {atoms.map((a, i) => {
        const prev = atoms[i - 1];
        if (a._type === "hdg") {
          const afterText = prev && prev._type !== "hdg";
          return <Heading key={a._key} a={a} dark={dark} className={`${afterText ? "mt-12" : i > 0 && prev?._type === "hdg" && prev.level < 5 ? "mt-3" : ""} ${a.level >= 5 ? "mb-6" : "mb-6"} ${dark && a.level < 5 ? "text-white" : a.level < 5 ? "text-ink" : ""}`} />;
        }
        if (a._type === "rt") return <RichText key={a._key} value={a.body} className={`${i > 0 && prev?._type !== "hdg" ? "mt-5" : ""} ${lead ? "!text-[1.0625rem] sm:!text-[1.125rem]" : ""} ${dark ? "!text-white/75 [&_a]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_strong]:!text-white" : ""} [&>p:first-child]:mt-0`} />;
        if (a._type === "list") return <div key={a._key} className="mt-7"><CheckList a={a} dark={dark} /></div>;
        if (isPhoneBox(a)) return <div key={a._key} className="mt-6"><PhoneLink a={a as BoxAtom} dark={dark} /></div>;
        return null;
      })}
    </div>
  );
}

function Images({ images, compact = false }: { images: ImgT[]; compact?: boolean }) {
  if (images.length === 1 && !compact)
    return (
      <figure className="media relative aspect-[16/10]">
        <Img image={images[0]} fill loading="lazy" sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
      </figure>
    );
  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-4">
      {images.map((im, i) => (
        <figure key={i} className="media relative aspect-[4/5]">
          <Img image={im} fill loading="lazy" sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
        </figure>
      ))}
    </div>
  );
}

function RunView({ run, settings, dark, context, compact }: { run: Run; settings: SiteSettings; dark?: boolean; context?: string; compact?: boolean }) {
  switch (run.kind) {
    case "text": return <TextRun atoms={run.atoms} dark={dark} />;
    case "buttons": return <Buttons items={run.atoms} dark={dark} context={context} />;
    case "boxes": return <Boxes items={run.atoms} dark={dark} compact={compact} />;
    case "images": return <Images images={run.images} compact={compact} />;
    case "single": {
      const a = run.atom;
      switch (a._type) {
        case "faq": return <FaqList a={a} />;
        case "reviews": return <Reviews a={a} dark={dark} />;
        case "gallery": return <Gallery a={a} />;
        case "video": return <div className="max-w-xl"><Video url={a.url} /></div>;
        case "map": return <MapEmbed title={a.title} url={a.url} />;
        case "form": return <div className="max-w-xl"><FormCard formKey={a.formKey} settings={settings} /></div>;
        case "html": return <div className="max-w-2xl"><HtmlEmbed html={a.html} /></div>;
        default: return null;
      }
    }
  }
}

/** Runs one after the other, with a quiet rhythm between them. */
function Stack({ atoms, settings, dark, compact }: { atoms: Atom[]; settings: SiteSettings; dark?: boolean; compact?: boolean }) {
  const runs = toRuns(atoms);
  return (
    <>
      {runs.map((r, j) => {
        const prev = runs[j - 1];
        const gap = !prev ? "" : prev.kind === "text" && r.kind === "buttons" ? "mt-9" : r.kind === "text" && r.atoms[0]?._type === "hdg" ? "mt-16" : "mt-10";
        return <div key={j} className={gap}><RunView run={r} settings={settings} dark={dark} context={headingBefore(runs, j)} compact={compact} /></div>;
      })}
    </>
  );
}

export type Layout = "cta" | "faq" | "split" | "list" | "carousel" | "lead" | "flow";

export function layoutOf(s: Section, isLast: boolean): Layout {
  const types = s.atoms.map((a) => a._type);
  const has = (t: string) => types.includes(t as Atom["_type"]);
  const only = (allowed: string[]) => types.every((t) => allowed.includes(t));
  if (has("faq") && only(["hdg", "rt", "btn", "faq"])) return "faq";
  if (isLast && has("btn") && types.length <= 5 && only(["hdg", "rt", "btn"])) return "cta";
  const boxes = s.atoms.filter((a) => a._type === "box" && !isPhoneBox(a)).length;
  if (boxes >= 2 && !["gallery", "reviews", "faq", "form", "html", "video", "map"].some(has)) return "list";
  const big = s.atoms.filter((a) => a._type === "reviews" || (a._type === "gallery" && !a.large)).length;
  if (big === 1 && only(["hdg", "rt", "btn", "list", "gallery", "reviews"])) return "carousel";
  const media = s.atoms.filter((a) => MEDIA.has(a._type)).length;
  const text = s.atoms.filter((a) => TEXT.has(a._type)).length;
  if (media >= 1 && media <= 2 && text >= 1 && !["box", "gallery", "reviews", "faq", "form", "html"].some(has)) return "split";
  // Headings first, then text, lists and buttons only: heading on the left, the words on the right
  const firstNonHeading = s.atoms.findIndex((a) => a._type !== "hdg");
  if (firstNonHeading > 0 && s.atoms.slice(firstNonHeading).every((a) => ["rt", "list", "btn"].includes(a._type) || isPhoneBox(a)) && s.atoms.slice(0, firstNonHeading).some((a) => a._type === "hdg" && a.level <= 3)) return "lead";
  return "flow";
}

/** Section number shown as a small label ("01"), so every section reads as a chapter. */
function Num({ n, dark }: { n?: number; dark?: boolean }) {
  if (!n) return null;
  return <p className={`${dark ? "eyebrow-light" : "eyebrow"} mb-7`} aria-hidden="true">{String(n).padStart(2, "0")}</p>;
}

const startsWithEyebrow = (s: Section) => s.atoms[0]?._type === "hdg" && (s.atoms[0] as HeadingAtom).level >= 5;
const hasHeading = (s: Section) => s.atoms.some((a) => a._type === "hdg" && a.level <= 3);

export function Sections({ sections: input, settings, numbered = true, toneStart = 0 }: { sections: Section[]; settings: SiteSettings; numbered?: boolean; toneStart?: number }) {
  const sections = splitSections(input);
  let splitCount = 0;
  let num = 0;
  return (
    <>
      {sections.map((s, i) => {
        const layout = layoutOf(s, i === sections.length - 1);
        const n = numbered && layout !== "cta" && hasHeading(s) && !startsWithEyebrow(s) ? ++num : undefined;
        const tone = (i + toneStart) % 2 === 0 ? "bg-white" : "bg-paper";
        const shell = (cls: string, body: React.ReactNode) => (
          <section key={s._key} id={s.anchor} className={`scroll-mt-24 border-t border-line/70 ${cls}`}>{body}</section>
        );

        if (layout === "cta") {
          const heads = s.atoms.filter((a): a is HeadingAtom => a._type === "hdg");
          const rts = s.atoms.filter((a) => a._type === "rt");
          const btns = s.atoms.filter((a): a is ButtonAtom => a._type === "btn");
          return (
            <section key={s._key} id={s.anchor} className="scroll-mt-24 bg-basalt text-white">
              <div className="container-x py-16 sm:py-24">
                <div className="reveal relative overflow-hidden rounded-[24px] bg-basalt-soft px-7 py-12 ring-1 ring-white/10 sm:px-14 sm:py-16">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/10 blur-3xl" aria-hidden="true" />
                  <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-7">
                      {heads.map((h) => <Heading key={h._key} a={h} dark className={h.level < 5 ? "h-caps text-white" : "mb-5"} />)}
                      {rts.map((r) => r._type === "rt" && <RichText key={r._key} value={r.body} plain className="mt-6 max-w-xl text-[16px] leading-[1.85] text-white/70 [&_a]:text-white [&_a]:underline [&_p+p]:mt-3" />)}
                    </div>
                    <div className="lg:col-span-5 lg:flex lg:justify-end">
                      <Buttons items={btns} dark />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (layout === "faq") {
          const side = s.atoms.filter((a) => a._type !== "faq");
          return shell("bg-mist/70", (
            <div className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32"><Num n={n} /><Stack atoms={side} settings={settings} /></div>
              </div>
              <div className="lg:col-span-8">{s.atoms.filter((a) => a._type === "faq").map((a) => a._type === "faq" && <FaqList key={a._key} a={a} />)}</div>
            </div>
          ));
        }

        if (layout === "list") {
          const rows = s.atoms.filter((a) => a._type === "box" && !isPhoneBox(a));
          const side = s.atoms.filter((a) => !rows.includes(a));
          return shell(tone, (
            <div className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32"><Num n={n} /><Stack atoms={side} settings={settings} compact /></div>
              </div>
              <div className="lg:col-span-7"><Boxes items={rows as BoxAtom[]} /></div>
            </div>
          ));
        }

        if (layout === "carousel") {
          const big = s.atoms.find((a) => a._type === "reviews" || a._type === "gallery")!;
          const heads = s.atoms.filter((a) => a._type === "hdg");
          const rest = s.atoms.filter((a) => a !== big && a._type !== "hdg");
          const runs = toRuns(rest);
          return shell(tone, (
            <div className="container-x py-20 sm:py-28">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7"><Num n={n} />{heads.length > 0 && <TextRun atoms={heads} />}</div>
                <div className="lg:col-span-5">
                  {runs.map((r, j) => <div key={j} className={j ? "mt-7" : ""}><RunView run={r} settings={settings} context={headingBefore([{ kind: "text", atoms: heads }, ...runs], j + 1)} /></div>)}
                </div>
              </div>
              <div className="reveal mt-12"><RunView run={{ kind: "single", atom: big }} settings={settings} /></div>
            </div>
          ));
        }

        if (layout === "split") {
          const media = s.atoms.filter((a) => MEDIA.has(a._type));
          const rest = s.atoms.filter((a) => !MEDIA.has(a._type));
          const film = media.some((m) => m._type === "video");
          const flip = !film && splitCount++ % 2 === 1;
          return shell(tone, (
            <div className="container-x grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-20">
              <div className={`${film ? "order-2 lg:order-2 lg:col-span-5" : `lg:col-span-6 ${flip ? "lg:order-2" : ""}`}`}>
                <Num n={n} />
                <Stack atoms={rest} settings={settings} />
              </div>
              <div className={`reveal grid gap-4 ${film ? "order-1 lg:col-span-7" : `lg:col-span-6 ${flip ? "lg:order-1" : ""}`}`}>
                {media.map((m) =>
                  m._type === "img" ? (
                    <figure key={m._key} className="media relative aspect-[4/3] lg:aspect-[4/5]">
                      <Img image={m.image} fill loading="lazy" sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                    </figure>
                  ) : m._type === "video" ? (
                    <Video key={m._key} url={m.url} className="mx-auto w-full max-w-[640px] lg:max-h-[82vh]" />
                  ) : m._type === "map" ? (
                    <MapEmbed key={m._key} title={m.title} url={m.url} />
                  ) : null,
                )}
              </div>
            </div>
          ));
        }

        if (layout === "lead") {
          const k = s.atoms.findIndex((a) => a._type !== "hdg");
          return shell(tone, (
            <div className="container-x grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5"><div className="lg:sticky lg:top-32"><Num n={n} /><TextRun atoms={s.atoms.slice(0, k)} /></div></div>
              <div className="lg:col-span-7 lg:pt-2"><Stack atoms={s.atoms.slice(k)} settings={settings} /></div>
            </div>
          ));
        }

        // flow
        return shell(tone, (
          <div className="container-x py-20 sm:py-28">
            <Num n={n} />
            <Stack atoms={s.atoms} settings={settings} />
          </div>
        ));
      })}
    </>
  );
}
