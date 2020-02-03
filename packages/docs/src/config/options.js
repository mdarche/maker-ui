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
  },
  sideNav: {
    width: [400, 600],
    isPrimaryNav: false,
  },
  content: {
    maxWidth: 1020,
  },
}
