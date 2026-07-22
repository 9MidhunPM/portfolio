import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  title,
  reveal = false,
  className,
}: {
  index: string;
  title: string;
  reveal?: boolean;
  className?: string;
}) {
  return (
    <div
      data-reveal={reveal ? "" : undefined}
      className={cn("flex items-center gap-3", className)}
    >
      <span className="font-mono text-sm text-[#00DC82]">{index}.</span>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {title}
      </h2>
      <div className="h-px bg-gradient-to-r from-white/15 to-transparent flex-1 ml-2" />
    </div>
  );
}
