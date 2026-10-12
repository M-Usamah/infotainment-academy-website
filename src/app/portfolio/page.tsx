import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/page-hero";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Shogun, our Unreal Engine 5 game, and the shooter and RPG codebases ready to adapt to your brief.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our work and ready codebases"
        copy="Our own Unreal Engine 5 game, plus game codebases your project can start from instead of an empty level."
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
