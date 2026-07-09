/** @type {import('next').NextConfig} */
const nextConfig = {
  // Wyłącz webpack cache server-side — plik 0.pack przekracza limit 25MB CF Pages
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.cache = false
    }
    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/', destination: '/app', permanent: false },
    ]
  },
}

export default nextConfig
