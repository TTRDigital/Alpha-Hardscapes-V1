import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { GoogleBadge } from "@/components/ui/Rating";
import { EstimateForm } from "@/components/blocks/EstimateForm";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { TestimonialCard } from "@/components/blocks/Cards";
import { JsonLd } from "@/components/blocks/JsonLd";
import { getServices, getSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({ title: "Contact Alpha Hardscapes | Free Estimate in Cheshire, CT", description: `Call ${settings.phone} or send the form for a free on-site estimate on your patio, walkway, retaining wall, steps or outdoor living project in Connecticut.`, path: "/contact/", settings });
}

export default async function ContactPage() {
  const [settings, services, testimonials] = await Promise.all([getSettings(), getServices(), getTestimonials()]);
  const crumbs = [{ label: "Contact", href: "/contact/" }];
  const addr = settings.address;
  const mapQuery = encodeURIComponent(`${settings.businessName} ${addr?.city || "Cheshire"}, ${addr?.state || "CT"}`);
  return (
    <>
      <section className="container-x grid gap-12 py-12 lg:grid-cols-12 sm:py-16">
        <div className="lg:col-span-5">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-6">Contact</p>
          <h1 className="display-lg mt-3">Let&apos;s talk about your project</h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-700">Call, email or send the form. We will set up a free on-site visit, bring samples and send a written estimate, usually within a few days.</p>
          <div className="mt-8 space-y-4 text-[16px]">
            <a href={telHref(settings.phoneE164)} className="flex items-center gap-3 font-bold text-ink hover:text-moss"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/20 text-moss"><Icon name="phone" /></span>{settings.phone}</a>
            {settings.email && <a href={`mailto:${settings.email}`} className="flex items-center gap-3 font-semibold text-ink hover:text-moss"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/20 text-moss"><Icon name="mail" /></span>{settings.email}</a>}
            {addr && <p className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/20 text-moss"><Icon name="map" /></span><span>{addr.showStreet && addr.street ? `${addr.street}, ` : "Based in "}{addr.city}, {addr.state} {addr.zip}<br /><span className="text-sm text-stone-500">{settings.serviceAreaSummary}</span></span></p>}
          </div>
          {settings.hours && settings.hours.length > 0 && (
            <dl className="mt-8 grid max-w-sm grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-t border-ink/10 pt-6 text-[15px]">
              {settings.hours.map((h) => (<div key={h.days} className="contents"><dt className="text-stone-500">{h.days}</dt><dd className="font-semibold">{h.hours}</dd></div>))}
            </dl>
          )}
          <div className="mt-8"><GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} /></div>
        </div>
        <div className="lg:col-span-7">
          <div className="card p-6 sm:p-8">
            <p className="eyebrow">Free estimate</p>
            <h2 className="display-sm mt-2">Request your free estimate</h2>
            <EstimateForm services={services} thankYouPath={settings.formThankYouPath} source="Contact page" className="mt-6" />
          </div>
        </div>
      </section>
      <section className="bg-stone-100 py-12 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="overflow-hidden rounded-3xl bg-stone-200 lg:col-span-7">
            <iframe title={`Map of ${settings.businessName}`} src={`https://maps.google.com/maps?q=${mapQuery}&t=m&z=10&output=embed&iwloc=near`} className="h-[360px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="space-y-6 lg:col-span-5">{testimonials.slice(0, 2).map((t) => (<TestimonialCard key={t._id} t={t} compact />))}</div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
