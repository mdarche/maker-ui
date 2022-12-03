'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { forwardRef } from 'react'

import { MenuItem, type MenuItemProps } from './MenuItem'
import { useOptions } from '../../temp/OptionContext'
import { useMenu, useSideNav } from '../../temp/ActionContext'

interface CollapseProps extends React.HTMLAttributes<HTMLUListElement> {
  menu: MenuItemProps[]
  menuType?: 'mobile' | 'sideNav' | string
  pathname?: string
  children?: React.ReactElement
}

/**
 * The `CollapseMenu` displays nested menus for the `SideNav` and `MobileMenu` components.
 * Menu items with submenus will render a show/hide arrow button next to the item label.
 *
 * Used as a default menu for `SideNav` and `MobileMenu` when child components
 * are not included and you supply a menu prop.
 *
 * @link https://maker-ui.com/docs/layout/collapsible-menu
 */
export const CollapseMenu = forwardRef<HTMLUListElement, CollapseProps>(
  ({ menu = [], menuType, pathname, className, ...props }, ref) => {
    const { asPath } = useRouter()
    const { mobileMenu, sideNav, linkFunction } = useOptions()
    const [, toggleMenu] = useMenu()
    const [, toggleSideNav] = useSideNav()

    const getControls = () => {
      if (menuType === 'mobile' && mobileMenu.closeOnRouteChange) {
        return { onClick: () => toggleMenu() }
      }

      if (
        typeof window !== 'undefined' &&
        menuType === 'sideNav' &&
        sideNav.closeOnRouteChange
      ) {
        const el = document.getElementById('sidenav')

        // Only run if on mobile (sideNav is fixed)
        if (!window || !el) return undefined

        return {
          onClick:
            window.getComputedStyle(el, '').position === 'fixed'
              ? () => toggleSideNav()
              : undefined,
        }
      }

      return undefined
    }

    return (
      <ul
        ref={ref}
        className={cn(['mkr-collapse', className])}
        role="navigation"
        {...props}>
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            menuControls={getControls()}
            pathname={asPath}
          />
        ))}
      </ul>
    )
  }
)

CollapseMenu.displayName = 'CollapseMenu'
