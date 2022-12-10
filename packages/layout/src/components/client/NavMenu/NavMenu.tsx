'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useRouter } from 'next/router'
import { MenuItem, type MenuItemProps } from '../MenuItem'
import styles from './NavMenu.module.css'

interface NavMenuProps {
  transition?: 'scale' | 'fade' | 'fade-down' | 'fade-up' | 'none'
  caret?: boolean | React.ReactElement
  menuItems?: MenuItemProps[]
  pathname?: string
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
  const { asPath } = useRouter()

  return (
    <nav className={styles.nav} role="navigation">
      <ul className={cn(['menu-primary header-nav', `dropdown-${transition}`])}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={caret}
            pathname={asPath}
            isHeader
          />
        ))}
      </ul>
    </nav>
  )
}

NavMenu.displayName = 'NavMenu'
