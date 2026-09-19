import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function ServiceCards() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our services"
          title="What we make"
          copy="From headset to stadium, the brief is the same: make it feel real enough to remember."
        />
        <div className="mt-12 grid gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group grid overflow-hidden rounded-[1.6rem] border border-line bg-elevated md:grid-cols-[1.1fr_1fr]"
            >
              <div className="flex flex-col justify-between p-8">
                <div>
                  <p className="text-xs tracking-[0.24em] text-gold uppercase">{service.kicker}</p>
                  <h3 className="font-display mt-3 text-3xl">{service.title}</h3>
                  <p className="mt-3 max-w-xl text-muted">{service.summary}</p>
                </div>
                <span className="mt-8 text-sm text-gold">View projects →</span>
              </div>
              <div className="relative min-h-52">
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
      </div>
    </section>
  );
}
