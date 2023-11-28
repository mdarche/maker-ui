import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

// import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
  // experimental: {
  //   mdxRs: true,
  // },
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: 'one-dark-pro',
}

/** @type {import('@next/mdx').createMDX} */
const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
})

export default withMDX(nextConfig)
