import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Ingen bildeserver i en statisk eksport: lib/image-loader.ts peker srcset
  // til ferdiglagde utgaver fra scripts/responsive-images.mjs.
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 1024, 1440],
    imageSizes: [128, 192],
  },
};

export default nextConfig;
