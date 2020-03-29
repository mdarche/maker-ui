import React from 'react'
import { Box } from 'theme-ui'

import setBreakpoint from '../../utils/helper'

const Overlay = ({ show, toggle, type, bp }) => {
  const visibility = show ? 'visible' : 'hidden'
  const opacity = show ? 1 : 0

  const partial =
    type === 'sideNav'
      ? {
          visibility: setBreakpoint(bp, [visibility, 'hidden']),
          opacity: setBreakpoint(bp, [opacity, 0]),
        }
      : { visibility, opacity }

  return (
    <Box
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
        ...partial,
        willChange: 'opacity',
        transition: 'all ease .4s',
      }}
    />
  )
}

export default Overlay
