import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { usePathname } from 'next/navigation'
import type { MenuItemProps } from '@maker-ui/layout-server'
import { MenuItem, type ExpandButtonProps } from './MenuItem'

interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
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
export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  ({ items = [], expandButton, className, ...props }, ref) => {
    const pathname = usePathname()

    return (
      <ul
        ref={ref}
        className={cn(['mkui-menu', className])}
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

Menu.displayName = 'Menu'
