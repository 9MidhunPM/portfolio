import { cn } from "@/lib/utils";

const WEEKS = 5;
const DAYS = 7;

function cellClass(count: number): string {
  if (count === 0) return "bg-muted/15";
  if (count <= 2) return "bg-accent/30";
  if (count <= 5) return "bg-accent/60";
  return "bg-accent";
}

function formatDay(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Displays the rolling 30-day window exposed by GitHub's public-events API.
 * Events are not equivalent to the profile contribution calendar.
 */
export function ContributionGraph({
  activity,
  eventCount,
  size = "md",
}: {
  activity: Record<string, number>;
  eventCount: number;
  size?: "sm" | "md";
}) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));

  const gridStart = new Date(end);
  gridStart.setUTCDate(gridStart.getUTCDate() - (WEEKS * DAYS - 1));

  const windowStart = new Date(today);
  windowStart.setUTCDate(windowStart.getUTCDate() - 29);

  const weeks: { date: Date; count: number; inWindow: boolean }[][] = [];
  const cursor = new Date(gridStart);

  for (let weekIndex = 0; weekIndex < WEEKS; weekIndex++) {
    const week: { date: Date; count: number; inWindow: boolean }[] = [];

    for (let dayIndex = 0; dayIndex < DAYS; dayIndex++) {
      const iso = cursor.toISOString().slice(0, 10);
      const inWindow = cursor >= windowStart && cursor <= today;
      week.push({
        date: new Date(cursor),
        count: inWindow ? (activity[iso] ?? 0) : -1,
        inWindow,
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    weeks.push(week);
  }

  const cell = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const gap = size === "sm" ? "gap-1" : "gap-1.5";

  return (
    <figure className="rounded-lg border border-border bg-surface/40 p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Public activity
          </p>
          <p className="mt-1 text-sm text-foreground">
            {formatDay(windowStart)}–{formatDay(today)}
          </p>
        </div>
        <p className="font-mono text-xs text-muted">
          <span className="text-foreground">{eventCount}</span> public events
        </p>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div
          className={cn("flex w-max", gap)}
          role="img"
          aria-label={`GitHub public activity from ${formatDay(windowStart)} to ${formatDay(today)}, ${eventCount} events`}
        >
          {weeks.map((week) => (
            <div
              key={week[0]?.date.toISOString()}
              className={cn("flex flex-col", gap)}
            >
              {week.map((day) => (
                <span
                  key={day.date.toISOString()}
                  title={
                    day.inWindow
                      ? `${day.date.toISOString().slice(0, 10)} — ${day.count} public event${day.count === 1 ? "" : "s"}`
                      : undefined
                  }
                  className={cn(
                    cell,
                    "rounded-[3px] border border-transparent",
                    day.inWindow ? cellClass(day.count) : "bg-transparent"
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <figcaption className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="max-w-md text-xs leading-relaxed text-muted">
          Public events update hourly. GitHub exposes this rolling window, not
          the full contribution calendar.
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
          Less
          {[0, 1, 3, 6].map((count) => (
            <span
              key={count}
              className={cn("h-2.5 w-2.5 rounded-[2px]", cellClass(count))}
              aria-hidden="true"
            />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
