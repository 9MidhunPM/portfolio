import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { createPageMetadata } from "@/lib/seo";

const title = "Image usage";
const description =
  "Image-use terms from Midhun P M for original portfolio photography, including how to request permission for reuse or publication.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/image-usage",
});

export default function ImageUsagePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://midhunpm.in",
      },
      { "@type": "ListItem", position: 2, name: "Image usage" },
    ],
  };

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="max-w-prose space-y-10">
        <PageHeader
          eyebrow="Image usage"
          title="Midhun P M's original photos"
          description="Some portfolio images are photographs I took myself. Please ask before reusing, republishing, or licensing them."
        />
        <div className="space-y-5 text-base leading-relaxed text-muted">
          <p>
            My original photographs are not offered for automatic reuse. That
            includes the MetroMind presentation photo on this site.
          </p>
          <p>
            If you want to use one in an article, event recap, portfolio, or
            anything else, tell me where it will appear and how it will be
            credited. I&apos;ll reply with permission or a clear no.
          </p>
          <p>
            Images that come from other people, event organisers, or products
            keep their own rights. This page does not grant permission for
            those images.
          </p>
          <Link
            href="/contact"
            className="inline-flex font-mono text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            Ask Midhun P M about image reuse
          </Link>
        </div>
      </article>
    </div>
  );
}
