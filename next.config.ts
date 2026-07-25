import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        port: '8080',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'http',
        port: '8080',
        hostname: '127.0.0.1',
        pathname: '/**',
      },
      {
        protocol: 'http',
        port: '8080',
        hostname: '0.0.0.0',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'host.docker.internal',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/**',
      },
    ]
  },
  reactStrictMode: false,
  output: 'standalone',
};

export default nextConfig;
