export default {
  navigation: 'basic',
  layout: 'content',
  topbar: {
    maxWidth: 1260,
    hideOnMobile: false,
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
    transition: 'slideLeft',
    visibleOnDesktop: false,
  },
  sideNav: {
    width: 300,
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    sidebarGap: 30,
  },
  sidebar: {
    width: 300,
  },
  footer: {
    maxWidth: 1020,
  },
  // breakpoints: {
  //   sm: 750,
  //   md: 960,
  //   lg: 1240,
  // },
}
