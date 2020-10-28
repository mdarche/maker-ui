module.exports = {
  siteMetadata: {
    title: 'Maker UI - Gatsby Example',
    description: 'An example Gatsby site with Maker UI',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.tsx`),
      },
    },
  ],
}
