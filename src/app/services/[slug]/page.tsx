import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/page-hero";
import { getService, services } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="relative isolate min-h-[60vh] overflow-hidden pt-32">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-depth/40 to-bg" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <p className="text-xs tracking-[0.28em] text-signal uppercase">{service.kicker}</p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl font-semibold text-white">{service.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">{service.summary}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg leading-8 text-muted">{service.description}</p>
          <Link href="/portfolio" className="mt-8 inline-block text-action">
            See related work →
          </Link>
        </div>
        <ul className="rounded-[1.5rem] border border-line bg-elevated p-8">
          {service.outcomes.map((item) => (
            <li key={item} className="border-b border-line py-3 last:border-0">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
