"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { FormDef } from "@/lib/types";

const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, o: { action: string }) => Promise<string> };
    dataLayer?: unknown[];
  }
}

/** reCAPTCHA v3 loads only once someone starts filling a form, so it never slows the page down. */
let recaptchaLoading: Promise<void> | null = null;
function loadRecaptcha() {
  if (!RECAPTCHA_KEY || typeof window === "undefined") return Promise.resolve();
  recaptchaLoading ??= new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_KEY)}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
  return recaptchaLoading;
}
async function recaptchaToken() {
  if (!RECAPTCHA_KEY) return "";
  await loadRecaptcha();
  const g = window.grecaptcha;
  if (!g) return "";
  return new Promise<string>((resolve) => g.ready(() => g.execute(RECAPTCHA_KEY, { action: "submit" }).then(resolve, () => resolve(""))));
}

/**
 * The live site's forms, field for field: same labels, same CRM destination and the same
 * thank-you page per form. Spam guard: hidden honeypot field, a minimum fill time and
 * reCAPTCHA (when its keys are set).
 */
export function LeadForm({ form, dark = false, className = "" }: { form: FormDef; dark?: boolean; className?: string }) {
  const id = useId();
  const started = useRef(0);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  useEffect(() => { started.current = Date.now(); }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = new FormData(el);
    const fields: Record<string, string> = {};
    for (const f of form.fields) {
      const v = f.type === "acceptance" ? (data.get(f.id) ? "on" : "") : String(data.get(f.id) ?? "").trim();
      if (v) fields[f.id] = v;
    }
    setStatus("sending");
    setError("");
    try {
      const token = await recaptchaToken();
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formKey: form.formKey, fields, page: window.location.href, website: data.get("website") || "", elapsed: Date.now() - started.current, token }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; redirect?: string; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.message || "Something went wrong. Please call us at (475) 227-6896.");
      window.dataLayer?.push({ event: "form_submit_success", form_name: form.name, form_key: form.formKey });
      window.location.assign(json.redirect || form.redirect || "/thank-you/");
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  }

  // Boxed fields on a stone background, label above: calm and easy to tap (48px tall).
  const input = `mt-2 h-12 w-full rounded-xl border-0 px-4 text-[16px] outline-none ring-1 transition-shadow placeholder:text-subtle/80 focus:ring-2 ${dark ? "bg-white/5 text-white ring-white/20 placeholder:text-white/40 focus:ring-white" : "bg-paper text-ink ring-line focus:ring-ink"}`;
  const labelCls = `block text-[13px] font-semibold ${dark ? "text-white/80" : "text-ink"}`;

  return (
    <form onSubmit={onSubmit} onFocus={() => void loadRecaptcha()} className={`grid gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5 ${className}`} noValidate={false}>
      {/* Honeypot: people never see or fill this */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {form.fields.map((f) => {
        const fid = `${id}-${f.id}`;
        const label = f.label || f.placeholder || f.id;
        if (f.type === "acceptance")
          return (
            <label key={f.id} htmlFor={fid} className={`flex gap-3 text-[12px] leading-relaxed sm:col-span-2 ${dark ? "text-white/60" : "text-muted"}`}>
              <input id={fid} name={f.id} type="checkbox" required={f.required} className="mt-1 h-4 w-4 shrink-0 accent-lime" />
              <span>{f.text || label}</span>
            </label>
          );
        if (f.type === "select")
          return (
            <div key={f.id}>
              <label htmlFor={fid} className={labelCls}>{label}</label>
              <select id={fid} name={f.id} required={f.required} defaultValue="" className={`${input} appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%236b6b66' stroke-width='1.5'/%3E%3C/svg%3E\")" }}>
                <option value="" disabled>{f.placeholder || "Select"}</option>
                {(f.options || []).map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
              </select>
            </div>
          );
        if (f.type === "textarea")
          return (
            <div key={f.id} className="sm:col-span-2">
              <label htmlFor={fid} className={labelCls}>{label}</label>
              <textarea id={fid} name={f.id} required={f.required} placeholder={f.placeholder} rows={3} className={`${input} h-auto py-3`} />
            </div>
          );
        const type = f.type === "tel" || f.type === "email" ? f.type : "text";
        const auto = type === "tel" ? "tel" : type === "email" ? "email" : /name/i.test(label) ? "name" : /address/i.test(label) ? "street-address" : /zip/i.test(label) ? "postal-code" : undefined;
        return (
          <div key={f.id} className={/address|message/i.test(label) ? "sm:col-span-2" : ""}>
            <label htmlFor={fid} className={labelCls}>{label}{f.required ? <span aria-hidden="true"> *</span> : null}</label>
            <input id={fid} name={f.id} type={type} required={f.required} placeholder={f.placeholder} autoComplete={auto} inputMode={type === "tel" ? "tel" : undefined} className={input} />
          </div>
        );
      })}
      <div className="pt-1 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className={`${dark ? "btn-lime" : "btn-primary"} w-full disabled:opacity-60`}>
          {status === "sending" ? "Sending…" : form.button || "Send"}
        </button>
        <p role="status" aria-live="polite" className={`mt-3 text-sm ${dark ? "text-lime" : "text-red-700"}`}>{status === "error" ? error : ""}</p>
      </div>
    </form>
  );
}
