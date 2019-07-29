export default {
  topbar: {
    sticky: true,
    maxWidth: 960,
  },
  header: {
    sticky: true,
    stickyMobile: true,
    maxWidth: "100%",
    mobileNavStyle: "fade",
    mobileNavWidth: 300,
    spring: { tension: 170, friction: 26 },
  },
  sideNav: {
    active: false,
    width: "18em",
    spring: { tension: 170, friction: 26 },
  },
  main: {
    paddingTop: 80,
    maxWidth: 960,
    gridGap: 30,
    sidebar: true,
    sidebarWidth: ".3fr",
    sidebarPosition: "left",
  },
  footer: {
    maxWidth: 960,
    gridGap: 30,
  },
  breakpoints: {
    sm: 750,
    md: 960,
    lg: 1240,
  },
}
