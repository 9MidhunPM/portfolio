import { PostCard } from "@/components/PostCard";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/types";

/**
 * Server component. The staggered reveal is CSS-driven rather than Framer
 * Motion so the list renders without JS — the previous version started at
 * opacity: 0 and only revealed on whileInView, which left the blog index
 * visually empty if hydration ever failed.
 *
 * Class names are spelled out in full because Tailwind tree-shakes custom
 * @layer utilities based on source scanning; a `stagger-${i}` template
 * would get purged.
 */
const STAGGER = [
  "stagger-1",
  "stagger-2",
  "stagger-3",
  "stagger-4",
  "stagger-5",
  "stagger-6",
] as const;

export function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {posts.map((post, index) => (
        <div
          key={post.slug}
          className={cn(
            "animate-fade-up",
            STAGGER[Math.min(index, STAGGER.length - 1)]
          )}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
