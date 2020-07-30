/** @jsx jsx */
import { jsx } from 'theme-ui'
import { memo } from 'react'

import { MenuProps } from '../types'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'
import { MenuItem } from './MenuItem'

interface NavMenuProps {
  menuItems: MenuProps[]
  pathname?: string
}

export const NavMenu = memo(({ menuItems = [], pathname }: NavMenuProps) => {
  const { header } = useOptions()

  return (
    <nav
      className="nav-primary"
      role="navigation"
      sx={{ display: setBreakpoint(header.breakIndex, ['none', 'flex']) }}>
      <ul className="menu-primary" sx={{ variant: 'header.menu' }}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={header.dropdown.caret}
            pathname={pathname}
            isHeader
          />
        ))}
      </ul>
    </nav>
  )
})
