import Link from "next/link";
import { navLinks, site, socialLinks } from "@/lib/site";
import { services } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-[#080910] px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-2xl">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            {site.tagline}. Games, spatial experiences, and architectural worlds from one studio.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">Company</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink/90 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">Work</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-ink/90 hover:text-gold">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">Legal</p>
          <ul className="mt-4 grid gap-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-gold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-gold">
                Cookie Policy
              </Link>
            </li>
          </ul>
          <div className="mt-6 flex gap-3 text-sm text-muted">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                className="hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
