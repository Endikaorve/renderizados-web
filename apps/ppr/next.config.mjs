/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true, // Habilitar Partial Prerendering
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
