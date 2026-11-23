import type { StructureResolver } from "sanity/structure";

/** Studio sidebar: the things the client edits most are at the top. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Alpha Hardscapes")
    .items([
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("archive").title("Blog list pages"),
    ]);
