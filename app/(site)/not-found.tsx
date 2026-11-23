import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x pb-28 pt-40 sm:pb-40 sm:pt-48">
      <p className="label">404</p>
      <h1 className="h-xl mt-5 max-w-2xl">We could not find that page.</h1>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <Link href="/" className="link-arrow">Home →</Link>
        <Link href="/masonry/" className="link-arrow">Masonry →</Link>
        <Link href="/gallery/" className="link-arrow">Gallery →</Link>
        <Link href="/contact/" className="link-arrow">Contact →</Link>
      </div>
    </section>
  );
}
