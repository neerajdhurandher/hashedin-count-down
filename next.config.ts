import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/hashedin-count-down' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/hashedin-count-down/' : '',
};

export default nextConfig;
