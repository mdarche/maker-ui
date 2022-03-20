import * as React from 'react'
import { mergeSelectors } from '@maker-ui/utils'

import { useOptions } from '../../context/OptionContext'
import { MenuItem, type MenuItemProps } from './MenuItem'

interface NavMenuProps {
  menuItems?: MenuItemProps[]
  pathname?: string
}

/**
 * Used by the `Navbar` to render a list of primary menu items.
 *
 * @internal
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
