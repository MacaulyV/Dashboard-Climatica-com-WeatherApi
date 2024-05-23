// next.config.mjs
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*', // Substitua 5000 pela porta do seu backend
      },
      {
        source: '/places-suggestions',
        destination: 'http://localhost:5000/places-suggestions', // Substitua 5000 pela porta do seu servidor Flask
      },
    ];
  },
};

export default nextConfig;
