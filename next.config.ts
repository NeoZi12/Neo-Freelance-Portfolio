import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tells Next.js to re-export only the specific named exports used, instead
  // of importing the entire barrel file. Reduces JS parsed on the main thread.
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
