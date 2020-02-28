module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Elements`,
    author: {
      name: `Mike Darche`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `A starter boilerplate for using an Elements UI layout with a Theme UI theme.`,
    siteUrl: `https://gatsby-starter-elements.netlify.com/`,
    social: {
      twitter: `mkdarshay`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
  ],
}
