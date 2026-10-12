import { stats } from "@/lib/data";

export function StatsBand() {
  return (
    <section className="border-y border-line bg-elevated/70 px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col justify-end">
            <p className="figure text-4xl text-signal sm:text-5xl">{stat.value}</p>
            <p className="mt-3 text-xs tracking-wide sm:text-sm text-muted uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
