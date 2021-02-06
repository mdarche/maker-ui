import * as React from 'react'
import { MakerOptions } from 'maker-ui'

export const options: Partial<MakerOptions> = {
  framework: 'gatsby',
  breakpoints: ['510px', '730px', '1280px'],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    light: {
      link: 'red',
      link_hover: 'green',
      text: '#333',
      background: '#fff',
      primary: '#1858dc',
      secondary: '#355cac',
      accent: '#1858dc',
      muted: '#f6f6f6',
      border: '#e6e6e6',
      bg_topbar: '#355cac',
      bg_header: '#fff',
      bg_mobileMenu: 'gainsboro',
      bg_sideNav: '#eee',
      bg_footer: 'gainsboro',
      bg_toolbar: '#fbfbfb',
    },
    dark: {
      text: '#fff',
      link: '',
      link_hover: '',
      primary: '',
      secondary: '',
      background: '#000',
      bg_topbar: '#000',
      bg_header: '#000',
      bg_dropdown: '',
      bg_mobileMenu: 'rgba(0, 0, 0, 0.9)',
      bg_sideNav: '#333',
      bg_footer: '#fff',
      bg_toolbar: '#fbfbfb',
      bg_panel: '#d3d3d3',
    },
  },
  topbar: {
    sticky: true,
    stickyOnMobile: false,
    maxWidth: [200, 600],
    hideOnMobile: false,
    breakpoint: 0,
  },
  header: {
    navType: 'basic',
    mobileNavType: 'basic',
    maxWidth: [500, '100%'],
    sticky: true,
    // stickyUpScroll: true,
    stickyOnMobile: true,
    showColorButton: true,
    // menuOverflow: 'scroll',
    scrollClass: {
      className: 'scroll-test',
      scrollTop: 200,
    },
    dropdown: {
      transition: 'fade-down',
    },
    breakpoint: 0,
  },
  mobileMenu: {
    width: '60vw',
    transition: 'slide-left',
    closeOnBlur: true,
    visibleOnDesktop: true,
    closeOnRouteChange: true,
  },
  sideNav: {
    // toggleButton: (isActive, atts) => <button {...atts}>Whaaat</button>,
  },
  content: {
    maxWidth: '1260px',
    maxWidthSection: 960,
    deferMeasurements: 500,
    breakpoint: 1,
  },
  footer: {
    maxWidth: [200, 960],
  },
  errors: {
    // logFunction: (error, errorInfo, component) => {
    //   console.log(
    //     'Coming in hot from the log function: ',
    //     error,
    //     errorInfo,
    //     component
    //   )
    // },
    showStackTrace: true,
    errorMessage: {
      content: <div>Content</div>,
      // main: <div>Main</div>,
    },
  },
}
