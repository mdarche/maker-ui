export default {
  navigation: '',
  layout: 'content-sidebar',
  topbar: {
    maxWidth: [200, 600],
  },
  header: {
    maxWidth: '100%',
    breakIndex: 0,
    stickyScroll: false,
  },
  mobileMenu: {
    width: '80vw',
    transition: 'fade-down',
    closeOnBlur: true,
    closeOnRouteChange: true,
    defaultCloseButton: true,
  },
  content: {
    maxWidth: 960,
    maxWidthSection: 960,
    breakIndex: 0,
  },
  footer: {
    maxWidth: [200, '100%'],
  },
}
