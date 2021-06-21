const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
  options: {
    rehypePlugins: [require('rehype-slug')],
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
