import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/page-hero";
import { getProject, projects } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative isolate min-h-[62vh] overflow-hidden pt-32">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-[#07080c]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">{project.category}</p>
          <h1 className="font-display mt-4 text-5xl font-semibold">{project.title}</h1>
          <p className="mt-4 text-white/75">
            {project.client} · {project.year}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xl leading-8 text-ink/90">{project.summary}</p>
        <p className="mt-6 text-lg leading-8 text-muted">{project.description}</p>
      </section>
      <CtaBand />
    </>
  );
}
