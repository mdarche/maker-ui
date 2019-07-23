export default {
  topbar: {
    sticky: false,
    maxWidth: 1260,
    hideOnMobile: false,
  },
  header: {
    sticky: true,
    maxWidth: 1260,
    mobileNavStyle: "slideLeft",
    mobileNavWidth: 300,
    mobileNavSpring: { tension: 170, friction: 26 },
  },
  content: {
    paddingTop: 80,
    maxWidth: 1260,
    columnGap: 30,
    sidebar: true,
    sidebarWidth: ".3fr",
    sidebarPosition: "left",
  },
  footer: {
    maxWidth: 1260,
    columnGap: 30,
  },
}
