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
    sticky: true,
    stickyMobile: true,
    stickyScroll: false,
    scroll: {
      toggleClass: false,
      scrollTop: 200,
      class: 'sticky',
    },
    colorToggle: true,
    hideColorToggleOnMobile: false,
    hideWidgetsOnMobile: true,
    dropdown: {
      caret: true,
      transition: 'fadeInDown',
    },
    breakIndex: 0,
  },
  mobileMenu: {
    width: '60vw', // note: can be responsive array
    transition: 'slideLeft',
    visibleOnDesktop: false,
    defaultCloseButton: true, // todo
    closeOnBlur: true,
    closeOnRouteChange: true, // todo figure out whether to keep
  },
  sideNav: {
    width: 300,
    isPrimaryMobileNav: false,
    floatingToggle: true,
    defaultCloseButton: true, // todo
    closeOnBlur: true,
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
