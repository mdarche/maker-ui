export default {
  navigation: 'basic',
  layout: 'content',
  topbar: {
    maxWidth: 1260,
    sticky: true,
    stickyMobile: false,
  },
  header: {
    maxWidth: 1460,
    sticky: true,
    stickyMobile: true,
    colorToggle: true,
    hideColorToggleOnMobile: false,
    hideWidgetsOnMobile: true,
    dropdown: {
      caret: true,
      transition: 'fade',
    },
  },
  mobileMenu: {
    width: [300, '30vw'],
    animation: 'slideLeft',
    desktopVisible: false,
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
    animation: 'fade',
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
