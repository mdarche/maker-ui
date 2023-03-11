import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { MenuItemProps } from '@maker-ui/layout-server'
import { usePathname } from 'next/navigation'
import { MenuItem } from './MenuItem'

interface NavMenuProps {
  transition?: 'scale' | 'fade' | 'fade-down' | 'fade-up' | 'none'
  caret?: boolean | React.ReactElement
  menuItems?: MenuItemProps[]
}

/**
 * Used by the `Navbar` to render a list of primary menu items.
 *
 * @internal
 *
 */
export const NavMenu = ({
  menuItems = [],
  transition = 'fade',
  caret = false,
}: NavMenuProps) => {
  const pathname = usePathname()

  return (
    <nav className="mkui-nav-menu" role="navigation">
      <ul
        className={cn([
          'menu-primary nav-header',
          `dropdown-${transition}`,
          transition.includes('fade') ? 'mkui-fade' : undefined,
        ])}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={caret}
            pathname={pathname}
            isHeader
          />
        ))}
      </ul>
    </nav>
  )
}

NavMenu.displayName = 'NavMenu'
