import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'quill$': 'quill/dist/quill.js'
    };
    return config;
  },
  // Enable static optimization
  reactStrictMode: true,
  // Configure environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Configure TypeScript paths
  typescript: {
    // Disable type checking during build for performance
    ignoreBuildErrors: true,
  },
  experimental:{
    turbo:  {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  }
};

export default nextConfig;
