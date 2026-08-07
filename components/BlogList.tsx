import { PostCard } from "@/components/PostCard";
import type { PostMeta } from "@/lib/types";

export function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <div key={post.slug}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
