import Image from "next/image";
import Link from "next/link";
import { alsoOffered, services } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function ServiceCards({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow="Our services"
            title="What we do"
            copy="Unreal Engine work for PC games, delivered by one team that knows your pipeline."
          />
        ) : null}
        <div className={`grid gap-4 ${showHeading ? "mt-12" : ""}`}>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="surface-card group isolate grid transform-gpu overflow-hidden rounded-[1.6rem] md:grid-cols-[1.1fr_1fr]"
            >
              <div className="flex flex-col justify-between p-8">
                <div>
                  <p className="text-xs tracking-[0.24em] text-signal uppercase">{service.kicker}</p>
                  <h3 className="font-display mt-3 text-3xl">{service.title}</h3>
                  <p className="mt-3 max-w-xl text-muted">{service.summary}</p>
                </div>
                <span className="mt-8 text-sm text-action">Learn more →</span>
              </div>
              <div className="relative min-h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">Also available on request: {alsoOffered.join(", ")}.</p>
      </div>
    </section>
  );
}
