module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
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
