import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import { useMenu, useSideNav } from '../../context/ActionContext'
import setBreak from '../../config/breakpoint'

const getAttributes = (
  menu,
  toggleMenu,
  sideMenu,
  toggleSideMenu,
  sideNavPrimary
) =>
  sideNavPrimary
    ? { 'aria-expanded': sideMenu ? 'true' : 'false', onClick: toggleSideMenu }
    : { 'aria-expanded': menu ? 'true' : 'false', onClick: toggleMenu }

export default props => {
  const [menu, toggleMenu] = useMenu()
  const [sideMenu, toggleSideMenu] = useSideNav()
  const { mobileMenu, header, sideNav } = useOptions()

  const { custom, visibleOnDesktop = mobileMenu.visibleOnDesktop } = props

  const visibility = visibleOnDesktop
    ? !sideNav.isPrimaryMobileNav
      ? { display: 'block' }
      : { display: 'none' }
    : { display: setBreak(header.breakIndex, ['block', 'none']) }

  return (
    <Box
      as="button"
      title="Menu"
      aria-label="Toggle Menu"
      {...getAttributes(
        menu,
        toggleMenu,
        sideMenu,
        toggleSideMenu,
        sideNav.isPrimaryMobileNav
      )}
      variant="header.menuButton"
      __css={{
        ...visibility,
        m: '0 auto',
        border: 'none',
        background: 'none',
        svg: { m: '0 auto' },
      }}>
      {custom || (
        <Box
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          sx={{
            display: 'block',
            margin: 0,
            height: 27,
          }}>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </Box>
      )}
    </Box>
  )
}
