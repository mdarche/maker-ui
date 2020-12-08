import { MakerOptions } from './types'

export const defaultOptions: MakerOptions = {
  topbar: {
    maxWidth: 1260,
    hideOnMobile: false,
    bpIndex: 0,
  },
  header: {
    navType: 'basic',
    mobileNavType: 'basic',
    maxWidth: 1460,
    sticky: false,
    stickyOnMobile: false,
    stickyUpScroll: false,
    hideColorButtonOnMobile: false,
    hideWidgetsOnMobile: true,
    menuOverflow: 'wrap',
    dropdown: {
      caret: 'default',
      transition: 'fade',
    },
    bpIndex: 0,
  },
  mobileMenu: {
    width: '60vw',
    transition: 'slide-left',
    easingCurve: 'all ease .3s',
    visibleOnDesktop: false,
    showCloseButton: true,
    closeOnBlur: true,
    closeOnRouteChange: false,
  },
  sideNav: {
    width: [250, 300],
    isHeader: false,
    isPrimaryMobileNav: false,
    showToggleOnMobile: true,
    toggleButton: 'default',
    closeOnBlur: true,
    closeOnRouteChange: true,
    easingCurve: 'all ease .3s',
    bpIndex: 0,
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    sidebarGap: 30,
    bpIndex: 0,
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
  errors: {
    showStackTrace: false,
  },
  workspace: {
    canvasMaxWidth: '100%',
    bpIndex: 0,
    panelLeft: {
      width: '.25fr',
      collapseWidth: 0,
    },
    panelRight: {
      width: 300,
      collapseWidth: 0,
    },
  },
}
