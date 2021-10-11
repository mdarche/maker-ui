import * as React from 'react'

import { MenuItemProps } from './MenuItem'
import { useOptions } from '../../context/OptionContext'
import { MenuItem } from './MenuItem'
import { mergeSelectors } from '../../utils/helper'

interface NavMenuProps {
  menuItems?: MenuItemProps[]
  pathname?: string
}

/**
 * Used by the `Navbar` to render a list of primary menu items.
 *
 * @internal usage only
 *
 */

export const NavMenu = ({ menuItems = [], pathname }: NavMenuProps) => {
  const { header, linkFunction } = useOptions()

  return (
    <nav className="nav-primary" role="navigation">
      <ul
        className={mergeSelectors([
          'menu-primary',
          'header-nav',
          `dropdown-${header.dropdown.transition}`,
        ])}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={header.dropdown?.caret}
            pathname={pathname}
            linkFunction={linkFunction}
            isHeader
          />
        ))}
      </ul>
    </nav>
  )
}

NavMenu.displayName = 'NavMenu'
