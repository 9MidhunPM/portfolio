import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a minimal, self-contained production server at .next/standalone
  // so the Docker runtime image doesn't need node_modules installed.
  output: "standalone",
};

export default nextConfig;
