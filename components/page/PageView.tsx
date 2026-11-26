import Link from "next/link";
import type { Atom, BoxAtom, ButtonAtom, HeadingAtom, Img as ImgT, Page, Section, SiteSettings } from "@/lib/types";
import { RichText } from "@/components/blocks/RichText";
import { Img } from "@/components/ui/Img";
import { HeroVideo } from "@/components/blocks/HeroVideo";
import { formatDate, plainText, readingTime } from "@/lib/site";
import { Buttons, CheckList, FormCard, Heading, HtmlEmbed, PhoneLink, isPhoneBox } from "./atoms";
import { Sections, layoutOf, splitSections } from "./Sections";

type Props = { page: Page; settings: SiteSettings };

const isH1 = (a: Atom): a is HeadingAtom => a._type === "hdg" && a.level === 1;

/** Splits off the opening section (the one holding the H1) so it can be shown as the page hero. */
function splitHero(page: Page): { hero?: Section; rest: Section[] } {
  const first = page.sections[0];
  if (first?.atoms.some(isH1)) return { hero: first, rest: page.sections.slice(1) };
  return { rest: page.sections };
}

/** Drop the photo already shown in the hero from the sections below it. */
function withoutImage(sections: Section[], img?: ImgT | null): Section[] {
  if (!img) return sections;
  let done = false;
  return sections
    .map((s) => ({ ...s, atoms: s.atoms.filter((a) => (done || a._type !== "img" || a.image.src !== img.src ? true : ((done = true), false))) }))
    .filter((s) => s.atoms.length);
}

/** Headings, buttons and the call link that sit in the hero. */
function heroParts(hero: Section) {
  const form = hero.atoms.find((a) => a._type === "form");
  const formHeading = form ? (hero.atoms.find((a, i) => a._type === "hdg" && a.level > 1 && hero.atoms[i + 1] === form) as HeadingAtom | undefined) : undefined;
  const heads = hero.atoms.filter((a): a is HeadingAtom => a._type === "hdg" && a !== formHeading);
  const buttons = hero.atoms.filter((a): a is ButtonAtom => a._type === "btn");
  const phone = hero.atoms.find((a) => isPhoneBox(a)) as BoxAtom | undefined;
  const rest = hero.atoms.filter((a) => !heads.includes(a as HeadingAtom) && !buttons.includes(a as ButtonAtom) && a !== phone && a !== form && a !== formHeading);
  return { form, formHeading, heads, buttons, phone, rest };
}

function HeroHeadings({ heads, dark, display = false }: { heads: HeadingAtom[]; dark?: boolean; display?: boolean }) {
  return (
    <>
      {heads.map((h) => (
        <Heading key={h._key} a={h} dark={dark} className={h.level === 1 ? `${display ? "h-display" : "h-xl"} max-w-4xl ${dark ? "text-white" : "text-ink"}` : h.level >= 5 ? "mb-6" : `mt-5 max-w-3xl !text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] ${dark ? "text-white/85" : "text-muted"}`} />
      ))}
    </>
  );
}

/** First section under a photo hero: the opening paragraph(s), plus the hero's form if it had one. */
function Intro({ rest, form, formHeading, settings }: { rest: Atom[]; form?: Atom; formHeading?: HeadingAtom; settings: SiteSettings }) {
  if (!rest.length && !form) return null;
  const html = rest.filter((a) => a._type === "html");
  const text = rest.filter((a) => a._type !== "html");
  return (
    <section className="border-b border-line/70 bg-white">
      <div className={`container-x grid gap-12 py-16 sm:py-24 ${form ? "lg:grid-cols-12 lg:gap-16" : ""}`}>
        <div className={form ? "lg:col-span-7" : "max-w-3xl"}>
          {text.map((a, i) =>
            a._type === "rt" ? (
              <RichText key={a._key} value={a.body} className={`!text-[1.0625rem] sm:!text-[1.1875rem] !leading-[1.85] [&>p:first-child]:mt-0 ${i ? "mt-5" : ""}`} />
            ) : a._type === "list" ? (
              <div key={a._key} className="mt-7"><CheckList a={a} /></div>
            ) : null,
          )}
          {html.map((a) => a._type === "html" && <div key={a._key} className="mt-8"><HtmlEmbed html={a.html} /></div>)}
        </div>
        {form && form._type === "form" && <div className="lg:col-span-5"><FormCard formKey={form.formKey} settings={settings} heading={formHeading} /></div>}
      </div>
    </section>
  );
}

