import { AdvantageGrid } from "@/components/advantage-grid";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/page-hero";
import { Hero } from "@/components/hero";
import { HowWeWork } from "@/components/how-we-work";
import { NewsPreview } from "@/components/news-preview";
import { PilotOffer } from "@/components/pilot-offer";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCards } from "@/components/service-cards";
import { StatsBand } from "@/components/stats-band";
import { projects } from "@/lib/data";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <StatsBand />
      <HowWeWork />
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our work"
            title="Our game and ready codebases"
            copy="Shogun, our own Unreal Engine 5 game, and the shooter and RPG codebases your project can start from."
          />
          <div className="mt-10">
            <PortfolioGrid items={projects} />
          </div>
        </div>
      </section>
      <AdvantageGrid />
      <PilotOffer />
      <NewsPreview />
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="Tell us about your game"
              copy="Share your brief, your engine version, and your timeline. We will reply within one business day."
            />
            <p className="mt-6 text-sm text-muted">
              <a className="text-action" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <p className="text-sm text-muted">{site.city}</p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-elevated p-8">
            <ContactForm />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
