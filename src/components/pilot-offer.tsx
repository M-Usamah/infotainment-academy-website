import Link from "next/link";

const points = [
  "One Unreal task with a fixed scope and price",
  "A playable result in 4–6 weeks",
  "Weekly builds and a progress report",
  "You keep the work, whatever you decide next",
];

export function PilotOffer() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="surface-card mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs tracking-[0.28em] text-signal uppercase">Paid pilot</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            Test us on one Unreal task in 4–6 weeks
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            The lowest-risk way to find out if we fit your team. Pick a real task from your backlog
            and judge us on the result.
          </p>
          <Link
            href="/contact"
            className="btn-action mt-8 inline-block rounded-full px-6 py-3 text-sm font-semibold"
          >
            Book a pilot call
          </Link>
        </div>
        <ul className="grid gap-3 text-ink/90">
          {points.map((point) => (
            <li key={point} className="border-b border-line pb-3 last:border-0">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
