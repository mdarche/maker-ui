module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Elements`,
    author: `Mike Darche`,
    description: `A starter boilerplate for using a Elements UI with Gatsby.`,
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
