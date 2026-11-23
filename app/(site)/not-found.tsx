import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center sm:py-40">
      <p className="eyebrow">404</p>
      <h1 className="display-lg mt-3">We could not find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-stone-700">The address may have changed. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-dark">Home</Link>
        <Link href="/services/" className="btn-outline">Services</Link>
        <Link href="/projects/" className="btn-outline">Projects</Link>
        <Link href="/contact/" className="btn-primary">Get a free estimate</Link>
      </div>
    </section>
  );
}
