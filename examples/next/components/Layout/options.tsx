import * as React from 'react'
import { MakerUIOptions } from 'maker-ui'
import Link from 'next/link'

export const options: MakerUIOptions = {
  colors: {
    light: {
      text: '#333',
      background: '#fff',
      primary: '#1858dc',
      secondary: '#355cac',
      accent: '#1858dc',
      muted: '#f6f6f6',
      border: '#e6e6e6',
      bg_topbar: '#355cac',
      bg_header: '#fff',
      bg_mobileNav: 'rgba(0, 0, 0, 0.9)',
      bg_sideNav: '#eee',
      bg_footer: 'purple',
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  breakpoints: ['768px', '960px', '1240px'],
  header: {
    navType: 'basic',
    sticky: true,
    stickyOnMobile: true,
    dropdown: {
      transition: 'fade-down',
    },
    breakpoint: 0,
  },
  linkFunction: (
    path: string,
    children: React.ReactNode,
    attributes: object
  ) => (
    <Link href={path}>
      <a {...attributes}>{children}</a>
    </Link>
  ),
}
