/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/music-page.html',
        destination: '/music-page.html'
      },
      {
        source: '/painting/index.html',
        destination: '/painting/index.html'
      },
      {
        source: '/photo/index.html',
        destination: '/photo/index.html'
      },
      {
        source: '/movie/index.html',
        destination: '/movie/index.html'
      },
      {
        source: '/idea/index.html',
        destination: '/idea/index.html'
      },
      {
        source: '/words/index.html',
        destination: '/words/index.html'
      },
      {
        source: '/money/index.html',
        destination: '/money/index.html'
      },
      {
        source: '/game/index.html',
        destination: '/game/index.html'
      },
      {
        source: '/links/index.html',
        destination: '/links/index.html'
      }
    ];
  }
};

export default nextConfig;
