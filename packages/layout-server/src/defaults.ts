import { Options } from '@/types'

export const defaultSettings: Options = {
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
  },
  sideNav: {
    breakpoint: 960,
    isHeader: false,
    isPrimaryMobileNav: false,
    closeOnBlur: true,
    closeOnRouteChange: true,
    showCollapseOnMobile: true,
    collapse: false,
    cssTransition: 'margin ease 0.3s, transform ease 0.3s',
  },
  content: {
    breakpoint: 960,
  },
  workspace: {
    breakpoint: 960,
    main: true,
    closeOnBlur: true,
  },
}