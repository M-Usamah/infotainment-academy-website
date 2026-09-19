import { AdvantageGrid } from "@/components/advantage-grid";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/page-hero";
import { Hero } from "@/components/hero";
import { NewsPreview } from "@/components/news-preview";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCards } from "@/components/service-cards";
import { StatsBand } from "@/components/stats-band";
import { Testimonials } from "@/components/testimonials";
import { projects } from "@/lib/data";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <StatsBand />
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our work"
            title="Explore the portfolio"
            copy="Games, venues, headsets, and unbuilt buildings—each one meant to be occupied."
          />
          <div className="mt-10">
            <PortfolioGrid items={projects.slice(0, 6)} />
          </div>
        </div>
      </section>
      <AdvantageGrid />
      <Testimonials />
      <NewsPreview />
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="Got an idea? Send a message"
              copy="Whether you need a custom game, a venue-scale AR overlay, or a building that people can walk before it exists—we will read it."
            />
            <p className="mt-6 text-sm text-muted">{site.email}</p>
            <p className="text-sm text-muted">{site.phone}</p>
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
