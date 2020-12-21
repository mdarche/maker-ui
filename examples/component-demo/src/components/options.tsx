import * as React from 'react'
import { MakerOptions } from 'maker-ui'

export const options: MakerOptions = {
  framework: 'gatsby',
  breakpoints: ['568px', '768px', '1440px'],
  colors: {
    // initialTheme: 'light',
    light: {
      link: 'red',
      text: '#333',
      background: '#fff',
      primary: '#1858dc',
      secondary: '#355cac',
      accent: '#1858dc',
      muted: '#f6f6f6',
      border: '#e6e6e6',
      bg_topbar: '#355cac',
      bg_header: '#fff',
      bg_mobileMenu: 'black',
      bg_sideNav: '#eee',
      bg_footer: 'blue',
      bg_toolbar: '#fbfbfb',
    },
    dark: {
      text: '',
      link: '',
      link_hover: '',
      primary: '',
      secondary: '',
      background: '',
      bg_topbar: '#355cac',
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
    stickyOnMobile: true,
    maxWidth: [200, 600],
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
      scrollTop: 2000,
    },
    dropdown: {
      transition: 'fade-down',
    },
    bpIndex: 2,
  },
  mobileMenu: {
    width: '60vw',
    transition: 'slide-left',
    closeOnBlur: true,
    // visibleOnDesktop: true,
    closeOnRouteChange: true,
  },
  sideNav: {
    // toggleButton: (isActive, atts) => <button {...atts}>Whaaat</button>,
  },
  content: {
    maxWidth: '1260px',
    maxWidthSection: 960,
    deferMeasurements: 500,
    bpIndex: 0,
  },
  footer: {
    maxWidth: [200, '100%'],
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
