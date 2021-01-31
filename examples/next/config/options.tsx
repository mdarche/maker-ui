import * as React from 'react'
import { MakerOptions } from 'maker-ui'
import Link from 'next/link'

export const options: Partial<MakerOptions> = {
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
