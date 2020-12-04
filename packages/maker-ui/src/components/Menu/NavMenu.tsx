/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MenuProps } from './MenuItem'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'
import { MenuItem } from './MenuItem'

interface NavMenuProps {
  menuItems: MenuProps[]
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
    <nav
      className="nav-primary"
      role="navigation"
      sx={{ display: setBreakpoint(header.bpIndex, ['none', 'flex']) }}>
      <ul className="menu-primary" sx={{ variant: 'header.menu' }}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={header.dropdown.caret}
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
