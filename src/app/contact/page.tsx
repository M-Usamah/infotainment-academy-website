import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Infotainment Academy about games, AR/VR, or visualization.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Got an idea? Send the first scene."
        copy="A producer reads every message. Tell us the audience, the platform, and the date it has to exist."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-line bg-elevated p-8">
          <h2 className="font-display text-3xl">Studio</h2>
          <p className="mt-4 text-muted">{site.address}</p>
          <p className="mt-4">
            <a className="text-gold" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-2 text-muted">{site.phone}</p>
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
