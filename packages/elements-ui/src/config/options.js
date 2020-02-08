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
      transition: 'fadeInDown',
    },
  },
  mobileMenu: {
    width: [300, '30vw'],
    transition: 'slideLeft',
    defaultClose: true,
    visibleOnDesktop: false,
    closeOnRouteChange: true,
  },
  sideNav: {
    width: 300,
    isPrimaryNav: false,
    floatingToggle: true,
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
  a11y: {
    skiplinks: true,
  },
}
