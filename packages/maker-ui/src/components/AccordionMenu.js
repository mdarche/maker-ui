import React from 'react'
import { Box } from 'theme-ui'

import { MenuItem } from './common'
import { useOptions } from '../context/OptionContext'
import { useMenu, useSideNav } from '../context/ActionContext'

const AccordionMenu = React.forwardRef(
  (
    { menu = [], variant = 'accordion-menu', menuType, pathname, ...props },
    ref
  ) => {
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

export default AccordionMenu
