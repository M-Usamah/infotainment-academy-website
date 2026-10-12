import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/page-hero";
import { TeamAvatar } from "@/components/team-avatar";
import { team } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a Pakistani Unreal Engine studio building PC games for global studios. Founded in ${site.founded}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Pakistani Unreal studio for global PC games"
        copy={`${site.name} builds PC games in Unreal Engine and trains the developers who make them. We are a gateway for global studios to Pakistan's Unreal talent. Founded in ${site.founded}.`}
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Studio collaborators working around a table"
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <article className="rounded-[1.5rem] border border-line bg-elevated p-8">
          <h2 className="font-title text-3xl">Vision</h2>
          <p className="mt-4 leading-7 text-muted">
            Make Pakistan a trusted source of high-end PC game development.
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-line bg-elevated p-8">
          <h2 className="font-title text-3xl">Mission</h2>
          <p className="mt-4 leading-7 text-muted">
            Deliver Unreal work that is on time, honest about scope and built to the client&apos;s
            brief.
          </p>
        </article>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <h2 className="font-display text-4xl">Core team</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li
              key={member.name}
              className="flex flex-col items-center rounded-[1.5rem] border border-line bg-elevated p-6 text-center"
            >
              <TeamAvatar member={member} />
              <h3 className="font-title mt-5 text-xl">{member.name}</h3>
              <p className="mt-1 text-sm text-signal">{member.role}</p>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
