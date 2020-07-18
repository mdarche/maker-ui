export default {
  navigation: 'center',
  layout: 'content-sidebar',
  topbar: {
    maxWidth: [200, 600],
  },
  header: {
    maxWidth: 1080,
    breakIndex: 0,
  },
  mobileMenu: {
    width: '60vw',
    transition: 'slideRight',
    closeOnBlur: true,
    closeOnRouteChange: true,
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
