module.exports = {
  siteMetadata: {
    title: 'Maker UI Component Demo Example',
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.tsx`),
      },
    },
  ],
}
