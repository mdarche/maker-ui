import React from 'react'
import { Box } from 'theme-ui'

const Overlay = React.forwardRef(({ show, toggle }, ref) => (
  <Box
    ref={ref}
    className="menu-overlay"
    role="presentation"
    onClick={toggle}
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bg: 'rgba(0, 0, 0, 0.15)',
      zIndex: 100,
      visibility: show ? 'visible' : 'hidden',
      opacity: show ? 1 : 0,
      transition: 'all ease .4s',
    }}
  />
))

export default Overlay
