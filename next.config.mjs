/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.midhunpm.in" }],
        destination: "https://midhunpm.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
