import React from 'react'

import { Box } from './common'
import { useOptions } from '../context/OptionContext'

export interface Link {
  id: string
  label: string
}

interface SkipLinkProps {
  links?: Link[]
}

/**
 * Adds default skiplinks to the layout if enabled via `options` configuration.
 * By default, Skiplinks support #content, #footer, and #side-nav. You can supply your own
 * Link array for extra accessibility control.
 *
 * @internal only
 */

export const Skiplinks = (props: SkipLinkProps) => {
  const { layout, a11y } = useOptions()
  let linkMenu: Link[] = []

  if (props.links) {
    linkMenu = props.links
  } else {
    linkMenu = [
      { id: '#content', label: 'Skip to content' },
      { id: '#footer', label: 'Skip to footer' },
    ]
  }

  if (layout.includes('sidenav')) {
    linkMenu.splice(1, 0, {
      id: '#side-nav',
      label: 'Skip to side navigation',
    })
  }

  return a11y.skiplinks ? (
    <Box
      as="ul"
      sx={{
        listStyle: 'none',
        position: 'relative',
        zIndex: 1000,
        p: 0,
        a: {
          bg: 'bg_header',
          display: 'block',
          position: 'absolute',
          fontFamily: 'body',
          left: -9999,
          p: '1em',
          '&:focus': {
            left: 0,
          },
        },
      }}>
      {linkMenu.map(({ id, label }) => (
        <li key={id}>
          <a href={id}>{label}</a>
        </li>
      ))}
    </Box>
  ) : null
}
