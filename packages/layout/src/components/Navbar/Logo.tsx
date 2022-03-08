import * as React from 'react'
import { A } from '@maker-ui/primitives'

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
    <A href="/" {...attributes} css={{ display: 'inline-flex' }}>
      {children}
    </A>
  )
}

Logo.displayName = 'Logo'
