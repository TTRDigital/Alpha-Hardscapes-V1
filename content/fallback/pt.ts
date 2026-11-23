import type { PortableTextBlock } from "@portabletext/react";

let n = 0;
const key = () => `k${(n++).toString(36)}`;

/**
 * Tiny markdown-ish to Portable Text converter for the built-in copy:
 * "## " heading 2, "### " heading 3, "- " bullet, "1. " number, blank line = new paragraph,
 * **bold** and [text](/path/) links inside a line.
 */
export function pt(text: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  for (const raw of text.trim().split(/\n/)) {
    const line = raw.trim();
    if (!line) continue;
    let style = "normal";
    let listItem: "bullet" | "number" | undefined;
    let body = line;
    if (line.startsWith("### ")) { style = "h3"; body = line.slice(4); }
    else if (line.startsWith("## ")) { style = "h2"; body = line.slice(3); }
    else if (line.startsWith("- ")) { listItem = "bullet"; body = line.slice(2); }
    else if (/^\d+\.\s/.test(line)) { listItem = "number"; body = line.replace(/^\d+\.\s/, ""); }
    const markDefs: { _type: string; _key: string; href: string }[] = [];
    const children: { _type: "span"; _key: string; text: string; marks: string[] }[] = [];
    const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)|([^*[]+|\*|\[)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(body))) {
      if (m[1]) children.push({ _type: "span", _key: key(), text: m[1], marks: ["strong"] });
      else if (m[2]) { const k = key(); markDefs.push({ _type: "link", _key: k, href: m[3] }); children.push({ _type: "span", _key: key(), text: m[2], marks: [k] }); }
      else if (m[4]) children.push({ _type: "span", _key: key(), text: m[4], marks: [] });
    }
    const block: PortableTextBlock = { _type: "block", _key: key(), style, markDefs, children } as PortableTextBlock;
    if (listItem) Object.assign(block, { listItem, level: 1 });
    blocks.push(block);
  }
  return blocks;
}
