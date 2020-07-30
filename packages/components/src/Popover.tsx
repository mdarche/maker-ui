import React, { useEffect } from 'react'
import { Box, BasicBoxProps, useMakerUI } from 'maker-ui'

// import { useTransition, animated as a } from 'react-spring'

// use for Tooltips, Supplemental content, and Dropdown menus

export interface PopoverProps extends BasicBoxProps {
  target?: string
  position?: any
  show?: boolean
  role?: string
  appendTo?: string
  transition?: string
}

const Popover = React.forwardRef<HTMLElement, PopoverProps>(
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
    const { extendTheme } = useMakerUI()

    // useEffect(() => {
    //   extendTheme({ colors: { crazy: 'red' } })
    // }, [extendTheme])

    // console.log(
    //   target.current ? target.current.getBoundingClientRect() : 'nope'
    // )
    return (
      show && (
        <Box role={role} ref={ref} sx={{ bg: 'crazy' }}>
          TODO
        </Box>
      )
    )
  }
)

// Need Popover, Tooltip for links, Dropdown Menu

export default Popover