export function PageView({ page, settings }: Props) {
  const { hero, rest } = splitHero(page);
  const heroImg = page.heroImage;
  // The page photo is only shown at the top when the page opens with its main heading; only then
  // is the same photo left out further down (otherwise it would be missing from the page).
  const sections = hero ? withoutImage(rest, heroImg) : rest;
  if (!hero) {
    return (
      <div className="pt-20">
        <Sections sections={sections} settings={settings} />
      </div>
    );
  }
  const { form, formHeading, heads, buttons, phone, rest: heroRest } = heroParts(hero);
  const INTRO = ["rt", "list", "html"];
  const introAtoms = heroRest.filter((a) => INTRO.includes(a._type));
  const others = heroRest.filter((a) => !INTRO.includes(a._type));
  const below = others.length ? [{ _key: `${hero._key}-more`, atoms: others }, ...sections] : sections;

  if (!heroImg) {
    // No photo (thank-you, legal and list pages): a dark band with the heading and opening text.
    return (
      <>
        <section className="bg-basalt pt-20 text-white">
          <div className="container-x py-16 sm:py-24">
            <HeroHeadings heads={heads} dark />
            {introAtoms.map((a) => a._type === "rt" ? <RichText key={a._key} value={a.body} plain className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.85] text-white/75 [&_a]:text-white [&_a]:underline [&_p+p]:mt-3" /> : a._type === "list" ? <div key={a._key} className="mt-7 max-w-2xl"><CheckList a={a} dark /></div> : null)}
            {buttons.length > 0 && <Buttons items={buttons} dark className="mt-10" />}
            {phone && <div className="mt-6"><PhoneLink a={phone} dark /></div>}
          </div>
        </section>
        {(form || introAtoms.some((a) => a._type === "html")) && <Intro rest={introAtoms.filter((a) => a._type === "html")} form={form} formHeading={formHeading} settings={settings} />}
        <Sections sections={below} settings={settings} />
      </>
    );
  }

  return (
    <>
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-basalt pt-20 text-white h-[78svh] max-h-[820px]">
        <Img image={heroImg} fill preload fetchPriority="high" quality={65} sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-basalt/90 via-basalt/45 to-basalt/10" aria-hidden="true" />
        <div className="container-x pb-12 sm:pb-16">
          <HeroHeadings heads={heads} dark />
          <span className="mt-7 block h-px w-16 bg-white/50" aria-hidden="true" />
          {(buttons.length > 0 || phone) && (
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              {buttons.length > 0 && <Buttons items={buttons} dark />}
              {phone && <PhoneLink a={phone} dark />}
            </div>
          )}
        </div>
      </section>
      <Intro rest={introAtoms} form={form} formHeading={formHeading} settings={settings} />
      <Sections sections={below} settings={settings} />
    </>
  );
}

/**
 * Home: the live banner video full width under the header with the H1, then Alpha's own crew
 * reel straight after it, then the story. The banner's quote form moves to the dark closing
 * section next to the final call to action.
 */
export function HomeView({ page, settings }: Props) {
  const { hero, rest } = splitHero(page);
  if (!hero) return <PageView page={page} settings={settings} />;
  const { form, formHeading, heads, buttons, phone, rest: heroRest } = heroParts(hero);
  const poster = settings.heroPoster;
  const sections = splitSections(heroRest.length ? [{ _key: `${hero._key}-more`, atoms: heroRest }, ...rest] : rest);
  const last = sections[sections.length - 1];
  const closing = last && layoutOf(last, true) === "cta" ? last : undefined;
  const body = closing ? sections.slice(0, -1) : sections;
  const jump: ButtonAtom | null = form && formHeading ? { _type: "btn", _key: "jump", label: formHeading.text, href: "#quote-form" } : null;
  return (
    <>
      <section className="relative isolate flex h-[calc(100svh-5rem)] max-h-[900px] min-h-[560px] items-end overflow-hidden bg-basalt text-white mt-20">
        {poster && <Img image={poster} fill preload fetchPriority="high" quality={65} sizes="100vw" className="-z-20 object-cover" />}
        {settings.heroVideoUrl && <HeroVideo src={settings.heroVideoUrl} />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-basalt/85 via-basalt/30 to-transparent" aria-hidden="true" />
        <div className="container-x pb-12 sm:pb-16">
          <HeroHeadings heads={heads} dark display />
          <span className="mt-8 block h-px w-16 bg-white/50" aria-hidden="true" />
          <div className="mt-8 flex flex-wrap gap-3">
            {jump && <Buttons items={[jump]} dark />}
            {buttons.length > 0 && <Buttons items={buttons} dark />}
            {phone && <PhoneLink a={phone} dark />}
          </div>
        </div>
      </section>
      <Sections sections={body} settings={settings} />
      {(closing || form) && <Closing section={closing} form={form} formHeading={formHeading} settings={settings} />}
    </>
  );
}

/** Dark closing section: the final call to action next to the quote form card. */
function Closing({ section, form, formHeading, settings }: { section?: Section; form?: Atom; formHeading?: HeadingAtom; settings: SiteSettings }) {
  const heads = section?.atoms.filter((a): a is HeadingAtom => a._type === "hdg") || [];
  const rts = section?.atoms.filter((a) => a._type === "rt") || [];
  const btns = section?.atoms.filter((a): a is ButtonAtom => a._type === "btn") || [];
  return (
    <section className="bg-basalt text-white">
      <div className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 lg:pt-6">
          {heads.map((h) => <Heading key={h._key} a={h} dark className="h-caps text-white" />)}
          {rts.map((r) => r._type === "rt" && <RichText key={r._key} value={r.body} plain className="mt-7 max-w-xl text-[16px] leading-[1.9] text-white/70 [&_a]:text-white [&_a]:underline [&_p+p]:mt-3" />)}
          {btns.length > 0 && <Buttons items={btns} dark className="mt-10" />}
          <div className="mt-10 grid gap-1.5 text-[15px] text-white/70">
            <a href={`tel:${settings.phoneE164}`} className="font-display text-[2rem] leading-tight text-white hover:text-lime-light">{settings.phone}</a>
            {settings.email && <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>}
          </div>
        </div>
        {form && form._type === "form" && (
          <div className="reveal lg:col-span-6">
            <FormCard formKey={form.formKey} settings={settings} heading={formHeading} />
          </div>
        )}
      </div>
    </section>
  );
}

type PostLite = Pick<Page, "title" | "path" | "date" | "author" | "authorSlug" | "excerpt" | "featuredImage" | "heroImage">;

export function PostCard({ post, level = 2 }: { post: PostLite & { minutes?: number }; level?: 2 | 3 }) {
  const H = `h${level}` as "h2";
  const img = post.featuredImage || post.heroImage;
  return (
    <article className="card group flex flex-col overflow-hidden">
      {img && (
        <Link href={post.path} className="relative block aspect-[16/10] overflow-hidden bg-mist" tabIndex={-1} aria-hidden="true">
          <Img image={{ ...img, alt: "" }} fill loading="lazy" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-7">
        <H className="h-sm text-ink"><Link href={post.path} className="hover:underline">{post.title}</Link></H>
        {post.excerpt && <p className="mt-3 line-clamp-3 text-[15px] leading-[1.8] text-muted">{post.excerpt}</p>}
        <p className="mt-auto pt-6 font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-subtle">
          {post.author}{post.date ? ` · ${formatDate(post.date)}` : ""}{post.minutes ? ` · ${post.minutes} min read` : ""}
        </p>
      </div>
    </article>
  );
}

function AuthorBox({ author, settings }: { author?: SiteSettings["authors"][number]; settings: SiteSettings }) {
  if (!author?.bio) return null;
  return (
    <aside className="card mt-16 p-8 sm:p-10">
      <h2 className="h-md text-ink"><Link href={`/author/${author.slug}/`} className="hover:underline">{author.name}</Link></h2>
      {author.role && <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-ink">{author.role}</p>}
      <p className="mt-5 text-[15.5px] leading-[1.85] text-muted">{author.bio}</p>
      <p className="mt-5 text-[13px] text-subtle">{settings.businessName}</p>
    </aside>
  );
}

export function PostView({ page, settings, related }: Props & { related: PostLite[] }) {
  const author = settings.authors.find((a) => a.slug === page.authorSlug);
  const words = plainText(page.sections.flatMap((s) => s.atoms).flatMap((a) => (a._type === "rt" ? a.body : [])) as never);
  const minutes = readingTime(words);
  const img = page.featuredImage || page.heroImage;
  const cat = page.categories?.[0];
  return (
    <article className="bg-white pt-20">
      <header className="container-x pb-12 pt-14 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          {cat && <Link href={`/category/${cat}/`} className="eyebrow hover:text-ink">{cat === "blog" ? "Blog" : "Uncategorized"}</Link>}
          <h1 className="h-xl mt-7 text-ink">{page.title}</h1>
          <p className="mt-7 text-[15px] text-muted">
            {page.author && <>By {page.authorSlug ? <Link href={`/author/${page.authorSlug}/`} className="font-semibold text-ink hover:underline">{page.author}</Link> : page.author}{author?.role ? `, ${author.role}` : ""}</>}
          </p>
          <p className="mt-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-subtle">
            {page.date && <time dateTime={page.date}>{formatDate(page.date)}</time>} · {minutes} min read
          </p>
        </div>
      </header>
      {img && (
        <div className="container-x">
          <div className="media relative aspect-[16/9] lg:aspect-[21/9]">
            <Img image={img} fill preload fetchPriority="high" quality={65} sizes="(min-width: 1280px) 1200px, calc(100vw - 40px)" className="object-cover" />
          </div>
        </div>
      )}
      <div className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-[700px]">
          {page.sections.map((s) =>
            s.atoms.map((a) => (a._type === "rt" ? <RichText key={a._key} value={a.body} /> : <div key={a._key} className="my-10"><Sections sections={[{ _key: a._key, atoms: [a] }]} settings={settings} numbered={false} /></div>)),
          )}
          <AuthorBox author={author} settings={settings} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="border-t border-line/70 bg-paper">
          <div className="container-x py-20 sm:py-24">
            <h2 className="h-lg mb-12 text-ink">More from the blog</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <PostCard key={p.path} post={p} level={3} />)}</div>
          </div>
        </section>
      )}
    </article>
  );
}

export function ArchiveView({ page, settings, posts }: Props & { posts: (PostLite & { minutes?: number })[] }) {
  const hasH1 = page.sections.some((s) => s.atoms.some(isH1));
  const level = page.archive === "author" ? 3 : 2;
  const author = settings.authors[0];
  return (
    <>
      {hasH1 ? (
        <PageView page={{ ...page, heroImage: null }} settings={settings} />
      ) : (
        <section className="bg-basalt pt-20 text-white">
          <div className="container-x py-16 sm:py-24">
            <h1 className="h-xl max-w-4xl text-white">{page.heading || page.title}</h1>
            {page.sections.map((s) => s.atoms.map((a) => a._type === "rt" && <RichText key={a._key} value={a.body} plain className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.85] text-white/75" />))}
            {page.archive !== "author" && author && (
              <Link href={`/author/${author.slug}/`} className="mt-9 inline-flex flex-col rounded-2xl px-5 py-3.5 text-[14px] ring-1 ring-white/20 transition-colors hover:bg-white/5">
                <span className="font-semibold text-white">{author.name}</span>
                <span className="text-white/60">{author.role}</span>
              </Link>
            )}
          </div>
        </section>
      )}
      <section className="bg-paper">
        <div className="container-x py-16 sm:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.path} post={p} level={level} />)}</div>
        </div>
      </section>
    </>
  );
}
