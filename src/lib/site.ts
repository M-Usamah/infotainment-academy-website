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
  tagline: "Unreal Engine PC game development, built in Pakistan for global studios",
  description:
    "Unreal Engine game development team in Pakistan. Infotainment Academy builds PC games in Unreal Engine 5 for global studios and trains the developers who make them.",
  url: resolveSiteUrl(),
  email: "support@infotainmentacademy.live",
  hrEmail: "hr@infotainmentacademy.live",
  city: "Lahore, Pakistan",
  timezone: "PKT (UTC+5): full overlap with UK and European working hours, and US East Coast mornings",
  founded: 2026,
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
  { href: "https://www.linkedin.com/company/infotainment-academy/", label: "LinkedIn" },
  { href: "https://www.instagram.com/infotainment_academy/", label: "Instagram" },
  { href: "https://www.facebook.com/share/1FpoTJtogp/", label: "Facebook" },
] as const;
