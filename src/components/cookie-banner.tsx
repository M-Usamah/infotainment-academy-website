"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const KEY = "infotainment-cookie-consent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getConsent() {
  return window.localStorage.getItem(KEY);
}

export function CookieBanner() {
  const stored = useSyncExternalStore(subscribe, getConsent, () => "ssr");

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(KEY, value);
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `cookie-consent=${value}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
    window.dispatchEvent(new Event("storage"));
  }

  if (stored === "ssr" || stored) return null;

  return (
    <div className="panel fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl p-5 shadow-2xl">
      <p className="font-display text-lg">We value your privacy</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        This site uses a single essential preference cookie so we can remember your choice.
        We do not load advertising trackers. Read the{" "}
        <Link href="/cookies" className="text-gold underline-offset-2 hover:underline">
          cookie policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white"
          onClick={() => choose("accepted")}
        >
          Accept
        </button>
        <button
          type="button"
          className="rounded-full border border-line px-4 py-2 text-sm"
          onClick={() => choose("rejected")}
        >
          Reject extras
        </button>
      </div>
    </div>
  );
}
