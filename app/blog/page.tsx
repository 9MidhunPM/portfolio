import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BlogList } from "@/components/BlogList";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/data";

const title = "Blog";
const description = `Writing by ${SITE.name} — notes on building web apps, running local LLMs, and self-hosting everything.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: `${SITE.url}/blog`,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE.name}`,
    description,
  },
  alternates: {
    canonical: `${SITE.url}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${title} | ${SITE.name}`,
    description,
    url: `${SITE.url}/blog`,
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${SITE.url}/blog/${post.slug}`,
      keywords: post.tags.join(", "),
    })),
  };

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="space-y-14">
        <PageHeader
          eyebrow={title}
          title="Notes from the workbench"
          description="What I'm building, what broke, and what I learned fixing it. No hot takes, no listicles."
        />
        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <div className="max-w-prose rounded-lg border border-dashed border-border p-10">
            <p className="font-serif text-2xl italic leading-snug text-foreground">
              Nothing here yet.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Writing takes longer than coding. The first post is in the
              drafts folder — check back after the next side project ships.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
