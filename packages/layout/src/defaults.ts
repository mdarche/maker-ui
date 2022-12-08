import { Options } from '@/types'

export const defaults: Options = {
  type: 'content',
  skiplinks: true,
  colorThemes: [],
  header: {
    breakpoint: 960,
    navType: 'basic',
    mobileNavType: 'basic',
    absolute: false,
    sticky: false,
    stickyOnMobile: false,
    stickyUpScroll: false,
    menuOverflow: 'scroll',
  },
  topbar: {
    hideOnMobile: true,
    sticky: false,
    stickyOnMobile: false,
  },
  mobileMenu: {
    transition: 'fade',
    showCloseButton: true,
    visibleOnDesktop: false,
    closeOnBlur: true,
    closeOnRouteChange: true,
    center: true,
    closeButtonPosition: 'top-right',
  },
  sideNav: {
    breakpoint: 960,
    isHeader: false,
    isPrimaryMobileNav: false,
    closeOnBlur: true,
    closeOnRouteChange: true,
    showToggleOnMobile: false,
    collapse: false,
  },
  sidebar: {
    breakpoint: 960,
  },
}
