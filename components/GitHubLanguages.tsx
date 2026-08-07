export function GitHubLanguages({
  languages,
}: {
  languages: { name: string; count: number }[];
}) {
  const visibleLanguages = languages.slice(0, 6);
  const total = visibleLanguages.reduce(
    (sum, language) => sum + language.count,
    0
  );

  if (total === 0) return null;

  return (
    <div className="rounded-lg border border-border p-5 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="text-sm font-medium text-foreground">
          Primary languages
        </h3>
        <p className="font-mono text-[10px] text-muted">
          By original repository count
        </p>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
        {visibleLanguages.map((language, index) => {
          const percentage = Math.round((language.count / total) * 100);

          return (
            <li
              key={language.name}
              className="flex min-w-0 items-center justify-between gap-3 bg-background px-3 py-3 font-mono text-[11px]"
            >
              <span className="flex min-w-0 items-center gap-2 text-muted">
                <span
                  className={
                    index === 0
                      ? "h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      : index === 1
                        ? "h-1.5 w-1.5 shrink-0 rounded-full bg-accent/75"
                        : index === 2
                          ? "h-1.5 w-1.5 shrink-0 rounded-full bg-accent/55"
                          : "h-1.5 w-1.5 shrink-0 rounded-full bg-muted/50"
                  }
                  aria-hidden="true"
                />
                <span className="truncate">{language.name}</span>
              </span>
              <span className="shrink-0 text-foreground">{percentage}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
