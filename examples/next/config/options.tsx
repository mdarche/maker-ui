import * as React from 'react'
import { MakerUIOptions } from 'maker-ui'
import Link from 'next/link'

export const options: MakerUIOptions = {
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
