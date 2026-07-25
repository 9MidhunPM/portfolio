import { SITE } from "@/lib/data";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        <span className="mb-4 block font-mono text-[13px] font-normal tracking-normal text-muted">
          {SITE.name} — {eyebrow}
        </span>
        {title}
      </h1>
      {description && (
        <p className="max-w-prose text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
