import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero } from "@/components/page-hero";
import { team } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `The people behind ${site.name}: games, spatial work, and architectural worlds.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A studio for worlds that have to hold up in the room"
        copy={`Founded in ${site.founded}, ${site.name} makes games, AR/VR, and architectural visualization with the same standard: if you can step into it, it has to feel finished.`}
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Studio collaborators working around a table"
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <article className="rounded-[1.5rem] border border-line bg-elevated p-8">
          <h2 className="font-display text-3xl">Vision</h2>
          <p className="mt-4 leading-7 text-muted">
            Interactive entertainment should feel closer to cinema and architecture than to a
            slideshow. We want rooms, streets, and arenas that people occupy together.
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-line bg-elevated p-8">
          <h2 className="font-display text-3xl">Mission</h2>
          <p className="mt-4 leading-7 text-muted">
            Ship work that is beautiful under a deadline, honest about scope, and kind to the
            people who play it. Quality is a production habit, not a mood.
          </p>
        </article>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <h2 className="font-display text-4xl">Core team</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="overflow-hidden rounded-[1.5rem] border border-line bg-elevated">
              <div className="relative aspect-[4/5]">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl">{member.name}</h3>
                <p className="text-sm text-signal">{member.role}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
