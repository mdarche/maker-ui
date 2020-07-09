import React from 'react'

import { Box } from './common'
import { BasicBoxProps, MenuProps } from './types'
import { MenuItem } from './common'
import { useOptions } from '../context/OptionContext'
import { useMenu, useSideNav } from '../context/ActionContext'

interface AccordionProps extends BasicBoxProps {
  menu: MenuProps[]
  menuType: string
  pathname?: string
}

const defaultProps = {
  variant: 'accordion-menu',
  menu: [],
}

/**
 * Use the `AccordionMenu` to display nested menus for `SideNav` and `MobileMenu`.
 * Menu items with submenus will render a show/hide arrow button next to the item label.
 *
 * @remark Used as a default menu for `SideNav` and `MobileMenu` when child components
 * are not included and you supply a menu prop.
 *
 * @see https://maker-ui.com/docs/accordion-menu
 */

export const AccordionMenu = React.forwardRef<HTMLElement, AccordionProps>(
  ({ menu, variant, menuType, pathname, ...props }, ref) => {
    const { mobileMenu, sideNav } = useOptions()
    const [showMenu, toggleMenu] = useMenu()
    const [showSideNav, toggleSideNav] = useSideNav()

    const getControls = () => {
      if (menuType === 'mobile' && mobileMenu.closeOnRouteChange) {
        return { onClick: e => toggleMenu(!showMenu) }
      }

      if (menuType === 'sideNav' && sideNav.closeOnRouteChange) {
        return { onClick: e => toggleSideNav(!showSideNav) }
      }

      return undefined
    }

    return (
      <Box
        ref={ref}
        as="ul"
        variant={variant}
        className="accordion-menu"
        role="navigation"
        {...props}>
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            menuControls={getControls()}
            pathname={pathname}
          />
        ))}
      </Box>
    )
  }
)

AccordionMenu.defaultProps = defaultProps
