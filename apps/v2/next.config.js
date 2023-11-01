/** @type {import('next').NextConfig} */

const config = {
  images: {
    domains: ['images.unsplash.com'],
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)
