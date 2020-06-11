export default {
  navigation: 'basic-left',
  layout: 'sidenav-content',
  header: {
    maxWidth: 1460,
    stickyScroll: true,
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
    isPrimaryMobileNav: true,
  },
  content: {
    maxWidth: 1020,
  },
}
