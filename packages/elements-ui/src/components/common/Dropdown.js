import React from 'react'
import { Box } from 'theme-ui'

const Dropdown = ({ submenu, active, set }) => (
  <Box
    as="ul"
    variant="header.submenu"
    className={`sub-menu ${active ? 'active' : ''}`}
    sx={{
      position: 'absolute',
      display: 'inline-block',
      width: 'max-content',
      top: '99%',
      left: 0,
      opacity: 0,
      visibility: 'hidden',
      variant: 'eui_header.submenu',
      '&.active': {
        variant: 'eui_header.submenu.active',
      },
    }}>
    {submenu.map(({ label, path, newTab }, index) => (
      <li key={index}>
        <a
          href={path}
          target={newTab && '_blank'}
          onFocus={() => set(true)}
          onBlur={() => set(false)}
          onClick={() => set(false)}>
          <span>{label}</span>
        </a>
      </li>
    ))}
  </Box>
)

export default Dropdown
