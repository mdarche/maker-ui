import * as React from 'react'

import { useOptions } from '../../context/OptionContext'
import { Link } from '../Primitives'

/**
 * The `Logo` is used by `Navbar` to show a custom logo wrapped in a link to
 * the site's index page.
 *
 * @internal usage only
 */

export const Logo = ({ children }): React.ReactElement => {
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

Logo.displayName = 'Logo'
