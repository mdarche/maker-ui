module.exports = {
  siteMetadata: {
    title: 'Elements UI',
    description: 'The official doc site for Elements UI',
    siteUrl: 'https://elements-ui.dev',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
  ],
}
