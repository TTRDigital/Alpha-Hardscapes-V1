import { NextResponse, type NextRequest } from "next/server";
import { deliverLead, verifyRecaptcha } from "@/lib/lead";
import { formByKey, getSettings } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Forms filled faster than this are bots (people need several seconds). */
const MIN_FILL_MS = 2500;
const reply = (ok: boolean, message: string, status = 200, extra: object = {}) => NextResponse.json({ ok, message, ...extra }, { status });

/**
 * Receives the site's quote forms. The fields arrive by field ID and are sent on under the live
 * form's labels (Name, Phone, Email, Project Address, ...), with the live form's name and tag, to
 * the same GoHighLevel webhook, in the same format. Then the visitor goes to that form's thank-you page.
 */
export async function POST(req: NextRequest) {
  let body: { formKey?: string; fields?: Record<string, string>; page?: string; website?: string; elapsed?: number; token?: string };
  try {
    body = await req.json();
  } catch {
    return reply(false, "Invalid request.", 400);
  }
  const settings = await getSettings();
  const form = formByKey(settings, body.formKey);
  if (!form) return reply(false, "Unknown form.", 400);
  const redirect = form.redirect || "/thank-you/";
  // Spam guard: honeypot and fill time. Bots get a normal-looking answer and nothing is sent.
  if (body.website || (typeof body.elapsed === "number" && body.elapsed < MIN_FILL_MS)) return reply(true, "ok", 200, { redirect });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!(await verifyRecaptcha(body.token || null, ip))) return reply(false, "Please try again, or call us at (475) 227-6896.", 400);

  const fields: Record<string, string> = {};
  for (const f of form.fields) {
    const raw = String(body.fields?.[f.id] ?? "").replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ").trim().slice(0, 2000);
    if (f.required && !raw) return reply(false, `Please fill in ${f.label || f.placeholder || "all required fields"}.`, 422);
    if (!raw) continue;
    const label = f.label || f.id;
    fields[label] = f.type === "acceptance" ? (f.text || "Yes") : raw;
  }
  const reachable = Object.entries(fields).some(([k, v]) => /phone|e-?mail/i.test(k) && v);
  if (!reachable) return reply(false, "Please add a phone number or email so we can reach you.", 422);

  const delivered = await deliverLead({ form: form.name, fields, page: String(body.page || req.headers.get("referer") || "").slice(0, 500), tag: form.tag });
  if (!delivered) return reply(false, "Something went wrong. Please call us at (475) 227-6896.", 502);
  return reply(true, "Your submission was successful.", 200, { redirect });
}
