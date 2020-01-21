export default {
  layout: "content",
  topbar: {
    sticky: true,
    maxWidth: 1260,
  },
  header: {
    sticky: true,
    stickyMobile: true,
    maxWidth: 1260,
    mobileNavWidth: 300,
    mobileAnimation: "fade",
    spring: { tension: 170, friction: 26 },
  },
  sideNav: {
    width: 300,
    spring: { tension: 170, friction: 26 },
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    gridGap: 40,
  },
  sidebar: {
    width: ".3fr",
  },
  footer: {
    maxWidth: 1020,
    gridGap: 0,
  },
  breakpoints: {
    sm: 750,
    md: 960,
    lg: 1240,
  },
}
