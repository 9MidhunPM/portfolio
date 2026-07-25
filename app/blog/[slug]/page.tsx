import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXContent } from "@/components/MDXContent";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import { getAllPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { extractToc } from "@/lib/toc";
import { SITE } from "@/lib/data";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [SITE.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const toc = extractToc(post.content);
  const url = `${SITE.url}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ReadingProgress />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
        <article className="max-w-prose">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-[13px] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            All posts
          </Link>

          <header className="space-y-6">
            <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              <span className="mb-4 block font-mono text-[13px] font-normal text-muted">
                {SITE.name} — Blog
              </span>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>

            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <div className="mt-12">
            <MDXContent source={post.content} />
          </div>

          <footer className="mt-16 flex items-center justify-between border-t border-border pt-8">
            <p className="font-mono text-[13px] text-muted">Share this post</p>
            <ShareButtons url={url} title={post.title} />
          </footer>
        </article>

        <aside className="mt-16 hidden lg:mt-0 lg:block">
          <TableOfContents items={toc} />
        </aside>
      </div>
    </div>
  );
}
