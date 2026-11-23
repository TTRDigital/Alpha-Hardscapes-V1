import { NextResponse, type NextRequest } from "next/server";
import { deliverLead } from "@/lib/lead";

export const runtime = "nodejs";

/** Receives the estimate form (JSON) and delivers it to GoHighLevel and/or email. */
export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot filled: pretend success
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  if (name.length < 2 || !/\d{7,}/.test(phone.replace(/\D/g, "")) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Please check your name, phone number and email." }, { status: 422 });
  }
  try {
    await deliverLead({
      name,
      phone,
      email,
      town: String(body.town || "").slice(0, 120),
      service: String(body.service || "").slice(0, 120),
      message: String(body.message || "").slice(0, 2000),
      source: String(body.source || "Website").slice(0, 80),
      page: String(body.page || "").slice(0, 200),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead delivery failed", err);
    return NextResponse.json({ ok: false, message: "We could not send your request. Please call us." }, { status: 502 });
  }
}
