const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const TAGS = /<\/?[^>]+>/g;

export function sanitizePlainText(value: string, max = 4000): string {
  return value
    .replace(TAGS, "")
    .replace(CONTROL, "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, max);
}

// Prefer headers set by the hosting proxy. The leftmost X-Forwarded-For entry is
// client-controlled, so only the rightmost (closest proxy) entry is trusted.
export function clientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);

  const vercel = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercel) return vercel.slice(0, 64);

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const last = forwarded.split(",").at(-1)?.trim();
    if (last) return last.slice(0, 64);
  }
  return "unknown";
}

export function isJsonContentType(headers: Headers): boolean {
  const essence = (headers.get("content-type") ?? "").split(";")[0]?.trim().toLowerCase();
  return essence === "application/json";
}

export class BodyTooLargeError extends Error {}

// Reads the body as a stream and aborts once `max` bytes are exceeded, so a
// missing or false Content-Length header cannot bypass the size limit.
export async function readJsonLimited(request: Request, max: number): Promise<unknown> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > max) throw new BodyTooLargeError();
  if (!request.body) return JSON.parse("");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      throw new BodyTooLargeError();
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function isAllowedOrigin(request: Request): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return false;
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin) {
    return true;
  }

  try {
    const originHost = new URL(origin).host;
    if (host && originHost === host) {
      return true;
    }
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (configured) {
      try {
        return originHost === new URL(configured).host;
      } catch {
        return false;
      }
    }
    const vercel = process.env.VERCEL_URL?.trim();
    if (vercel) {
      return originHost === vercel.replace(/^https?:\/\//, "");
    }
  } catch {
    return false;
  }

  return false;
}
