import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images: add domains here as needed when using next/image with external URLs
  images: {
    remotePatterns: [],
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
