import React from 'react'

import { Box } from './Box'
import { useOptions } from '../context/OptionContext'

interface Link {
  id: string
  label: string
}

export const Skiplinks = () => {
  const { layout, a11y } = useOptions()

  let links: Link[] = [
    { id: '#content', label: 'Skip to content' },
    { id: '#footer', label: 'Skip to footer' },
  ]

  if (layout.includes('sidenav')) {
    links.splice(1, 0, {
      id: '#side-nav',
      label: 'Skip to side navigation',
    })
  }

  return a11y.skiplinks ? (
    <Box
      as="ul"
      __css={{
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
      {links.map(({ id, label }) => (
        <li key={id}>
          <a href={id}>{label}</a>
        </li>
      ))}
    </Box>
  ) : null
}
