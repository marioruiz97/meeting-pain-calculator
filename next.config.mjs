/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@ai-sdk/openai"],
  },
};

export default nextConfig;
