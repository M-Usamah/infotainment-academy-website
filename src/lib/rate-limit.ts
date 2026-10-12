type Bucket = { count: number; resetAt: number };

const windows = new Map<string, Bucket>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX = 5;
// Bound memory if an attacker cycles through many keys.
const MAX_KEYS = 5000;

export function rateLimit(
  key: string,
  max = MAX,
  windowMs = WINDOW_MS,
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    if (!existing && windows.size >= MAX_KEYS) {
      for (const candidate of windows.keys()) {
        if (!candidate.startsWith("global:")) {
          windows.delete(candidate);
          break;
        }
      }
    }
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= max) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true };
}

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of windows) {
      if (bucket.resetAt <= now) windows.delete(key);
    }
  }, WINDOW_MS).unref?.();
}
