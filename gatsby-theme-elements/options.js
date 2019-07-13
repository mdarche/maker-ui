/**
 * Shadow this file to customize the theme layout
 *
 * See: https://github.com/mdarche/gatsby-theme-elements
 */

export default {
  topBar: {
    sticky: false,
    hideOnMobile: false,
  },
  header: {
    sticky: true,
    maxWidth: 1260,
    mobileNavStyle: "fade", // fade, fadeInUp, fadeInDown, slideRight, slideLeft
    mobileNavWidth: "100vw",
    mobileNavSpring: { tension: 170, friction: 26 },
  },
  content: {
    padding: "80px 20px 0",
    maxWidth: 1260,
    columnGap: 30,
    sideBar: true,
    sbWidth: ".3fr",
    sbPosition: "left",
  },
  footer: {
    columns: 3,
    columnGap: 30,
  },
}
