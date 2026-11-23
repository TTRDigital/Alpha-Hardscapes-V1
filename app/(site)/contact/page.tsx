import type { Metadata } from "next";
import { EstimateForm } from "@/components/blocks/EstimateForm";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/blocks/Breadcrumbs";
import { JsonLd } from "@/components/blocks/JsonLd";
import { GoogleBadge } from "@/components/ui/Rating";
import { getServices, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({ title: "Contact Alpha Hardscapes | Free Estimate in Cheshire, CT", description: `Call ${settings.phone} or send the form for a free on-site estimate on your patio, walkway, retaining wall, steps or outdoor living project in Connecticut.`, path: "/contact/", settings });
}

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const crumbs = [{ label: "Contact", href: "/contact/" }];
  const addr = settings.address;
  return (
    <>
      <section className="container-x pb-24 pt-10 sm:pb-32 sm:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 grid gap-16 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label">Contact</p>
            <h1 className="h-xl mt-5">Let&apos;s talk about your project.</h1>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">Send the form or call. We will set up a free visit, bring samples and send a written estimate, usually within a few days.</p>
            <a href={telHref(settings.phoneE164)} className="mt-12 block text-[2.2rem] font-medium tracking-[-0.035em] tabular-nums hover:text-muted sm:text-[2.8rem]">{settings.phone}</a>
            {settings.email && <a href={`mailto:${settings.email}`} className="mt-2 block text-[16px] text-muted hover:text-ink">{settings.email}</a>}
            <dl className="mt-12 grid gap-6 border-t border-line pt-6 text-[15px] sm:grid-cols-2">
              {addr && (<div><dt className="text-[13px] text-subtle">Based in</dt><dd className="mt-1">{addr.showStreet && addr.street ? `${addr.street}, ` : ""}{addr.city}, {addr.state} {addr.zip}</dd></div>)}
              {settings.serviceAreaSummary && (<div><dt className="text-[13px] text-subtle">Serving</dt><dd className="mt-1">{settings.serviceAreaSummary}</dd></div>)}
              {settings.hours && settings.hours.length > 0 && (<div className="sm:col-span-2"><dt className="text-[13px] text-subtle">Hours</dt><dd className="mt-1">{settings.hours.map((h) => `${h.days}: ${h.hours}`).join(" · ")}</dd></div>)}
            </dl>
            <div className="mt-8"><GoogleBadge rating={settings.googleRating} count={settings.googleReviewCount} href={settings.googleBusinessUrl} /></div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-lg bg-white p-6 ring-1 ring-line sm:p-10">
              <h2 className="h-md">Request a free estimate</h2>
              <p className="mt-2 text-[15px] text-muted">We reply within one business day.</p>
              <EstimateForm services={services} thankYouPath={settings.formThankYouPath} source="Contact page" className="mt-10" />
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
