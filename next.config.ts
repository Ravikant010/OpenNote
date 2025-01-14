import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Enable static optimization
  reactStrictMode: true,
  // Configure environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Configure TypeScript paths
  typescript: {
    
    // Disable type checking during build for performance
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: "https",
        hostname: "i.giphy.com"
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname:"api.dicebear.com"
      }
    ],
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
