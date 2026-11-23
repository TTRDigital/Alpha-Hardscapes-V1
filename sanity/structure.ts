import type { StructureResolver } from "sanity/structure";

/** Studio sidebar: the things the client edits most are at the top. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Alpha Hardscapes")
    .items([
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().title("Home page").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem().title("About page").id("aboutPage").child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("project").title("Projects & gallery"),
      S.documentTypeListItem("testimonial").title("Reviews"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("serviceArea").title("Service areas"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.divider(),
      S.documentTypeListItem("page").title("Other pages (privacy, terms...)"),
    ]);
