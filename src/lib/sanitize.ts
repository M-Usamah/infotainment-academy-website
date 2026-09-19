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

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  return headers.get("x-real-ip")?.slice(0, 64) ?? "unknown";
}

export function isAllowedOrigin(request: Request): boolean {
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
