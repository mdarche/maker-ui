import * as React from 'react'
import { MakerOptions } from 'maker-ui'

export const options: MakerOptions = {
  framework: 'gatsby',
  topbar: {
    sticky: false,
    stickyOnMobile: true,
    maxWidth: [200, 600],
  },
  header: {
    navType: 'split',
    maxWidth: '100%',
    sticky: true,
    // stickyUpScroll: true,
    stickyOnMobile: true,
    showColorButton: true,
    scrollClass: {
      className: 'scroll-test',
      scrollTop: 2000,
    },
    dropdown: {
      transition: 'fade-down',
    },
    bpIndex: 0,
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
    maxWidth: 960,
    maxWidthSection: 960,
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
