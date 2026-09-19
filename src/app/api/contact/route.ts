import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp, isAllowedOrigin, sanitizePlainText } from "@/lib/sanitize";
import { contactSchema, fieldErrorMap } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const ip = clientIp(request.headers);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many messages. Please wait before sending another." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfter) },
      },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Unsupported media type." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Message is too large." }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read that message." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", fields: fieldErrorMap(parsed.error) },
      { status: 400 },
    );
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = {
    name: sanitizePlainText(parsed.data.name, 80),
    email: sanitizePlainText(parsed.data.email, 254),
    phone: sanitizePlainText(parsed.data.phone ?? "", 24),
    subject: sanitizePlainText(parsed.data.subject, 120),
    message: sanitizePlainText(parsed.data.message, 4000),
    receivedAt: new Date().toISOString(),
  };

  console.info("[contact] inquiry received", {
    email: inquiry.email,
    subject: inquiry.subject,
    receivedAt: inquiry.receivedAt,
  });

  return NextResponse.json({
    ok: true,
    message: "Thanks. A producer will reply within one business day.",
  });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
