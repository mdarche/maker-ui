import { MakerUIOptions } from './types'

/**
 * Default Maker UI option configuration.
 *
 * @link `MakerOptions` in src/types.ts for complete list of properties.
 * @todo - Revisit all of these defaults
 *
 */
export const defaultOptions: MakerUIOptions = {
  fonts: {
    body: 'sans-serif',
    heading: 'sans-serif',
    monospace: 'monospace',
  },
  breakpoints: ['768px', '960px', '1440px'],
  colors: {
    light: {
      link: 'red',
      link_hover: 'green',
      text: '#333',
      background: '#ffffff',
      primary: '#1858dc',
      secondary: '#355cac',
      accent: '#1858dc',
      muted: '#f6f6f6',
      border: '#e6e6e6',
      bg_topbar: '#355cac',
      bg_header: '#ffffff',
      bg_mobileMenu: 'black',
      bg_sideNav: '#eee',
      bg_footer: '#d3d3d3',
      bg_toolbar: '#fbfbfb',
    },
  },
  persistentColorMode: true,
  useColorDefaults: true,
  useMeasurementDefaults: true,
  variables: {},
  topbar: {
    maxWidth: 1260,
    hideOnMobile: false,
    breakpoint: 0,
    errorBoundary: false,
  },
  header: {
    navType: 'basic',
    mobileNavType: 'basic',
    maxWidth: 1460,
    sticky: false,
    stickyOnMobile: false,
    stickyUpScroll: false,
    showColorButton: true,
    showColorButtonOnMobile: true,
    showWidgetsOnMobile: false,
    menuOverflow: 'wrap',
    dropdown: {
      caret: 'default',
      transition: 'fade',
    },
    breakpoint: 0,
    errorBoundary: false,
  },
  mobileMenu: {
    width: '60vw',
    transition: 'slide-left',
    visibleOnDesktop: false,
    showCloseButton: true,
    closeOnBlur: true,
    closeOnRouteChange: false,
    errorBoundary: false,
  },
  sideNav: {
    width: [250, 300],
    isHeader: false,
    isPrimaryMobileNav: false,
    showToggleOnMobile: true,
    toggleButton: 'default',
    closeOnBlur: true,
    closeOnRouteChange: true,
    cssTransition: 'transform ease 0.3s, margin ease 0.3s',
    breakpoint: 0,
    collapse: false,
    collapseButton: 'default',
    errorBoundary: false,
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    sidebarGap: 30,
    breakpoint: 0,
    errorBoundary: false,
  },
  sidebar: {
    width: 300,
    secondWidth: 200,
    errorBoundary: false,
  },
  footer: {
    maxWidth: 1020,
    errorBoundary: false,
  },
  a11y: {
    skiplinks: true,
  },
  errors: {
    showStackTrace: false,
  },
}
