import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/page-hero";
import { ServiceCards } from "@/components/service-cards";

export const metadata: Metadata = {
  title: "Services",
  description: "Unreal Engine gameplay engineering, co-development teams, art and technical art, and QA and optimization for PC games.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Unreal Engine services for PC games"
        copy="Four ways to add an Unreal team to your production, from a single task to a full co-development team."
        image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Gaming stage with dramatic lighting"
      />
      <div className="-mt-12">
        <ServiceCards showHeading={false} />
      </div>
      <CtaBand />
    </>
  );
}
