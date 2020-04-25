module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Maker UI`,
    author: `Mike Darche`,
    description: `A starter boilerplate for using a Maker UI with Gatsby.`,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Maker UI`,
        short_name: `EUI`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: false,
        display: `minimal-ui`,
        icon: `src/assets/elements-ui.png`,
      },
    },
  ],
}
