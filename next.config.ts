import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.tvmaze.com"],
  },
  compress: true, // Gzip kompresija odgovora
  reactStrictMode: true, // Pomaže u razvoju
};

export default nextConfig;
