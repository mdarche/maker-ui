/**
 * Shadow this file to customize the theme layout
 *
 * See: https://github.com/mdarche/gatsby-theme-elements
 */

export default {
  topBar: {
    show: false,
    hideOnMobile: true,
  },
  header: {
    sticky: true,
    contentMaxWidth: 1260,
    mobileNavStyle: "fade", // fade, fadeInUp, fadeInDown, slideRight, slideLeft
    mobileNavWidth: "100vw",
    mobileNavSpring: { tension: 170, friction: 26 }, // default react spring
  },
  content: {
    paddingTop: 80,
    maxWidth: 1260,
    columnGap: 30,
  },
  sideBar: {
    show: false,
    width: 300,
    position: "left",
    collapse: 960,
  },
  footer: {
    columns: 3,
    columnGap: 30,
  },
}
