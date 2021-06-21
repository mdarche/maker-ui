import * as React from 'react'
import { MakerUIOptions } from 'maker-ui'
import Link from 'next/link'

export const options: MakerUIOptions = {
  fonts: {
    heading: 'Inter, Helvetica Neue, Arial, sans-serif',
    body: 'Inter, Helvetica Neue, Arial, sans-serif',
    monospace: 'monospace',
  },
  colors: {
    classic: {
      text: '#000',
      link: '#3B67BC',
      link_hover: 'green',
      primary: '#3B67BC',
      background: '#fff',
      border: '#F0F2F7',
      border_dark: '#E4E4E4',
      header_fill: '#282935',
      callout_suggestion: '#dcffdc',
      callout_suggestion_border: '#0ddf0d',
      callout_alert: '#feebeb',
      callout_alert_border: 'red',
      callout_hint: '',
      callout_hint_border: '',
      muted: '#a2adbf',
      bg_header: '#fff',
      bg_dropdown: '#fff',
      bg_sideNav: '#FBFCFF',
      bg_code: '#f2f3f9',
    },
    dark: {
      text: '#fff',
      link: 'red',
      link_hover: 'green',
      primary: 'blue',
      background: '#000',
      bg_header: '#fff',
      bg_dropdown: '#fff',
      bg_sideNav: '#fff',
    },
  },
  useColorDefaults: false,
  header: {
    maxWidth: '100%',
    navType: 'basic-left',
    sticky: true,
    stickyOnMobile: true,
    breakpoint: 0,
    showColorButton: false,
  },
  linkFunction: (path, children, attributes) => (
    <Link href={path}>
      <a {...attributes}>{children}</a>
    </Link>
  ),
  content: {
    maxWidth: 1200,
  },
  sideNav: {
    width: 300,
    isPrimaryMobileNav: true,
    showToggleOnMobile: false,
  },
}
