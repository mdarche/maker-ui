export default {
  navigation: 'basic-left',
  layout: 'sidenav-content',
  header: {
    maxWidth: '100%',
    stickyScroll: true,
    colorToggle: false,
    hideColorToggleOnMobile: true,
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
    floatingToggle: false,
  },
  content: {
    maxWidth: 960,
  },
}
