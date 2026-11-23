import "server-only";

/**
 * Delivers a website estimate request. Destinations are configured with environment
 * variables (see .env.example): GHL_WEBHOOK_URL (GoHighLevel inbound webhook) and/or
 * RESEND_API_KEY + LEAD_EMAIL_TO. With neither set, the lead is logged to the server
 * console so a preview deployment still "works".
 */
export type Lead = { name: string; phone: string; email: string; town: string; service: string; message: string; source: string; page: string };

function phoneE164(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  return raw.trim();
}

async function post(url: string, init: RequestInit) {
  let last: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(8000), cache: "no-store" });
      if (res.ok) return;
      last = new Error(`${new URL(url).host} answered ${res.status}`);
      if (res.status !== 429 && res.status < 500) break;
    } catch (err) {
      last = err;
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw last;
}

export async function deliverLead(lead: Lead) {
  const [first, ...rest] = lead.name.split(/\s+/);
  const tasks: Promise<void>[] = [];
  const webhook = process.env.GHL_WEBHOOK_URL?.trim();
  if (webhook && /^https:\/\//.test(webhook)) {
    tasks.push(
      post(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: lead.source,
          form: "Website estimate form",
          tags: ["website-lead"],
          submitted_at: new Date().toISOString(),
          name: lead.name,
          first_name: first || "",
          last_name: rest.join(" "),
          email: lead.email,
          phone: phoneE164(lead.phone),
          phone_raw: lead.phone,
          city: lead.town,
          service: lead.service,
          message: lead.message,
          page: lead.page,
        }),
      }),
    );
  }
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.LEAD_EMAIL_TO?.trim();
  if (resendKey && to) {
    const from = process.env.LEAD_EMAIL_FROM?.trim() || "Alpha Hardscapes Website <onboarding@resend.dev>";
    const rows = Object.entries({ Name: lead.name, Phone: lead.phone, Email: lead.email, Town: lead.town, Service: lead.service, Message: lead.message, Page: lead.page, Source: lead.source })
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${k}</td><td style="padding:4px 0"><b>${escapeHtml(v)}</b></td></tr>`)
      .join("");
    tasks.push(
      post("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()),
          reply_to: lead.email,
          subject: `New estimate request: ${lead.service || "project"} in ${lead.town || "CT"} (${lead.name})`,
          html: `<h2 style="font-family:sans-serif">New website lead</h2><table style="font-family:sans-serif;font-size:15px">${rows}</table>`,
        }),
      }),
    );
  }
  if (!tasks.length) {
    console.info("[lead] no destination configured; lead:", { ...lead, message: lead.message.slice(0, 80) });
    return;
  }
  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length === results.length) throw (failed[0] as PromiseRejectedResult).reason;
  for (const f of failed) console.error("[lead] one destination failed", (f as PromiseRejectedResult).reason);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);
}
