import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/page-hero";
import { ServiceCards } from "@/components/service-cards";

export const metadata: Metadata = {
  title: "Services",
  description: "Game development, AR/VR, 3D interactive, game art, apps, and architectural visualization.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One studio, six ways into a world"
        copy="Pick the surface: headset, console, phone, web, or a building that does not exist yet. The craft is shared."
        image="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Person using a VR headset"
      />
      <div className="-mt-16">
        <ServiceCards />
      </div>
      <CtaBand />
    </>
  );
}
