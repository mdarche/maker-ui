export default {
  topbar: {
    sticky: true,
    maxWidth: "100%",
  },
  header: {
    sticky: true,
    stickyMobile: true,
    maxWidth: "100%",
    mobileNavWidth: 300,
    mobileAnimation: "fade",
    spring: { tension: 170, friction: 26 },
  },
  sideNav: {
    width: "18em",
    spring: { tension: 170, friction: 26 },
  },
  content: {
    maxWidth: 1020,
    gridGap: 50,
  },
  sidebar: {
    width: ".3fr",
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
