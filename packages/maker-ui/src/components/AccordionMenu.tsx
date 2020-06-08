import React from 'react'

import { Box } from './common'
import { BoxProps, MenuProps } from './props'
import { MenuItem } from './common'
import { useOptions } from '../context/OptionContext'
import { useMenu, useSideNav } from '../context/ActionContext'

interface AccordionProps extends BoxProps {
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
 * @see https://maker-ui.com/components/accordion-menu
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
