/**
 *  NOTE
 *
 *  - These are all of the default Elements UI options available in v0.4.2
 *  - Depending on your layout, you might only need to access a few of these
 *
 *  See: https://elements-ui.dev/options for details on each
 */

export default {
  navigation: 'basic',
  layout: 'content',
  topbar: {
    maxWidth: 1080,
    hideOnMobile: false,
    breakIndex: 0,
  },
  header: {
    maxWidth: 1080,
    sticky: true,
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
    width: '60vw',
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
    maxWidth: 800,
    maxWidthSection: 800,
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
