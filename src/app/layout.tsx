import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Unreal Engine Game Development Team in Pakistan`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Unreal Engine game development",
    "Unreal Engine 5",
    "PC game development",
    "game co-development",
    "game development outsourcing",
    "Unreal developers Pakistan",
    "game studio Lahore",
  ],
  openGraph: {
    title: `${site.name} | Unreal Engine Game Development Team in Pakistan`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
