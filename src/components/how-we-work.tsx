import { howWeWork } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function HowWeWork() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How we work"
          title="Four steps from brief to build"
          copy="The same process for a four-week pilot or a full co-development team."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWork.map((item) => (
            <li key={item.step} className="rounded-[1.5rem] border border-line bg-elevated p-8">
              <p className="figure text-4xl text-signal">{item.step}</p>
              <h3 className="font-display mt-4 text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
