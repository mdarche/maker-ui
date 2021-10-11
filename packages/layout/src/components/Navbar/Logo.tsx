import * as React from 'react'

import { useOptions } from '../../context/OptionContext'

interface LogoProps {
  children: string | React.ReactElement
}
/**
 * The `Logo` is used by `Navbar` to show a custom logo wrapped in a link to
 * the site's index page.
 *
 * @internal usage only
 */

export const Logo = ({ children }: LogoProps): React.ReactElement => {
  const { linkFunction } = useOptions()

  const attributes = {
    id: 'site-logo',
    'aria-label': 'Home page',
  }

  return linkFunction ? (
    linkFunction('/', children, attributes)
  ) : (
    <a href="/" {...attributes} css={{ display: 'inline-flex' }}>
      {children}
    </a>
  )
}

Logo.displayName = 'Logo'
