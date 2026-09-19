import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function Testimonials() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Testimonials" title="What they say" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure key={item.name} className="rounded-[1.5rem] border border-line bg-elevated p-8">
              <blockquote className="text-lg leading-8 text-ink/90">“{item.quote}”</blockquote>
              <figcaption className="mt-6">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
