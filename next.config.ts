import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/shitcoins", destination: "/hot", permanent: true }];
  },
};

export default nextConfig;
