import { Options } from '@/types'

const panelDefaults = {
  isHeader: false,
  defaultOpen: true,
  collapseWidth: 0,
  closeOnRouteChange: true,
}

export const defaultSettings: Options = {
  skiplinks: true,
  colorThemes: [],
  header: {
    breakpoint: 960,
    template: 'basic',
    templateMobile: 'basic',
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
  content: {
    breakpoint: 960,
    sidebar: 'right',
  },
  leftPanel: panelDefaults,
  rightPanel: panelDefaults,
}
