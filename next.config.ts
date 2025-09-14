import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async rewrites() {
      return [
         {
            source: "/api/v1/:path*",
            destination: "/api/next/:path*",
         },
         {
            source: "/api/:path*",
            destination: "/api/supabase/:path*",
         },
         {
            source: "/video-demo",
            destination:
               "https://qq90n93onn5q8tmx.public.blob.vercel-storage.com/files/E-Book%20Demo.mp4",
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
         {
            protocol: "https",
            hostname: "aiebp.edu.vn",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "i.pinimg.com",
            pathname: "/**",
         },
      ],
   },
};

export default nextConfig;
