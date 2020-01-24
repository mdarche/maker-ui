import React from 'react'
import { Box } from 'theme-ui'

import { useMenu } from '../context/ElementsContext'

export const MobileNav = React.forwardRef((props, ref) => {
  const [menu, toggleMenu] = useMenu()

  const visibility = {}
  const transition = {}

  return <Box ref={ref} id="mobile-nav" {...props} sx={{ position: 'fixed' }} />
})
