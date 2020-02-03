import React from 'react'
import { Box, MenuButton } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import { useMenu } from '../../context/ActionContext'

// TODO useSideNav if sidenav is primary && floating button is disabled

export default props => {
  const [menu, toggleMenu] = useMenu()
  const { mobileMenu } = useOptions()

  const { custom, visibleOnDesktop = mobileMenu.visibleOnDesktop } = props

  const visibility = visibleOnDesktop
    ? { display: 'block' }
    : { display: ['block', 'none'] }

  return custom ? (
    <Box
      as="button"
      title="Menu"
      aria-label="Toggle Menu"
      aria-expanded={menu ? 'true' : 'false'}
      onClick={toggleMenu}
      variant="header.menuButton"
      sx={{ ...visibility, m: '0 auto' }}>
      {custom}
    </Box>
  ) : (
    <MenuButton
      aria-expanded={menu ? 'true' : 'false'}
      onClick={toggleMenu}
      variant="header.menuButton"
      sx={{ ...visibility, svg: { m: '0 auto' } }}
    />
  )
}
