import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { RichText as RichTextT, Img as ImgT } from "@/lib/types";
import { Img } from "@/components/ui/Img";

const components: PortableTextComponents = {
  types: {
    photo: ({ value }: { value: ImgT }) =>
      value?.src ? (
        <figure>
          <Img image={value} className="w-full rounded-2xl" sizes="(min-width: 1024px) 760px, 100vw" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
    callout: ({ value }: { value: { title?: string; text?: string } }) => (
      <aside className="my-8 rounded-2xl border-l-4 border-lime bg-stone-100 p-5">
        {value.title && <p className="font-bold text-ink">{value.title}</p>}
        {value.text && <p className="mt-1 !my-0 text-[15px]">{value.text}</p>}
      </aside>
    ),
    table: ({ value }: { value: { rows?: { cells?: string[] }[] } }) => (
      <div className="overflow-x-auto">
        <table>
          <tbody>
            {(value.rows || []).map((r, i) => (
              <tr key={i}>{(r.cells || []).map((c, j) => (i === 0 ? <th key={j}>{c}</th> : <td key={j}>{c}</td>))}</tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href || "#";
      const external = /^https?:\/\//.test(href) && !href.includes("alphahardscapes.com");
      if (/^(tel|mailto):/.test(href) || href.startsWith("#")) return <a href={href}>{children}</a>;
      return external || value?.newTab ? (
        <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
      ) : (
        <Link href={href.replace(/^https?:\/\/(www\.)?alphahardscapes\.com/, "")}>{children}</Link>
      );
    },
  },
  block: {
    h2: ({ children, value }) => <h2 id={slugify(value as { children?: { text?: string }[] })}>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
};

function slugify(block: { children?: { text?: string }[] }) {
  return (block.children || []).map((c) => c.text || "").join("").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}

export function RichText({ value, className = "", plain = false }: { value?: RichTextT; className?: string; plain?: boolean }) {
  if (!value?.length) return null;
  return (
    <div className={`${plain ? "" : "prose-site"} ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}

/** Headings of a rich text, for jump links. */
export function headingsOf(value?: RichTextT) {
  return (value || [])
    .filter((b) => b._type === "block" && (b as { style?: string }).style === "h2")
    .map((b) => {
      const text = ((b as { children?: { text?: string }[] }).children || []).map((c) => c.text || "").join("");
      return { text, id: slugify(b as { children?: { text?: string }[] }) };
    })
    .filter((h) => h.text);
}
