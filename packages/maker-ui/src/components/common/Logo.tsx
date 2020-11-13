import * as React from 'react'

import { useOptions } from '../../context/OptionContext'
import { Link } from './Primitives'

export const Logo = ({ children }) => {
  const { linkFunction } = useOptions()

  const attributes = {
    id: 'site-logo',
    'aria-label': 'Home page',
  }

  return linkFunction ? (
    linkFunction('/', children, attributes)
  ) : (
    <Link
      href="/"
      {...attributes}
      sx={{ variant: 'header.logo', display: 'inline-flex' }}>
      {children}
    </Link>
  )
}
