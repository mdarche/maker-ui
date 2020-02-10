import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import MenuItem from './MenuItem'

const Menu = ({ menuItems = [], location }) => {
  const { header } = useOptions()

  return (
    <Box as="nav" className="nav-primary" sx={{ display: ['none', 'flex'] }}>
      <Box as="ul" variant="header.menu" className="menu-primary">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={header.dropdown.caret}
            location={location}
            isHeader
          />
        ))}
      </Box>
    </Box>
  )
}

export default Menu
