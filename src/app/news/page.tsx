import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "Notes from the studio on spatial design, games, and production.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Studio notes"
        copy="Process, production, and the unglamorous physics of putting pixels in a real room."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            className="overflow-hidden rounded-[1.5rem] border border-line bg-elevated"
          >
            <div className="relative aspect-[16/10]">
              <Image src={article.image} alt={article.imageAlt} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-6">
              <p className="text-xs text-muted">
                {article.author} · {article.date}
              </p>
              <h2 className="font-display mt-2 text-2xl">{article.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
