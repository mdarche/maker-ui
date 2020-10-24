import React from 'react'

import { Link } from './Primitives'

// TODO - Add wrapper component instead of Link primitive
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
