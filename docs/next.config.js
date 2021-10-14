const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

const withPWA = require('next-pwa')

const settings = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

module.exports =
  process.env.NODE_ENV === 'production'
    ? withPWA(
        withMDX({
          ...settings,
          pwa: {
            dest: 'public',
            register: true,
            skipWaiting: true,
          },
        })
      )
    : withMDX(settings)
