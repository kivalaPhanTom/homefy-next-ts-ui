import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        port: '8080',
        hostname: 'localhost',
      }
    ]
  },
  reactStrictMode: false,
  output: 'standalone',
};

export default nextConfig;
