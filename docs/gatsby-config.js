module.exports = {
  siteMetadata: {
    title: 'Maker UI',
    description: 'An example Gatsby site with Carousel usage',
    siteUrl: 'https://maker-ui.com',
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.tsx`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
  ],
}
