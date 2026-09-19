export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">{eyebrow}</p>
      <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-muted">{copy}</p> : null}
    </div>
  );
}
