import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Needed for GSAP/Lenis which use browser APIs
  transpilePackages: ["gsap", "lenis"],
};

export default nextConfig;
