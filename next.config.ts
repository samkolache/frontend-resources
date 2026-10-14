import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served at samkotecha.com/resources via a rewrite in the portfolio's vercel.json.
  basePath: "/resources",
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
