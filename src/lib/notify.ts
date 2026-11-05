// Server-side helper: reads Cloudflare bindings / local env and sends
// notifications via Resend. Dormant until RESEND_API_KEY is configured —
// without it, messages are logged locally and the form still returns success
// so the flow can be tested end-to-end.

import { env as cloudflareEnv } from "cloudflare:workers";

export function getEnv(name: string): string | undefined {
  const value = (cloudflareEnv as unknown as Record<string, unknown>)[name];
  if (typeof value === "string" && value) {
    return value;
  }
  // Local development fallback.
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }
  return undefined;
}

export async function sendNotification(
  opts: { subject: string; text: string; html: string }
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = getEnv("RESEND_API_KEY");
  const to = getEnv("CONTACT_EMAIL");
  const from = getEnv("FROM_EMAIL") ?? "Tiny Touch & Tastes <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.log(
      `[notify] RESEND not configured — would send to ${to ?? "(no CONTACT_EMAIL)"}:\n` +
        `  subject: ${opts.subject}\n  text: ${opts.text.replace(/\n/g, " ")}`
    );
    return { sent: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[notify] Resend error:", res.status, body);
      return { sent: false, error: `Resend returned ${res.status}` };
    }
    return { sent: true };
  } catch (err: any) {
    console.error("[notify] Resend request failed:", err?.message ?? err);
    return { sent: false, error: "email request failed" };
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
