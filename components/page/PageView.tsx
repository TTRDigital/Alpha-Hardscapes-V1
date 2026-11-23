import Link from "next/link";
import type { Atom, BoxAtom, ButtonAtom, HeadingAtom, Img as ImgT, Page, Section, SiteSettings } from "@/lib/types";
import { RichText } from "@/components/blocks/RichText";
import { Img } from "@/components/ui/Img";
import { HeroVideo } from "@/components/blocks/HeroVideo";
import { formatDate, plainText, readingTime } from "@/lib/site";
import { Buttons, FormCard, Heading, PhoneLink, isPhoneBox } from "./atoms";
import { Sections, toRuns } from "./Sections";

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

function HeroText({ atoms, dark }: { atoms: Atom[]; dark?: boolean }) {
  const runs = toRuns(atoms);
  return (
    <>
      {runs.map((r, i) => {
        if (r.kind === "buttons") return <Buttons key={i} items={r.atoms as ButtonAtom[]} dark={dark} className="mt-9" />;
        if (r.kind !== "text") return null;
        return (
          <div key={i}>
            {r.atoms.map((a, j) => {
              if (a._type === "hdg") return <Heading key={a._key} a={a} dark={dark} className={`${a.level === 1 ? (dark ? "h-display text-white" : "h-xl") : a.level >= 5 ? "mb-5" : `mt-6 ${dark ? "text-white" : ""}`} max-w-4xl`} />;
              if (a._type === "rt") return <RichText key={a._key} value={a.body} plain className={`mt-6 max-w-2xl text-[1.1rem] leading-relaxed sm:text-[1.2rem] ${dark ? "text-white/80" : "text-muted"} [&_a]:underline [&_p+p]:mt-3`} />;
              if (isPhoneBox(a)) return <div key={a._key} className="mt-5"><PhoneLink a={a as BoxAtom} dark={dark} /></div>;
              if (a._type === "list") return null;
              return j < 0 ? null : null;
            })}
          </div>
        );
      })}
    </>
  );
}

const heroTextTypes = new Set(["hdg", "rt", "btn", "box"]);

export function PageView({ page, settings }: Props) {
  const { hero, rest } = splitHero(page);
  const heroImg = page.heroImage;
  const sections = withoutImage(rest, heroImg);
  if (!hero) {
    return (
      <div className="pt-[72px]">
        <Sections sections={sections} settings={settings} />
      </div>
    );
  }
  const textAtoms = hero.atoms.filter((a) => heroTextTypes.has(a._type) && !(a._type === "box" && !isPhoneBox(a)));
  const formAtom = hero.atoms.find((a) => a._type === "form");
  const formHeading = formAtom ? hero.atoms.find((a, i) => a._type === "hdg" && a.level > 1 && hero.atoms[i + 1] === formAtom) as HeadingAtom | undefined : undefined;
  const others = hero.atoms.filter((a) => !textAtoms.includes(a) && a !== formAtom && a !== formHeading);
  const mainText = textAtoms.filter((a) => a !== formHeading);
  return (
    <>
      <section className="pt-[72px]">
        <div className={`container-x grid gap-10 pb-12 pt-12 sm:pt-20 lg:grid-cols-12 lg:items-end ${heroImg ? "" : "pb-4"}`}>
          <div className={formAtom ? "lg:col-span-7" : "lg:col-span-10"}>
            <HeroText atoms={mainText} />
          </div>
          {formAtom && formAtom._type === "form" && (
            <div className="lg:col-span-5">
              <FormCard formKey={formAtom.formKey} settings={settings} heading={formHeading} />
            </div>
          )}
        </div>
        {heroImg && (
          <div className="container-x">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist sm:aspect-[16/9] lg:aspect-[21/9]">
              <Img image={heroImg} fill preload fetchPriority="high" quality={75} sizes="(min-width: 1320px) 1240px, calc(100vw - 40px)" className="object-cover" />
            </div>
          </div>
        )}
        {others.length > 0 && <div className="container-x pt-12"><Sections sections={[{ _key: "hero-rest", atoms: others }]} settings={settings} /></div>}
      </section>
      <div className={heroImg ? "mt-20 sm:mt-24" : "mt-8"}>
        <Sections sections={sections} settings={settings} />
      </div>
    </>
  );
}

/** Home: full-bleed background video (the live site's clip) behind the H1 and the quote form. */
export function HomeView({ page, settings }: Props) {
  const { hero, rest } = splitHero(page);
  if (!hero) return <PageView page={page} settings={settings} />;
  const formAtom = hero.atoms.find((a) => a._type === "form");
  const formHeading = formAtom ? (hero.atoms.find((a, i) => a._type === "hdg" && a.level > 1 && hero.atoms[i + 1] === formAtom) as HeadingAtom | undefined) : undefined;
  const text = hero.atoms.filter((a) => a !== formAtom && a !== formHeading);
  const poster = settings.heroPoster;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {poster && <Img image={poster} fill preload fetchPriority="high" sizes="100vw" quality={75} className="-z-20 object-cover" />}
        {settings.heroVideoUrl && <HeroVideo src={settings.heroVideoUrl} />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/40" aria-hidden="true" />
        <div className="container-x grid min-h-[100svh] gap-12 pb-14 pt-32 lg:grid-cols-12 lg:items-end lg:pb-20">
          <div className="lg:col-span-7">
            <HeroText atoms={text} dark />
          </div>
          {formAtom && formAtom._type === "form" && (
            <div className="lg:col-span-5">
              <FormCard formKey={formAtom.formKey} settings={settings} heading={formHeading} dark />
            </div>
          )}
        </div>
      </section>
      <Sections sections={rest} settings={settings} />
    </>
  );
}

