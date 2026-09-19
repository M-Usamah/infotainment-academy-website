import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="pt-32 pb-24">
      <div className="relative mx-auto aspect-[21/9] max-w-6xl overflow-hidden rounded-[2rem] border border-line">
        <Image src={article.image} alt={article.imageAlt} fill className="object-cover" sizes="100vw" priority />
      </div>
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <p className="text-sm text-muted">
          {article.author} · {article.date}
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold text-balance sm:text-5xl">
          {article.title}
        </h1>
        {article.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mt-6 text-lg leading-8 text-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
