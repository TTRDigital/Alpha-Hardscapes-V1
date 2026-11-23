import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { CONTENT_TAG } from "@/lib/sanity/client";

export const runtime = "nodejs";

/**
 * Sanity publish webhook. Configure in sanity.io/manage > API > Webhooks:
 *   URL: https://<site>/api/revalidate   Trigger: create, update, delete   Secret: SANITY_REVALIDATE_SECRET
 * Clears the content cache for every page, and (optionally) calls a Vercel deploy hook so a
 * full rebuild runs too. See docs/deploy-and-rebuild.md.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  if (!secret) return NextResponse.json({ ok: false, message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 503 });
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
    if (!isValidSignature) return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
    revalidateTag(CONTENT_TAG, "max");
    revalidatePath("/", "layout");
    const hook = process.env.VERCEL_DEPLOY_HOOK_URL?.trim();
    let redeploy = false;
    if (hook && /^https:\/\//.test(hook)) {
      const res = await fetch(hook, { method: "POST", signal: AbortSignal.timeout(8000) }).catch(() => null);
      redeploy = Boolean(res?.ok);
    }
    return NextResponse.json({ ok: true, type: body?._type, revalidated: true, redeploy });
  } catch (err) {
    console.error("Revalidate webhook failed", err);
    return NextResponse.json({ ok: false, message: "Error" }, { status: 500 });
  }
}
