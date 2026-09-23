import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  bundlePagesRouterDependencies: true,
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "tbtwegsiupiskevhgfjs.supabase.co", pathname: "/**" },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tbtwegsiupiskevhgfjs.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidHdlZ3NpdXBpc2tldmhnZmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NTc1NDksImV4cCI6MjA1MTAzMzU0OX0.AxWApWvVcdeuTwdpM_TwQs7OTPabmWntpb_LdFAKyoY",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://gym-navi.jp",
  },
};

export default nextConfig;
