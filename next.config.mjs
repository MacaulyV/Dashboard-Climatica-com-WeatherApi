// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/places-suggestions',
        destination: 'http://localhost:5000/places-suggestions', // Substitua 5000 pela porta do seu servidor Flask
      },
    ];
  },
};

export default nextConfig;