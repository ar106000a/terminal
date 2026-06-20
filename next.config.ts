import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/src/projects",
        destination: "/projects",
      },
      {
        source: "/src/experience",
        destination: "/experience",
      },
      {
        source: "/ssh/connect",
        destination: "/connect",
      },
    ];
  },
};

export default nextConfig;
