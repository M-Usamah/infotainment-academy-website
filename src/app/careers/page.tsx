import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { jobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Infotainment Academy: engineering, art, and production.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Come make worlds with us"
        copy="Small teams, honest calendars, and work you can point at. Remote-friendly, SF-based."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Bright studio workspace"
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 sm:px-6">
        {jobs.map((job) => (
          <Link
            key={job.slug}
            href={`/careers/${job.slug}`}
            className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-line bg-elevated p-8 md:flex-row md:items-center"
          >
            <div>
              <h2 className="font-display text-3xl">{job.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {job.location} · {job.type}
              </p>
              <p className="mt-3 max-w-2xl text-muted">{job.summary}</p>
            </div>
            <span className="text-action">View role →</span>
          </Link>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
