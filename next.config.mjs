/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Turbopack設定（警告を消すため）
  turbopack: {
    root: process.cwd(),
  },
  
  // リダイレクト設定
  async redirects() {
    return [
      {
        source: '/shop',
        destination: 'https://shop.doseewellness.com',
        permanent: true,
      },
      {
        source: '/shop/:path*',
        destination: 'https://shop.doseewellness.com/:path*',
        permanent: true,
      },
    ]
  },
  
  // ヘッダー設定（セキュリティ）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
}

export default nextConfig