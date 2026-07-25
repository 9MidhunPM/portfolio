import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/types";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group rounded-lg border border-border p-6 transition-colors duration-200 hover:border-muted">
      <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="mt-3 font-medium text-foreground">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {post.description}
      </p>
    </article>
  );
}
