import * as React from 'react'
import { MakerOptions } from 'maker-ui'

export const options: MakerOptions = {
  navType: 'basic',
  topbar: {
    maxWidth: [200, 600],
  },
  header: {
    maxWidth: '100%',
    breakIndex: 0,
    stickyUpScroll: false,
    showColorButton: true,
    dropdown: {
      transition: 'fade-down',
    },
  },
  mobileMenu: {
    width: '60vw',
    transition: 'slide-left',
    closeOnBlur: true,
    closeOnRouteChange: true,
    defaultCloseButton: true,
    // customCloseButton: (isOpen, attributes) => (
    //   <button {...attributes}>{isOpen ? 'Close!' : 'Open!'}</button>
    // ),
  },
  sideNav: {
    // customToggle: (isOpen, attributes) => (
    //   <button
    //     style={{ position: 'fixed', bottom: 100, left: 20 }}
    //     {...attributes}>
    //     {isOpen ? 'close' : 'open'}
    //   </button>
    // ),
  },
  content: {
    maxWidth: 960,
    maxWidthSection: 960,
    breakIndex: 0,
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
