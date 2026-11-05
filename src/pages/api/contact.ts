import type { APIRoute } from "astro";
import { sendNotification, escapeHtml } from "../../lib/notify";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) {
    return json({ ok: false, message: "Please fill in every field." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, message: "That email doesn't look right." }, 400);
  }

  const subject = `New enquiry from ${name}`;
  const text = [`Name: ${name}`, `Email: ${email}`, ``, `Message:`, message].join("\n");
  const html = `
    <p><strong>New enquiry</strong></p>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(name)}</li>
      <li><strong>Email:</strong> ${escapeHtml(email)}</li>
    </ul>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>`;

  const result = await sendNotification({ subject, text, html });
  if (result.error) {
    return json(
      { ok: false, message: "We couldn't send that just now — please email us instead." },
      502
    );
  }

  return json({ ok: true, message: "Thanks! We'll get back to you as soon as we can." });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
