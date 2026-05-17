import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@pos/shared-types", "@pos/pos-domain", "@pos/ui"]
};

export default nextConfig;
