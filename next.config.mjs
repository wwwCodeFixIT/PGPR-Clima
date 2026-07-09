/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Static HTML export → out/
  trailingSlash: true,     // /app → /app/index.html
  images: {
    unoptimized: true,     // Required for static export
  },
}

export default nextConfig
