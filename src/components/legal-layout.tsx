export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6">
      <h1 className="font-display text-5xl font-semibold">{title}</h1>
      <div className="mt-8 grid gap-5 text-lg leading-8 text-muted [&_a]:text-action">{children}</div>
    </article>
  );
}