type PostLite = Pick<Page, "title" | "path" | "date" | "author" | "authorSlug" | "excerpt" | "featuredImage" | "heroImage">;

export function PostCard({ post, level = 2 }: { post: PostLite & { minutes?: number }; level?: 2 | 3 }) {
  const H = `h${level}` as "h2";
  const img = post.featuredImage || post.heroImage;
  return (
    <article className="group flex flex-col">
      {img && (
        <Link href={post.path} className="relative mb-5 block aspect-[4/3] overflow-hidden rounded-xl bg-mist" tabIndex={-1} aria-hidden="true">
          <Img image={{ ...img, alt: "" }} fill loading="lazy" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </Link>
      )}
      <H className="h-sm"><Link href={post.path} className="hover:underline">{post.title}</Link></H>
      {post.excerpt && <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>}
      <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.06em] text-subtle">
        {post.author}{post.date ? ` · ${formatDate(post.date)}` : ""}{post.minutes ? ` · ${post.minutes} min read` : ""}
      </p>
    </article>
  );
}

function AuthorBox({ author, settings }: { author?: SiteSettings["authors"][number]; settings: SiteSettings }) {
  if (!author?.bio) return null;
  return (
    <aside className="mt-16 rounded-2xl bg-mist p-7 sm:p-9">
      <h2 className="h-sm"><Link href={`/author/${author.slug}/`} className="hover:underline">{author.name}</Link></h2>
      {author.role && <p className="mt-1 text-[14px] text-muted">{author.role}</p>}
      <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700">{author.bio}</p>
      <p className="mt-4 text-[14px] text-muted">{settings.businessName}</p>
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
    <article className="pt-[72px]">
      <header className="container-x pb-10 pt-12 sm:pt-20">
        {cat && <Link href={`/category/${cat}/`} className="label hover:text-ink">{cat === "blog" ? "Blog" : "Uncategorized"}</Link>}
        <h1 className="h-xl mt-5 max-w-4xl">{page.title}</h1>
        <p className="mt-6 text-[15px] text-muted">
          {page.author && <>By {page.authorSlug ? <Link href={`/author/${page.authorSlug}/`} className="font-medium text-ink hover:underline">{page.author}</Link> : page.author}{author?.role ? `, ${author.role}` : ""}</>}
        </p>
        <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-subtle">
          {page.date && <time dateTime={page.date}>{formatDate(page.date)}</time>} · {minutes} min read
        </p>
      </header>
      {img && (
        <div className="container-x">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-mist lg:aspect-[21/9]">
            <Img image={img} fill preload fetchPriority="high" quality={75} sizes="(min-width: 1320px) 1240px, calc(100vw - 40px)" className="object-cover" />
          </div>
        </div>
      )}
      <div className="container-x py-16 sm:py-20">
        <div className="mx-auto max-w-[720px]">
          {page.sections.map((s) =>
            s.atoms.map((a) => (a._type === "rt" ? <RichText key={a._key} value={a.body} /> : <div key={a._key} className="my-10"><Sections sections={[{ _key: a._key, atoms: [a] }]} settings={settings} /></div>)),
          )}
          <AuthorBox author={author} settings={settings} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="border-t border-line">
          <div className="container-x py-20">
            <h2 className="h-md mb-10">More from the blog</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <PostCard key={p.path} post={p} level={3} />)}</div>
          </div>
        </section>
      )}
    </article>
  );
}

export function ArchiveView({ page, settings, posts }: Props & { posts: (PostLite & { minutes?: number })[] }) {
  const hasH1 = page.sections.some((s) => s.atoms.some(isH1));
  const level = page.archive === "author" ? 3 : 2;
  return (
    <div className="pt-[72px]">
      {!hasH1 && (
        <header className="container-x pb-4 pt-12 sm:pt-20">
          <h1 className="h-xl max-w-4xl">{page.heading || page.title}</h1>
        </header>
      )}
      {hasH1 ? (
        <PageView page={{ ...page, heroImage: null }} settings={settings} />
      ) : (
        page.sections.map((s) => s.atoms.map((a) => a._type === "rt" && <div key={a._key} className="container-x"><RichText value={a.body} plain className="max-w-2xl text-[1.15rem] leading-relaxed text-muted" /></div>))
      )}
      {page.archive !== "author" && settings.authors[0] && (
        <div className="container-x mt-8">
          <Link href={`/author/${settings.authors[0].slug}/`} className="inline-flex flex-col rounded-xl bg-mist px-5 py-3 text-[14px] hover:bg-line/60">
            <span className="font-medium text-ink">{settings.authors[0].name}</span>
            <span className="text-muted">{settings.authors[0].role}</span>
          </Link>
        </div>
      )}
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.path} post={p} level={level} />)}</div>
      </section>
    </div>
  );
}
