import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  index,
  title,
  linkHref,
  linkLabel,
}: {
  index: string;
  title: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
        <span className="mr-3 font-mono text-sm text-muted">{index}</span>
        {title}
      </h2>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="group flex shrink-0 items-center gap-1 font-mono text-[13px] text-muted transition-colors hover:text-foreground"
        >
          {linkLabel}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
