function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // Ignore invalid env values and fall through.
    }
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  return "http://localhost:3000";
}

export const site = {
  name: "Infotainment Academy",
  shortName: "IA",
  tagline: "Worlds you can step into",
  description:
    "Infotainment Academy builds cinematic games, AR/VR experiences, and architectural worlds for studios, brands, and live events.",
  url: resolveSiteUrl(),
  email: "hello@infotainmentacademy.example",
  phone: "+1 (415) 555-0148",
  address: "Studio 12, Harbor Lofts, San Francisco",
  founded: 2024,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/news", label: "News" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const socialLinks = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.youtube.com", label: "YouTube" },
] as const;
