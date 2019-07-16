/**
 * Shadow this file to customize the theme layout
 *
 * See: https://github.com/mdarche/gatsby-theme-elements
 */

export default {
  topbar: {
    sticky: false,
    maxWidth: 1260,
    hideOnMobile: false,
  },
  header: {
    sticky: true,
    maxWidth: 1260,
    mobileNavStyle: "slideLeft", // fade, fadeInUp, fadeInDown, slideRight, slideLeft
    mobileNavWidth: 300,
    mobileNavSpring: { tension: 170, friction: 26 },
  },
  content: {
    padding: "80px 20px 0",
    maxWidth: 1260,
    columnGap: 30,
    sidebar: true,
    sbWidth: ".3fr",
    sbPosition: "left",
  },
  footer: {
    maxWidth: 1260,
    columns: 3,
    columnGap: 30,
  },
}
