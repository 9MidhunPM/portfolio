import GithubSlugger from "github-slugger";
import type { TocItem } from "@/lib/types";

export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of content.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const text = match[2].trim();
    items.push({
      id: slugger.slug(text),
      text,
      depth: match[1].length,
    });
  }

  return items;
}
