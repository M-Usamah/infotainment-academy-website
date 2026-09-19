import Image from "next/image";
import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#07080c]" />
        </>
      ) : null}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">{eyebrow}</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{copy}</p>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[linear-gradient(135deg,#1a0806,#0c1018_45%,#180a0a)] px-8 py-14 md:flex-row md:items-center">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Start a conversation</p>
          <h2 className="font-display mt-3 max-w-xl text-4xl font-semibold">
            Got an idea? Send the first scene.
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            A free strategy call. No deck required. Tell us the world, the audience, and the deadline.
          </p>
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-gold px-6 py-3 font-semibold text-white"
        >
          Let&apos;s talk
        </Link>
      </div>
    </section>
  );
}
