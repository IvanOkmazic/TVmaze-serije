import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.tvmaze.com"],
  },
  compress: true, // Gzip kompresija odgovora
  swcMinify: true, // Brži i manji JS pomoću SWC
  reactStrictMode: true, // Pomaže u razvoju
};

export default nextConfig;
