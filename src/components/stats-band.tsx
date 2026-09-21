import { stats } from "@/lib/data";

export function StatsBand() {
  return (
    <section className="border-y border-line bg-elevated/70 px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-5xl text-signal">{stat.value}</p>
            <p className="mt-2 text-sm tracking-wide text-muted uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
