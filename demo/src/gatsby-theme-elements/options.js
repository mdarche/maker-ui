export default {
  topbar: {
    sticky: true,
    maxWidth: "100%",
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
    maxWidth: 1020,
    gridGap: 50,
    sidebar: true,
    sidebarWidth: ".4fr",
    sidebarPosition: "left",
  },
  footer: {
    maxWidth: 1020,
    gridGap: 30,
  },
  breakpoints: {
    sm: 750,
    md: 960,
    lg: 1240,
  },
}
