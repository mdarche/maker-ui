/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    transpilePackages: ['@maker-ui/layout'],
    // modularizeImports: {
    //   '@maker-ui/layout': '@maker-ui/layout/{{member}}',
    // },
  },
}
