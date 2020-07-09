import React from 'react'

import { Link } from './Box'
import { MakerProps } from '../types'

export const Logo = (props: MakerProps) => (
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
