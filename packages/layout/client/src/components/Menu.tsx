import * as React from 'react'
import { cn, Conditional } from '@maker-ui/utils'
import { usePathname } from 'next/navigation'
import type { MenuItemProps } from '@maker-ui/layout-server'
import { MenuItem, type ExpandButtonProps } from './MenuItem'

interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MenuItemProps[]
  nav?: boolean
  caret?: boolean | React.ReactElement
  transition?: 'scale' | 'fade' | 'fade-down' | 'fade-up' | 'none'
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
  (
    {
      items = [],
      expandButton,
      transition = 'fade',
      caret = false,
      nav = false,
      className,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname()

    return (
      <Conditional
        condition={nav}
        trueWrapper={(c) => (
          <nav className="mkui-nav-menu" role="navigation">
            {c}
          </nav>
        )}>
        <ul
          ref={ref}
          className={cn([
            'mkui-menu',
            nav ? 'menu-primary nav-header' : undefined,
            nav ? `dropdown-${transition}` : undefined,
            nav && transition.includes('fade') ? 'mkui-fade' : undefined,
            className,
          ])}
          role="navigation"
          {...props}>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              data={item}
              caret={caret}
              pathname={pathname}
              expandButton={expandButton}
              nav={nav}
            />
          ))}
        </ul>
      </Conditional>
    )
  }
)

Menu.displayName = 'Menu'
