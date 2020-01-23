export default {
  navigation: "basic",
  layout: "content",
  topbar: {
    sticky: true,
    stickyMobile: false,
    maxWidth: 1260,
  },
  header: {
    sticky: true,
    stickyMobile: true,
    maxWidth: 1260,
    hideWidgetsOnMobile: true,
    colorToggle: true,
    dropdownCaret: true,
    dropdownStyle: "default",
    dropdownAlign: "left",
    dropdownTransition: "fade",
  },
  mobileMenu: {
    width: 300,
    animation: "fade",
    desktopVisible: true,
  },
  sideNav: {
    width: 300,
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    gridGap: 30,
  },
  sidebar: {
    width: 300,
  },
  modal: {
    animation: "fade",
    blur: false,
  },
  footer: {
    maxWidth: 1020,
  },
  breakpoints: {
    sm: 750,
    md: 960,
    lg: 1240,
  },
}
