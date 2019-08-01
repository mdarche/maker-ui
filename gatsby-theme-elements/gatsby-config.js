module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        prettier: true,
        svgo: false,
        svgoConfig: {
          plugins: {
            removeViewBox: false,
            cleanupIDs: false,
            inlineStyles: false,
            convertStyleToAttrs: false,
            prefixIds: false,
          },
        },
      },
    },
  ],
}
