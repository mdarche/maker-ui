import React from 'react'

import { Link } from './Box'
import { BasicBoxProps } from '../types'

// TESTING REWRITE (props)
export const Logo = (props: any) => (
  <Link
    href="/"
    id="site-logo"
    variant="header.logo"
    aria-label="Home page"
    sx={{
      display: 'flex',
    }}
    {...props}
  />
)
