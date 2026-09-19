import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function NewsPreview() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="News" title="In the headline" />
          <Link href="/news" className="text-sm text-gold">
            All news →
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="overflow-hidden rounded-[1.5rem] border border-line bg-elevated"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-muted">
                  {article.author} · {article.date}
                </p>
                <h3 className="font-display mt-2 text-2xl leading-snug">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
