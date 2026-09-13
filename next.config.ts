import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["react-paginate"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ac.goit.global" }],
  },
};

export default nextConfig;
