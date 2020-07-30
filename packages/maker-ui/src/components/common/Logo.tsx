import React from 'react'

import { Link } from './Primitives'

export const Logo = ({ children }) => (
  <Link
    href="/"
    id="site-logo"
    aria-label="Home page"
    sx={{
      variant: 'header.logo',
      display: 'inline-flex',
    }}>
    {children}
  </Link>
)
