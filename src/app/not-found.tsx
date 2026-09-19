import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-40 pb-24 text-center sm:px-6">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">404</p>
      <h1 className="font-display mt-4 text-5xl">That room does not exist</h1>
      <p className="mt-4 text-muted">The page may have moved. Head back to the studio floor.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-white">
        Home
      </Link>
    </section>
  );
}
