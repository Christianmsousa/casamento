/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** ESLint 9 + flat config: `next lint` pode falhar com opções legacy; o tipo continua em `tsc`. */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig


