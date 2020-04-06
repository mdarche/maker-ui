import React from 'react'
import { Box } from 'theme-ui'
import { useTransition, animated as a } from 'react-spring'

// use for Tooltips, Supplemental content, and Dropdown menus

const Popover = React.forwardRef(
  (
    {
      target,
      position,
      show,
      role = 'tooltip',
      appendTo = 'document.body',
      transition,
    },
    ref
  ) => {
    console.log(
      target.current ? target.current.getBoundingClientRect() : 'nope'
    )
    return (
      show && (
        <Box role={role} ref={ref}>
          TODO
        </Box>
      )
    )
  }
)

// Need Popover, Tooltip for links, Dropdown Menu

export default Popover
