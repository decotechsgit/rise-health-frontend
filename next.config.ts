import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "riseos-staging.s3.us-east-1.amazonaws.com",
      // add other domains if needed
    ],
  },
};

export default nextConfig;
