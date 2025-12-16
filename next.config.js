/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',  // ← ADD THIS
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',  // ← ADD THIS
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',  // ← ADD THIS
      },
    ],
  },
}

module.exports = nextConfig