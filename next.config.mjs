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
    // CF Pages nie ma Image Optimization
    unoptimized: true,
  },

  async redirects() {
    return [
      { source: '/', destination: '/app', permanent: false },
    ]
  },
}

export default nextConfig
