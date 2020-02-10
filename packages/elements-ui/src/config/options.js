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
    stickyScroll: false, // todo
    colorToggle: true,
    hideColorToggleOnMobile: false,
    hideWidgetsOnMobile: true,
    dropdown: {
      caret: true,
      transition: 'fadeInDown',
    },
    breakIndex: 0, // todo
  },
  mobileMenu: {
    width: '30vw', // note: can be responsive array
    transition: 'slideLeft',
    defaultClose: true,
    visibleOnDesktop: false,
    closeOnRouteChange: true, //todo and test
  },
  sideNav: {
    width: 300,
    isPrimaryNav: false, // todo
    floatingToggle: true,
    breakIndex: 0, // todo
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    sidebarGap: 30,
    breakIndex: 0, // todo
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
