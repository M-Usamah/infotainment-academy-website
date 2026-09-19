import { advantages } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function AdvantageGrid() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Business advantage"
          title="AR and games as working tools"
          copy="Not future-tech theater. Training, demos, venues, and products that have to perform on opening day."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {advantages.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-line bg-elevated p-8">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              <ul className="mt-6 grid gap-2 text-sm text-ink/85">
                {item.points.map((point) => (
                  <li key={point} className="border-t border-line pt-2">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
