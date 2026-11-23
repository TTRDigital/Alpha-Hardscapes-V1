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

  // Underlined fields: calm, modern, still clearly tappable (48px tall).
  const input = `h-12 w-full border-0 border-b bg-transparent px-0 text-[16px] outline-none transition-colors placeholder:text-subtle focus:ring-0 ${dark ? "border-white/25 text-white focus:border-white" : "border-line text-ink focus:border-ink"}`;
  const label = `block text-[13px] ${dark ? "text-white/60" : "text-muted"}`;

  return (
    <form onSubmit={onSubmit} className={className} noValidate={false}>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className={`grid gap-x-8 gap-y-6 ${compact ? "" : "sm:grid-cols-2"}`}>
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
          <select id={`${source}-service`} name="service" required defaultValue="" className={`${input} appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b6b66' fill='none' stroke-width='1.5'/%3E%3C/svg%3E\")" }}>
            <option value="" disabled>Choose a project type</option>
            {services.map((s) => (<option key={s.slug} value={s.title}>{s.title}</option>))}
            <option value="Other">Something else</option>
          </select>
        </div>
        {!compact && (
          <div className="sm:col-span-2">
            <label htmlFor={`${source}-message`} className={label}>Tell us about the project (optional)</label>
            <textarea id={`${source}-message`} name="message" rows={3} placeholder="Size, materials you like, timing" className={`${input} h-auto py-3`} />
          </div>
        )}
      </div>
      <button type="submit" disabled={status === "sending"} className={`mt-10 w-full disabled:opacity-60 sm:w-auto ${dark ? "btn-lime" : "btn-primary"}`}>
        {status === "sending" ? "Sending…" : "Request my free estimate"} <Icon name="arrow" className="h-4 w-4" />
      </button>
      {status === "error" && <p role="alert" className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      <p className={`mt-4 max-w-md text-[12px] leading-relaxed ${dark ? "text-white/40" : "text-subtle"}`}>
        By submitting, you agree to be contacted by phone, email or text about your project. No spam, and you can opt out at any time.
      </p>
    </form>
  );
}
