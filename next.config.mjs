/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_ENDPOINT_URL: process.env.NEXT_PUBLIC_ENDPOINT_URL,
  },
  typescript: {
    ignoreBuildErrors: true, // Disables type checking during `next build`
  },
};

export default nextConfig;
