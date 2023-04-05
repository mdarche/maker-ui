/** @type {import('next').NextConfig} */

const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)
