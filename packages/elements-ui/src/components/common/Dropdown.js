import React from 'react'
import { Box } from 'theme-ui'

// Configuration Partials

const fadeInUp = {}
const fadeInDown = {}
const expand = {}

const leftAlign = {}
const centerAlign = {}

const triangle = {}

const Dropdown = ({ submenu, active, set }) => (
  <Box
    as="ul"
    variant="header.submenu"
    className={`sub-menu ${active ? 'active' : ''}`}
    sx={{
      position: 'absolute',
      display: 'inline-block',
      width: 'max-content',
      top: '98%',
      left: 0,
      opacity: 0,
      visibility: 'hidden',
      '&.active': {
        opacity: 1,
        visibility: 'visible',
      },
    }}>
    {submenu.map(({ label, path, newTab }, index) => (
      <li key={index}>
        <a
          href={path}
          target={newTab && '_blank'}
          onBlur={submenu.length === index + 1 ? () => set(false) : undefined}>
          {label}
        </a>
      </li>
    ))}
  </Box>
)

export default Dropdown
