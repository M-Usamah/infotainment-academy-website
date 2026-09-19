type Bucket = { count: number; resetAt: number };

const windows = new Map<string, Bucket>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX = 5;

export function rateLimit(key: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (existing.count >= MAX) {
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
