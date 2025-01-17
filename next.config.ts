import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to complete even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'], // Allow images from 'localhost'
  },
  server: {
    port: 3004, // Change the default port to 3004
  },
};

export default nextConfig;
