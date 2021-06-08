import * as React from 'react'
import { MakerUIOptions } from 'maker-ui'
import Link from 'next/link'

export const options: MakerUIOptions = {
  colors: {
    light: {
      text: '#000',
      link: 'red',
      link_hover: 'green',
      primary: 'blue',
      background: '#fff',
      bg_topbar: 'blue',
      bg_header: '#fff',
      bg_dropdown: '#fff',
      bg_mobileMenu: '#000',
      bg_sideNav: '#fff',
      bg_footer: '#ddd',
    },
    dark: {
      text: '#000',
      link: 'red',
      link_hover: 'green',
      primary: 'blue',
      background: '#000',
      bg_topbar: 'blue',
      bg_header: '#fff',
      bg_dropdown: '#fff',
      bg_mobileMenu: '#000',
      bg_sideNav: '#fff',
      bg_footer: '#ddd',
    },
  },
  header: {
    navType: 'basic',
    sticky: true,
    stickyOnMobile: true,
    dropdown: {
      transition: 'fade-down',
    },
    breakpoint: 0,
  },
  linkFunction: (path, children, attributes) => (
    <Link href={path}>
      <a {...attributes}>{children}</a>
    </Link>
  ),
}
