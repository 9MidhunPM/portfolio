import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import type { MDXComponents } from "mdx/types";

type PortfolioImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const prettyCodeOptions: Partial<Options> = {
  theme: {
    dark: "github-dark-default",
    light: "github-light-default",
  },
  keepBackground: false,
};

const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-12 text-3xl font-medium tracking-tight text-foreground first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-12 text-2xl font-medium tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-10 text-xl font-medium text-foreground" {...props} />
  ),
  h4: (props) => (
    <h4 className="mt-8 text-base font-medium text-foreground" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 leading-relaxed text-muted first:mt-0" {...props} />
  ),
  a: (props) => (
    <a
      className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-muted marker:text-border"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-muted marker:text-border"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-accent pl-6 font-serif text-xl italic leading-relaxed text-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-border" />,
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed"
      {...props}
    />
  ),
  code: (props) => {
    const isInline = typeof props.children === "string";
    return isInline ? (
      <code
        className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        {...props}
      />
    ) : (
      <code {...props} />
    );
  },
  table: (props) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-surface" {...props} />,
  th: (props) => (
    <th
      className="border-b border-border px-4 py-2.5 text-left font-mono text-xs font-medium text-foreground"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-border px-4 py-2.5 text-muted" {...props} />
  ),
  PortfolioImage: ({ src, alt, width, height, caption }: PortfolioImageProps) => (
    <figure className="mt-8 space-y-3">
      <div className="overflow-hidden rounded-lg border border-border">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) calc(100vw - 2.5rem), 680px"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="font-mono text-[11px] leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  ),
};

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}
