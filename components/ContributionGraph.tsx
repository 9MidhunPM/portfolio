import { cn } from "@/lib/utils";

// GitHub's public events API only exposes the last ~90 days, so the grid
// covers exactly that window — 13 weeks. Anything older would be empty
// cells pretending to be inactivity, which would be a lie.
const WEEKS = 13;
const DAYS = 7;

function cellClass(count: number): string {
  if (count === 0) return "bg-muted/20";
  if (count <= 2) return "bg-accent/30";
  if (count <= 5) return "bg-accent/60";
  return "bg-accent";
}

/**
 * Renders a 13×7 activity grid from real GitHub public-events data —
 * exactly the ~90-day window the API exposes. Weeks (columns) × days
 * (rows), oldest → newest left to right.
 */
export function ContributionGraph({
  activity,
  size = "md",
  caption,
}: {
  activity: Record<string, number>;
  size?: "sm" | "md";
  caption?: string;
}) {
  // Align grid so the last column's last row is today (UTC).
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const end = new Date(today);
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay())); // end of this week (Sat)

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (WEEKS * DAYS - 1));

  const weeks: { date: Date; count: number }[][] = [];
  const cursor = new Date(start);
  for (let w = 0; w < WEEKS; w++) {
    const week: { date: Date; count: number }[] = [];
    for (let d = 0; d < DAYS; d++) {
      const iso = cursor.toISOString().slice(0, 10);
      week.push({
        date: new Date(cursor),
        count: cursor > today ? -1 : (activity[iso] ?? 0),
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  const cell = size === "sm" ? "h-2.5 w-2.5" : "h-3.5 w-3.5";
  const gap = size === "sm" ? "gap-[3px]" : "gap-1";

  // Per-cell data lives in title attributes, which are invisible on touch
  // and unreliable for assistive tech. Summarise the real numbers instead.
  const realDays = weeks.flat().filter((day) => day.count >= 0);
  const totalEvents = realDays.reduce((sum, day) => sum + day.count, 0);
  const activeDays = realDays.filter((day) => day.count > 0).length;
  const busiest = realDays.reduce(
    (max, day) => (day.count > max.count ? day : max),
    { date: new Date(), count: 0 }
  );

  const summary =
    totalEvents === 0
      ? "No public GitHub activity recorded in the last 90 days."
      : `${totalEvents} public GitHub events across ${activeDays} active days in the last 90 days. Busiest day: ${busiest.date
          .toISOString()
          .slice(0, 10)} with ${busiest.count} events.`;

  return (
    <figure className="space-y-3">
      <div className="overflow-x-auto pb-1">
        <div
          className={cn("flex w-max", gap)}
          role="img"
          aria-label={summary}
        >
          {weeks.map((week, wi) => (
            <div key={wi} className={cn("flex flex-col", gap)}>
              {week.map((day) => (
                <span
                  key={day.date.toISOString()}
                  title={
                    day.count < 0
                      ? undefined
                      : `${day.date.toISOString().slice(0, 10)} — ${day.count} public event${day.count === 1 ? "" : "s"}`
                  }
                  className={cn(
                    cell,
                    "rounded-[3px]",
                    day.count < 0 ? "bg-transparent" : cellClass(day.count)
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {caption ? (
        <figcaption className="font-mono text-[11px] text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
