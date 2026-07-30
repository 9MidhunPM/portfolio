/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  experimental: {
    // The OG routes read vendored .ttf files off disk at request/build time.
    // Webpack cannot statically trace fs.readFileSync, so name them explicitly
    // or they get dropped from the standalone bundle.
    outputFileTracingIncludes: {
      "/opengraph-image": ["./lib/og/fonts/**"],
      "/about/opengraph-image": ["./lib/og/fonts/**"],
      "/blog/opengraph-image": ["./lib/og/fonts/**"],
      "/blog/[slug]/opengraph-image": ["./lib/og/fonts/**"],
      "/projects/opengraph-image": ["./lib/og/fonts/**"],
      "/projects/[slug]/opengraph-image": ["./lib/og/fonts/**"],
      "/contact/opengraph-image": ["./lib/og/fonts/**"],
      "/now/opengraph-image": ["./lib/og/fonts/**"],
      "/open/opengraph-image": ["./lib/og/fonts/**"],
      "/uses/opengraph-image": ["./lib/og/fonts/**"],
      "/apple-icon": ["./lib/og/fonts/**"],
    },
  },
};

export default nextConfig;
