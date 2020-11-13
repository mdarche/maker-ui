import * as React from 'react'
import { MakerOptions } from 'maker-ui'
import Link from 'next/link'

export const options: MakerOptions = {
  header: {
    stickyScroll: true,
    dropdown: {
      transition: 'fade-down',
    },
  },
  linkFunction: (path, children, attributes) => (
    <Link href={path}>
      <a {...attributes}>{children}</a>
    </Link>
  ),
}
