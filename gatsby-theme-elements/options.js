export default {
  topBar: {
    show: false,
    hideOnMobile: true,
  },
  header: {
    sticky: false,
    contentMaxWidth: "100%",
    mobileNavStyle: "fade", // fade, fadeInUp, fadeInDown, slideRight, slideLeft
    mobileNavWidth: "100vw",
    mobileNavSpring: { tension: 170, friction: 26 }, // default react spring
  },
  content: {
    maxWidth: 1260,
  },
  sideBar: {
    show: false,
    position: "left",
    collapse: 960,
  },
  footer: {
    columns: 3,
  },
}
