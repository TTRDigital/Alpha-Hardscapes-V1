export const metadata = { title: "Alpha Hardscapes CMS", robots: { index: false, follow: false } };

/** The Studio has its own root layout so the site header and footer do not wrap it. */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: "100vh" }}>{children}</div>;
}
