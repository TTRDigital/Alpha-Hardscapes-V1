"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

type Props = {
  services: { title: string; slug: string }[];
  thankYouPath?: string;
  /** Compact: fewer fields, used in the hero card. */
  compact?: boolean;
  source?: string;
  className?: string;
  dark?: boolean;
};

export function EstimateForm({ services, thankYouPath = "/thank-you/", compact, source = "Website", className = "", dark }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // honeypot
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lead/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, source, page: window.location.pathname }) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.message || "Something went wrong");
      router.push(thankYouPath);
    } catch (err) {
      setStatus("error");
      setError((err as Error).message || "Something went wrong. Please call us instead.");
    }
  }

  const input = `w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition focus:ring-2 focus:ring-lime ${dark ? "border-white/15 bg-white/10 text-stone-50 placeholder:text-stone-400 focus:border-lime" : "border-ink/15 bg-white text-ink placeholder:text-stone-400 focus:border-lime-600"}`;
  const label = `mb-1.5 block text-[13px] font-bold ${dark ? "text-stone-200" : "text-ink-700"}`;

  return (
    <form onSubmit={onSubmit} className={className} noValidate={false}>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={`${source}-name`} className={label}>Name</label>
          <input id={`${source}-name`} name="name" required autoComplete="name" placeholder="Full name" className={input} />
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className={label}>Phone</label>
          <input id={`${source}-phone`} name="phone" type="tel" required autoComplete="tel" placeholder="(203) 555-0123" className={input} />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className={label}>Email</label>
          <input id={`${source}-email`} name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={input} />
        </div>
        <div>
          <label htmlFor={`${source}-town`} className={label}>Town</label>
          <input id={`${source}-town`} name="town" required autoComplete="address-level2" placeholder="Cheshire, CT" className={input} />
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor={`${source}-service`} className={label}>What are you planning?</label>
          <select id={`${source}-service`} name="service" required defaultValue="" className={input}>
            <option value="" disabled>Choose a project type</option>
            {services.map((s) => (<option key={s.slug} value={s.title}>{s.title}</option>))}
            <option value="Other">Something else</option>
          </select>
        </div>
        {!compact && (
          <div className="sm:col-span-2">
            <label htmlFor={`${source}-message`} className={label}>Tell us about the project (optional)</label>
            <textarea id={`${source}-message`} name="message" rows={4} placeholder="Size, materials you like, timing, anything we should know" className={input} />
          </div>
        )}
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-primary mt-5 w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Request my free estimate"} <Icon name="arrow" className="h-4 w-4" />
      </button>
      {status === "error" && <p role="alert" className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      <p className={`mt-3 text-[12px] leading-relaxed ${dark ? "text-stone-400" : "text-stone-500"}`}>
        By submitting, you agree to be contacted by phone, email or text about your project. No spam, and you can opt out at any time.
      </p>
    </form>
  );
}
