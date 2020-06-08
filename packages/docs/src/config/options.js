export default {
  navigation: 'basic-left',
  layout: 'content-sidenav',
  header: {
    maxWidth: 1460,
    sticky: true,
    stickyMobile: true,
    colorToggle: true,
    hideColorToggleOnMobile: false,
    hideWidgetsOnMobile: false,
  },
  mobileMenu: {
    width: [300, '30vw'],
    transition: 'slideLeft',
    visibleOnDesktop: false,
    closeOnRouteChange: true,
  },
  sideNav: {
    width: ['60vw', 400],
    isPrimaryNav: true,
  },
  content: {
    maxWidth: 1020,
  },
}
