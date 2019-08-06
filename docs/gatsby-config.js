module.exports = {
  siteMetadata: {
    title: "Gatsby Theme Elements Documentation",
    description: "The official doc site for Gatsby Theme Elements",
    siteUrl: "https://mikedarche.com",
  },
  plugins: [
    `gatsby-theme-elements`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve("./src/layout/index.js"),
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Merriweather", "Merriweather+Sans:400,400i,700"],
      },
    },
  ],
}
