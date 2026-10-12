import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  BodyTooLargeError,
  clientIp,
  isAllowedOrigin,
  isJsonContentType,
  readJsonLimited,
  sanitizePlainText,
} from "@/lib/sanitize";
import { contactSchema, fieldErrorMap } from "@/lib/validation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const GLOBAL_MAX = 50;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;

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

  if (!isJsonContentType(request.headers)) {
    return NextResponse.json({ error: "Unsupported media type." }, { status: 415 });
  }

  let raw: unknown;
  try {
    raw = await readJsonLimited(request, MAX_BODY_BYTES);
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return NextResponse.json({ error: "Message is too large." }, { status: 413 });
    }
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

  const global = rateLimit("global:contact", GLOBAL_MAX, GLOBAL_WINDOW_MS);
  if (!global.ok) {
    return NextResponse.json(
      { error: "We are receiving a lot of messages. Please email us directly." },
      { status: 429, headers: { "Retry-After": String(global.retryAfter) } },
    );
  }

  const inquiry = {
    name: sanitizePlainText(parsed.data.name, 80),
    email: sanitizePlainText(parsed.data.email, 254),
    phone: sanitizePlainText(parsed.data.phone ?? "", 24),
    inquiryType: parsed.data.inquiryType,
    subject: sanitizePlainText(parsed.data.subject, 120),
    message: sanitizePlainText(parsed.data.message, 4000),
  };

  console.info("[contact] inquiry accepted", { receivedAt: new Date().toISOString() });

  // Web3Forms' free plan only accepts browser submissions, so the client delivers
  // this sanitized copy rather than the raw form values.
  return NextResponse.json({
    ok: true,
    message: "Thanks. We will reply within one business day.",
    inquiry,
  });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
