import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: "build",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
