import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    deviceSizes: [440, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    cssChunking: false,
  },
  async rewrites() {
    return [
      { source: "/about", destination: "/" },
      { source: "/services", destination: "/" },
      { source: "/how-it-works", destination: "/" },
      { source: "/portfolio", destination: "/" },
      { source: "/contact", destination: "/" },
    ];
  },
};

export default nextConfig;
