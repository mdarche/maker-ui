import * as React from 'react'
import { MakerOptions } from 'maker-ui'

export const options: MakerOptions = {
  navType: 'center',
  layout: 'content-sidenav',
  topbar: {
    maxWidth: [200, 600],
  },
  header: {
    maxWidth: '100%',
    breakIndex: 0,
    stickyScroll: false,
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
}
