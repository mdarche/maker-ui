import { Options } from '@/types'

export const defaults: Options = {
  layout: 'content',
  skiplinks: true,
  colorThemes: [],
  header: {
    breakpoint: 960,
    navType: 'basic',
    navTypeMobile: 'basic',
    absolute: false,
    sticky: false,
    stickyOnMobile: false,
    stickyUpScroll: false,
  },
  topbar: {
    hideOnMobile: true,
    sticky: false,
    stickyOnMobile: false,
  },
  mobileMenu: {
    transition: 'fade',
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
    showCollapseOnMobile: true,
    collapse: false,
    cssTransition: 'all ease 0.3s',
  },
  content: {
    breakpoint: 960,
  },
}
