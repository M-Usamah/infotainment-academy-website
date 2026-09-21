import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob, jobs } from "@/lib/data";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return { title: job.title, description: job.summary };
}

export default async function JobPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6">
      <p className="text-xs tracking-[0.28em] text-signal uppercase">
        {job.location} · {job.type}
      </p>
      <h1 className="font-display mt-4 text-5xl font-semibold text-white">{job.title}</h1>
      <p className="mt-5 text-lg text-muted">{job.summary}</p>
      <h2 className="font-display mt-10 text-2xl text-white">What you will do</h2>
      <ul className="mt-4 grid gap-3 text-muted">
        {job.duties.map((duty) => (
          <li key={duty} className="border-b border-line pb-3">
            {duty}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-muted">
        Send a short note and a link to work you are proud of to{" "}
        <a className="text-action" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
      <Link href="/contact" className="mt-8 inline-block rounded-full bg-action px-6 py-3 font-semibold text-white">
        Contact the studio
      </Link>
    </section>
  );
}
