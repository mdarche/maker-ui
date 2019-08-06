module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        prettier: true,
        svgo: false,
      },
    },
  ],
}
