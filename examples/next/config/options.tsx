import * as React from 'react'
import { MakerOptions } from 'maker-ui'
import Link from 'next/link'

export const options: MakerOptions = {
  header: {
    stickyScroll: true,
    dropdown: {
      transition: 'fade-down',
    },
    linkFunction: (path, label, attributes) => {
      console.log('Executing this!')
      return (
        <div>Poop</div>
        // <Link href={path}>
        //   <a {...attributes}>{label}</a>
        // </Link>
      )
    },
  },
}
