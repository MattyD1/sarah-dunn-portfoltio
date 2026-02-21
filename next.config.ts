import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/media/**",
        // search is omitted, so ?v=123, ?t=456, or no query string are all allowed
      },
    ],
    qualities: [5, 50, 75, 100],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default withPayload(nextConfig);
