/** @jsx jsx */
import { jsx } from '@maker-ui/css'

import { MenuItemProps } from './MenuItem'
import { useOptions } from '../../context/OptionContext'
import { MenuItem } from './MenuItem'
import { setBreakpoint, mergeSelectors } from '../../utils/helper'

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
  const { header, breakpoints, linkFunction } = useOptions()

  return (
    <nav
      className="nav-primary"
      role="navigation"
      breakpoints={setBreakpoint(header.breakpoint, breakpoints)}
      css={{ display: ['none', 'flex'] }}>
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
