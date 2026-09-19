"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projectFilters, projects, type Project } from "@/lib/data";

export function PortfolioGrid({ items = projects }: { items?: Project[] }) {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => item.category === filter);
  }, [filter, items]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {projectFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm ${
              filter === item
                ? "bg-gold text-white"
                : "border border-line text-muted hover:text-ink"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="group overflow-hidden rounded-[1.5rem] border border-line bg-elevated"
          >
            <div className="relative aspect-[16/11]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="text-xs tracking-[0.2em] text-gold uppercase">{project.category}</p>
              <h3 className="font-display mt-2 text-2xl">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
