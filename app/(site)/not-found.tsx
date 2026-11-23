import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-28 sm:py-40">
      <p className="label">404</p>
      <h1 className="h-xl mt-5 max-w-2xl">We could not find that page.</h1>
      <p className="mt-6 max-w-md text-[1.05rem] text-muted">The address may have changed. Try one of these instead.</p>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <Link href="/" className="link-arrow">Home →</Link>
        <Link href="/services/" className="link-arrow">Services →</Link>
        <Link href="/projects/" className="link-arrow">Projects →</Link>
        <Link href="/contact/" className="link-arrow">Free estimate →</Link>
      </div>
    </section>
  );
}
