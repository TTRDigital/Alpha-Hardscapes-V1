// Lead form of the season-end ad page (/patios-walkways/, a static page in public/). Sends each request to the
// GoHighLevel inbound webhook (GHL_SEASON_WEBHOOK_URL, set in the hosting settings) and to TTR OS (NEXT_PUBLIC_TTR_SITE_KEY,
// from TTR), so a lead is never lost to one side being down. Unchanged in behaviour from the live site.
const SITE_KEY = process.env.NEXT_PUBLIC_TTR_SITE_KEY?.trim() || "";
const OS_URL = (process.env.NEXT_PUBLIC_TTR_OS_URL?.trim() || "https://portal.ttrdigitalmarketing.com").replace(/\/$/, "");
const ORIGIN = "https://alphahardscapes.com";
const clean = (v: FormDataEntryValue | null, n: number) => String(v ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, n);

export async function POST(req: Request) {
  let form: FormData;
  try { form = await req.formData(); } catch { return Response.json({ ok: false, error: "Bad request." }, { status: 400 }); }
  if (clean(form.get("website"), 50)) return Response.json({ ok: true }); // honeypot: a person never fills this
  const name = clean(form.get("fullName"), 120), email = clean(form.get("email"), 160), phone = clean(form.get("phone"), 40), address = clean(form.get("projectAddress"), 240);
  const source = clean(form.get("source"), 80) || "Google Ads - Season End 2026";
  const digits = phone.replace(/\D/g, "");
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || digits.length < 10) return Response.json({ ok: false, error: "Please check your name, email and phone." }, { status: 400 });
  const ua = req.headers.get("user-agent") || "", ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const tasks: Promise<boolean>[] = [];
  const hook = process.env.GHL_SEASON_WEBHOOK_URL;
  if (hook && /^https:\/\//.test(hook)) {
    tasks.push(fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, signal: AbortSignal.timeout(5000), body: JSON.stringify({ fullName: name, email, phone, projectAddress: address, source }) }).then((r) => r.ok).catch(() => false));
  }
  if (SITE_KEY) {
    const os = new URLSearchParams({ k: SITE_KEY, p: "/patios-walkways/", r: req.headers.get("referer") || "", u: `${ORIGIN}/patios-walkways/?utm_source=google&utm_medium=cpc&utm_campaign=season-end-2026`, f_name: name, f_phone: phone, f_email: email, f_message: `${address ? `Project address: ${address}. ` : ""}${source}` });
    tasks.push(fetch(`${OS_URL}/api/site/form`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded", "user-agent": ua || "Mozilla/5.0 (alphahardscapes.com form)", "x-forwarded-for": ip, origin: ORIGIN }, body: os, signal: AbortSignal.timeout(5000) }).then((r) => r.status < 500).catch(() => false));
  }
  const done = await Promise.all(tasks);
  if (!done.some(Boolean)) return Response.json({ ok: false, error: "We could not send that. Please call (472) 203-3284." }, { status: 502 });
  return Response.json({ ok: true });
}
