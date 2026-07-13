import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // APK assets are already sized for the interface. Serving them directly also
  // keeps local development independent from Cloudflare's production bindings.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
