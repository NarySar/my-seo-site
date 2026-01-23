import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // This creates the 'out' folder on build
  images: {
    unoptimized: true,   // Necessary because GitHub Pages lacks an image server
  },
};

export default nextConfig;