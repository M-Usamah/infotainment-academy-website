import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { jobs } from "@/lib/data";
import { site } from "@/lib/site";

const academyPath = [
  {
    stage: "Foundation",
    body: "Unreal Engine basics, C++ and Blueprints, and how a game studio pipeline works.",
  },
  {
    stage: "Apprentice",
    body: "Work on real studio tasks alongside senior developers, with code reviews on every change.",
  },
  {
    stage: "Studio developer",
    body: "Join a client project team, owning features from first prototype to delivery.",
  },
] as const;

export const metadata: Metadata = {
  title: "Careers",
  description: "Unreal developer roles and an Unreal training and apprenticeship path at Infotainment Academy in Lahore.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build PC games in Unreal with us"
        copy="Small teams, honest calendars, and work you can point at. Based in Lahore, with remote roles."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Bright studio workspace"
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <p className="text-xs tracking-[0.28em] text-signal uppercase">The Academy</p>
        <h2 className="font-display mt-3 text-4xl font-semibold">Unreal training and apprenticeship</h2>
        <p className="mt-4 max-w-2xl text-muted">
          We train and grow Unreal developers, then put them on real studio work. The path has
          three stages.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {academyPath.map((item, index) => (
            <li key={item.stage} className="rounded-[1.5rem] border border-line bg-elevated p-8">
              <p className="figure text-3xl text-signal">0{index + 1}</p>
              <h3 className="font-title mt-3 text-2xl">{item.stage}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-muted">
          To apply for a role or the apprenticeship, email your CV and a link to your work to{" "}
          <a className="text-action" href={`mailto:${site.hrEmail}`}>
            {site.hrEmail}
          </a>
          .
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 sm:px-6">
        <h2 className="font-display text-4xl font-semibold">Open roles</h2>
        {jobs.map((job) => (
          <Link
            key={job.slug}
            href={`/careers/${job.slug}`}
            className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-line bg-elevated p-8 md:flex-row md:items-center"
          >
            <div>
              <h2 className="font-title text-3xl">{job.title}</h2>
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
