import type { NextConfig } from "next";

// NEXT_DIST_DIR lets perf-check builds write to .next-prod-check/ so they don't
// collide with a running `npm run dev` (which writes to .next/). Unset in dev.
const nextConfig: NextConfig = {
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  experimental: {
    optimizePackageImports: ["framer-motion", "@iconify/react"],
  },
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [440, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;
