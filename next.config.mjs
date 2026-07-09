import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

// Setup local dev platform (only runs in dev mode)
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Cloudflare Pages nie ma Image Optimization — używaj unoptimized
    unoptimized: true,
  },

  async redirects() {
    return [
      { source: '/', destination: '/app', permanent: false },
    ]
  },
}

export default nextConfig
