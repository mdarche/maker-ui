import React, { useState } from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../../context/ElementsContext'
import Dropdown from './Dropdown'

const MenuItem = ({ data: { label, path, newTab, submenu }, caret }) => {
  const [active, set] = useState(false)
  return (
    <Box
      as="li"
      sx={{
        position: 'relative',
        display: 'inline-flex',
        '&:hover': {
          '.sub-menu': {
            variant: 'eui_header.submenu.active',
          },
        },
      }}>
      <a
        href={path}
        target={newTab && '_blank'}
        onFocus={submenu ? () => set(true) : undefined}>
        <Box
          as="span"
          sx={
            submenu && caret
              ? {
                  '&:after': {
                    content: '""',
                    display: 'inline-block',
                    width: 0,
                    height: 0,
                    ml: '.35em',
                    verticalAlign: '.2em',
                    borderTop: '.3em solid',
                    borderRight: '.3em solid transparent',
                    borderLeft: '.3em solid transparent',
                  },
                }
              : null
          }>
          {label}
        </Box>
      </a>
      {submenu ? (
        <Dropdown submenu={submenu} active={active} set={set} />
      ) : null}
    </Box>
  )
}

const Menu = ({ menuItems = [] }) => {
  const { header } = useOptions()

  return (
    <Box as="nav" className="nav-primary" sx={{ display: ['none', 'flex'] }}>
      <Box as="ul" variant="header.menu" className="menu-primary">
        {menuItems.map((item, index) => (
          <MenuItem key={index} data={item} caret={header.dropdown.caret} />
        ))}
      </Box>
    </Box>
  )
}

export default Menu
