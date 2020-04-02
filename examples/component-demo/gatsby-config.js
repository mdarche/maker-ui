module.exports = {
  siteMetadata: {
    title: 'Maker UI Carousel Example',
    description: 'An example Gatsby site with Carousel usage',
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
  ],
}
