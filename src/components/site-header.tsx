"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="header-glass fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo-mark-light.png"
            alt=""
            width={128}
            height={128}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            priority
          />
          <span className="font-display text-sm leading-tight font-semibold tracking-tight text-ink sm:text-base">
            Infotainment
            <span className="block text-signal">Academy</span>
          </span>
          <span className="sr-only">{site.name}</span>
        </Link>

        <nav className="nav-glass hidden items-center gap-1 rounded-full px-2 py-2 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-action text-white shadow-[0_6px_20px_var(--glow-action)]"
                    : "text-muted hover:bg-white/10 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="btn-action hidden rounded-full px-4 py-2 text-sm font-semibold sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="nav-glass rounded-full px-3 py-2 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="nav-glass mx-4 mb-4 rounded-3xl p-4 lg:hidden">
          <nav className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-base text-ink hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-action mt-2 rounded-full px-4 py-3 text-center font-semibold"
              onClick={() => setOpen(false)}
            >
              Book a strategy call
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
