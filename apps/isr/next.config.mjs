/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.pokemon.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pokeapi.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
