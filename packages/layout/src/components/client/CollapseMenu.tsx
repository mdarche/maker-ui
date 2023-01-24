'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { usePathname } from 'next/navigation'
import {
  MenuItem,
  type ExpandButtonProps,
  type MenuItemProps,
} from './MenuItem'

interface CollapseProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MenuItemProps[]
  expandButton?: ExpandButtonProps
  children?: React.ReactElement
}

/**
 * The `CollapseMenu` displays nested menus for navibation.
 * Menu items with submenus will render a show/hide arrow button next to the item label.
 *
 * @link https://maker-ui.com/docs/layout/collapse-menu
 */
export const CollapseMenu = React.forwardRef<HTMLUListElement, CollapseProps>(
  ({ items = [], expandButton, className, ...props }, ref) => {
    const pathname = usePathname()

    return (
      <ul
        ref={ref}
        className={cn(['mkui-collapse-menu', className])}
        role="navigation"
        {...props}>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            pathname={pathname}
            expandButton={expandButton}
          />
        ))}
      </ul>
    )
  }
)

CollapseMenu.displayName = 'CollapseMenu'
