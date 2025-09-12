import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async rewrites() {
      return [
         {
            source: "/api/:path*",
            destination: "/api/supabase/:path*",
         },
      ];
   },

   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "*.vercel-storage.com",
            pathname: "/files/**",
         },
         {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
            pathname: "/**",
         },
      ],
   },
};

export default nextConfig;
