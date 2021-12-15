import * as React from 'react'
import { MakerUIOptions } from 'maker-ui'
import Link from 'next/link'

import { colors } from './colors'

export const options: MakerUIOptions = {
  fonts: {
    heading: 'Helvetica Neue, Arial, sans-serif',
    body: 'Helvetica Neue, Arial, sans-serif',
    monospace: 'monospace',
  },
  colors,
  useColorDefaults: false,
  header: {
    maxWidth: '100%',
    navType: 'basic-left',
    sticky: true,
    stickyOnMobile: true,
    breakpoint: 1000,
    showColorButton: false,
    showWidgetsOnMobile: true,
    stickyUpScroll: {
      delay: 50,
      start: 1000,
    },
    dropdown: {
      transition: 'fade-down',
    },
  },
  mobileMenu: {
    transition: 'slide-left',
  },
  linkFunction: function nextLink(
    path: string,
    children: React.ReactNode,
    attributes: object,
    icon: React.ReactNode
  ) {
    return (
      <Link href={path}>
        <a {...attributes}>
          {icon ? <span className="label-icon">{icon}</span> : null}
          {children}
        </a>
      </Link>
    )
  },
  content: {
    maxWidth: 1050,
  },
  sideNav: {
    width: 280,
    breakpoint: 1000,
    isPrimaryMobileNav: true,
    showToggleOnMobile: false,
    // collapse: true,
  },
}
