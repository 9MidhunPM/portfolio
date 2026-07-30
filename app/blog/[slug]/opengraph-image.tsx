import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/render";
import { getAllPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const alt = "Blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);

  if (!post) {
    return renderOgImage({ eyebrow: "Blog", title: "Post not found" });
  }

  return renderOgImage({
    eyebrow: `Blog · ${formatDate(post.date)}`,
    title: post.title,
    meta: post.readingTime,
  });
}
