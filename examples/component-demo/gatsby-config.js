module.exports = {
  siteMetadata: {
    title: 'Elements UI Carousel Example',
    description: 'An example Gatsby site with Carousel usage',
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
  ],
}
