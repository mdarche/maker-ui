/** @jsx jsx */
import { jsx } from '@emotion/react'

import { MenuProps } from './MenuItem'
import { useOptions } from '../../context/OptionContext'
import { MenuItem } from './MenuItem'
import { useMediaQuery } from '../../hooks/useMediaQuery'

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
  const { mediaQuery } = useMediaQuery('header')

  return (
    <nav
      className="nav-primary"
      role="navigation"
      css={mediaQuery('display', ['none', 'flex'])}>
      <ul className="menu-primary">
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
