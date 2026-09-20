import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="grain relative isolate min-h-screen overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-[#07080c]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-20 pt-36 sm:px-6">
        <p className="text-sm tracking-[0.35em] text-gold uppercase">Infotainment Academy</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-7xl">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
          Cinematic games, AR/VR, and architectural worlds for brands, venues, and
          publishers who want people to feel the work—not just look at it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/portfolio"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white"
          >
            View portfolio
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm text-white"
          >
            Book a strategy call
          </Link>
        </div>
      </div>
    </section>
  );
}
