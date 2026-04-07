/** @type {import('next').NextConfig} */
const nextConfig = { images: { unoptimized: true } }

if (process.env.NODE_ENV === 'development') {
  // Async dev-only setup for Cloudflare bindings during `next dev`.
  import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev()
  })
}

module.exports = nextConfig
