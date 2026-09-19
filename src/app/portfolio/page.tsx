import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/page-hero";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected games, AR/VR, architectural visualization, and product work from Infotainment Academy.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work"
        copy="Filter by discipline. Every project was built to be played, walked, or stood inside."
        image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Esports stage lighting"
      />
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <PortfolioGrid />
      </section>
      <CtaBand />
    </>
  );
}
