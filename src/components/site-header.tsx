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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-2xl bg-white px-2.5 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
        >
          <Image
            src="/logo.png"
            alt={`${site.name} logo`}
            width={152}
            height={138}
            className="h-11 w-auto object-contain sm:h-12"
            priority
          />
          <span className="sr-only">{site.name}</span>
        </Link>

        <nav className="panel hidden items-center gap-1 rounded-full px-2 py-2 lg:flex">
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
                  active ? "bg-action text-white" : "text-muted hover:text-ink"
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
            className="hidden rounded-full bg-action px-4 py-2 text-sm font-semibold text-white transition hover:bg-action-strong sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="panel rounded-full px-3 py-2 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="panel mx-4 mb-4 rounded-3xl p-4 lg:hidden">
          <nav className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-base text-ink hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-full bg-action px-4 py-3 text-center font-semibold text-white"
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
