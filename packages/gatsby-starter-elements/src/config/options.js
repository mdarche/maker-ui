export default {
  navigation: 'basic',
  layout: 'content',
  topbar: {
    maxWidth: 1260,
    hideOnMobile: false,
    breakIndex: 0,
  },
  header: {
    maxWidth: 1460,
    sticky: false,
    stickyMobile: false,
    stickyScroll: false,
    scroll: {
      toggleClass: false,
      scrollTop: 200,
      className: 'sticky',
    },
    colorToggle: true,
    hideColorToggleOnMobile: false,
    hideWidgetsOnMobile: true,
    dropdown: {
      caret: true,
      transition: 'scale',
    },
    breakIndex: 0,
  },
  mobileMenu: {
    width: '60vw', // note: can be responsive array
    transition: 'slideLeft',
    visibleOnDesktop: false,
    defaultCloseButton: false,
    closeOnBlur: true,
    closeOnRouteChange: false,
  },
  sideNav: {
    width: 300,
    isPrimaryMobileNav: false,
    floatingToggle: true,
    closeOnBlur: true,
    closeOnRouteChange: true,
    breakIndex: 0,
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    sidebarGap: 30,
    breakIndex: 0,
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
