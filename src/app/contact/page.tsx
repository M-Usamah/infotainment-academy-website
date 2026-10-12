import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Infotainment Academy, an Unreal Engine game development team in Lahore, Pakistan. Start with a paid pilot.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your Unreal project"
        copy="Share the brief, the engine version, and the deadline. The easiest way to start is a paid pilot: one task, 4–6 weeks."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-line bg-elevated p-8">
          <h2 className="font-display text-3xl">Studio</h2>
          <p className="mt-4 text-muted">{site.city}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{site.timezone}</p>
          <p className="mt-4">
            <a className="text-action" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-8 text-sm leading-6 text-muted">
            We do not sell your details. The form is rate-limited, validated, and stripped of markup
            before anyone on the team sees it.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-elevated p-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
