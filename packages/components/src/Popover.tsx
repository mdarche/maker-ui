import React from 'react'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'

// import { useTransition, animated as a } from 'react-spring'

// use for Tooltips, Supplemental content, and Dropdown menus

export interface PopoverProps extends DivProps {
  show: boolean
  set: Function // required for onHover
  variant?: string
  onHover?: boolean
  anchorElement?: HTMLElement
  anchorOrigin?: {
    x: 'left' | 'center' | 'right'
    y: 'top' | 'center' | 'bottom'
  }
  appendTo?: string
  closeOnBlur?: boolean
  transition?:
    | 'fade'
    | 'fade-down'
    | 'fade-up'
    | 'fade-left'
    | 'fade-right'
    | 'scale'
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      show,
      role = 'presentation',
      appendTo,
      transition,
      variant,
      sx,
      children,
      ...props
    },
    ref
  ) => {
    return (
      show && (
        <Portal root={appendTo}>
          <Div ref={ref} role={role} sx={{ variant, ...sx }} {...props}>
            {children}
          </Div>
        </Portal>
      )
    )
  }
)
