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
  const interest = String(body?.interest ?? "").trim();

  if (!name || !email) {
    return json({ ok: false, message: "Please add your name and email." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, message: "That email doesn't look right." }, 400);
  }

  const subject = `New waiting-list signup: ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Interest: ${interest || "(not specified)"}`,
  ].join("\n");
  const html = `
    <p><strong>New waiting-list signup</strong></p>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(name)}</li>
      <li><strong>Email:</strong> ${escapeHtml(email)}</li>
      <li><strong>Interest:</strong> ${escapeHtml(interest || "not specified")}</li>
    </ul>`;

  const result = await sendNotification({ subject, text, html });
  if (result.error) {
    return json(
      { ok: false, message: "We couldn't send that just now — please email us instead." },
      502
    );
  }

  return json({
    ok: true,
    message: "Thanks! You're on the list — we'll be in touch when classes open.",
  });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
