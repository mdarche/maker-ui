import React from 'react'

import { Box } from './Box'
import { MenuProps } from '../props'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'
import MenuItem from './MenuItem'

interface Props {
  menuItems: MenuProps[]
  pathname: string
}

export const Menu = React.memo(({ menuItems = [], pathname }: Props) => {
  const { header } = useOptions()

  return (
    <Box
      as="nav"
      className="nav-primary"
      sx={{ display: setBreakpoint(header.breakIndex, ['none', 'flex']) }}>
      <Box as="ul" variant="header.menu" className="menu-primary">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={header.dropdown.caret}
            pathname={pathname}
            isHeader
          />
        ))}
      </Box>
    </Box>
  )
})
