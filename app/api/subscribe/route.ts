// Server-side API route: POST /api/subscribe
// Validates name + email, then adds the subscriber to MailerLite via the Connect API.
// The API key and group ID are read from environment variables and never exposed to the client.

import { NextRequest, NextResponse } from "next/server";

const MAILERLITE_API_URL = "https://connect.mailerlite.com/api/subscribers";

// ── Validation ────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInput(
  email: unknown,
  name: unknown,
): { valid: true; email: string; name: string } | { valid: false; field: "email" | "name" } {
  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return { valid: false, field: "email" };
  }

  const trimmedName = typeof name === "string" ? name.trim() : "";

  // Name is optional, but if provided it must be at least 2 characters
  if (trimmedName.length > 0 && trimmedName.length < 2) {
    return { valid: false, field: "name" };
  }

  return { valid: true, email: email.trim().toLowerCase(), name: trimmedName };
}

// ── MailerLite call ───────────────────────────────────────────────────────────

async function callMailerLite(email: string, name: string): Promise<{ ok: boolean; status: number }> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    console.error("[subscribe] Missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID env vars");
    return { ok: false, status: 500 };
  }

  const payload = {
    email,
    fields: { name },
    // Adding the subscriber to this group triggers the MailerLite automation
    groups: [groupId],
  };

  const res = await fetch(MAILERLITE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  // MailerLite returns 200 (update) or 201 (create) on success.
  // Duplicate emails are handled gracefully — the subscriber is updated, not duplicated.
  if (res.ok) {
    return { ok: true, status: res.status };
  }

  // Log details server-side only — never forward the raw MailerLite error to the client
  const body = await res.text().catch(() => "(unreadable body)");
  console.error(`[subscribe] MailerLite error ${res.status}:`, body);
  return { ok: false, status: res.status };
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { email, name } = body as Record<string, unknown>;
  const validation = validateInput(email, name);

  if (!validation.valid) {
    return NextResponse.json(
      { error: "invalid_input", field: validation.field },
      { status: 422 },
    );
  }

  const result = await callMailerLite(validation.email, validation.name);

  if (!result.ok) {
    // Treat missing env vars as a server configuration error
    if (result.status === 500) {
      return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
    }
    return NextResponse.json({ error: "subscription_failed" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
