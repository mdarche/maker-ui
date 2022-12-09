'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useRouter } from 'next/router'
import { MenuItem, type MenuItemProps } from './MenuItem'

interface CollapseProps extends React.HTMLAttributes<HTMLUListElement> {
  menu: MenuItemProps[]
  caret: boolean | React.ReactElement
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
export const CollapseMenu = React.forwardRef<HTMLUListElement, CollapseProps>(
  ({ menu = [], caret, className, ...props }, ref) => {
    const { asPath } = useRouter()

    return (
      <ul
        ref={ref}
        className={cn(['mkr_collapse', className])}
        role="navigation"
        {...props}>
        {menu.map((item, index) => (
          <MenuItem key={index} data={item} pathname={asPath} caret={caret} />
        ))}
      </ul>
    )
  }
)

CollapseMenu.displayName = 'CollapseMenu'