import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="grain relative isolate min-h-screen overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-depth/50 via-bg/60 to-bg" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-20 pt-36 sm:px-6">
        <p className="text-xs tracking-[0.3em] text-signal uppercase sm:text-sm">
          Infotainment Academy
          <span className="text-ink/70"> in collaboration with </span>
          2 AA Studios
        </p>
        <h1 className="font-display mt-4 max-w-4xl text-4xl leading-[1.1] font-semibold text-balance text-ink sm:text-5xl lg:text-6xl">
          {site.tagline}.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          A dedicated Unreal team that plugs into your pipeline, starts from ready code, and
          delivers to your brief.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="btn-action rounded-full px-6 py-3 text-sm font-semibold"
          >
            Book a pilot call
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-line px-6 py-3 text-sm text-ink transition hover:border-signal hover:text-white"
          >
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
