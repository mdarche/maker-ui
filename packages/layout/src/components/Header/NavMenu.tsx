import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useRouter } from 'next/router'

import { MenuItem, type MenuItemProps } from '../Menu/MenuItem'
import { HeaderOptions } from '@/types'

interface NavMenuProps {
  dropdown?: HeaderOptions['dropdown']
  menuItems?: MenuItemProps[]
  pathname?: string
}

/**
 * Used by the `Navbar` to render a list of primary menu items.
 *
 * @internal
 *
 */
export const NavMenu = ({ menuItems = [], dropdown }: NavMenuProps) => {
  const { asPath } = useRouter()

  return (
    <nav className="nav-primary" role="navigation">
      <ul
        className={cn([
          'menu-primary',
          'header-nav',
          `dropdown-${dropdown?.transition}`,
        ])}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={dropdown?.caret}
            pathname={asPath}
            isHeader
          />
        ))}
      </ul>
    </nav>
  )
}

NavMenu.displayName = 'NavMenu'
