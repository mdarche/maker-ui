import React from 'react'
import { Box } from 'theme-ui'

import { MenuItem } from './common'
import { useOptions } from '../context/OptionContext'
import { useMenu, useSideNav } from '../context/ActionContext'

// TODO Add location hook here too

export const AccordionMenu = React.forwardRef(
  ({ menu = [], variant = 'accordion-menu', menuType, ...props }, ref) => {
    const [showMenu, toggleMenu] = useMenu()
    const { mobileMenu, sideNav } = useOptions()
    const [showSideNav, toggleSideNav] = useSideNav()

    const getControls = () => {
      if (menuType === 'mobile' && mobileMenu.closeOnRouteChange) {
        return { onClick: () => toggleMenu(!showMenu) }
      }

      if (menuType === 'sideNav' && sideNav.closeOnRouteChange) {
        return { onClick: () => toggleSideNav(!showSideNav) }
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
          <MenuItem key={index} data={item} menuControls={getControls()} />
        ))}
      </Box>
    )
  }
)
