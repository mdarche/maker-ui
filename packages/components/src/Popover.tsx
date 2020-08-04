import React, { useEffect } from 'react'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'
import { usePosition } from './helper'

// import { useTransition, animated as a } from 'react-spring'

// use for Tooltips, Supplemental content, and Dropdown menus
interface Origin {
  x: 'left' | 'center' | 'right'
  y: 'top' | 'center' | 'bottom'
}
export interface PopoverProps extends DivProps {
  show: boolean
  set: Function // required for onHover
  variant?: string
  onHover?: boolean
  anchor?: React.MutableRefObject<any>
  origin?: Origin
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
      set,
      role = 'presentation',
      anchor,
      origin,
      appendTo,
      transition,
      variant,
      sx,
      children,
      ...props
    },
    ref
  ) => {
    const [box, { current }] = usePosition(anchor)

    const getX = () => {
      if (!box) return
      switch (origin.x) {
        case 'center':
          return box.right
        case 'left':
          return box.right
        case 'right':
        default:
          return box.right
      }
    }

    const getY = () => {
      if (!box) return
      switch (origin.y) {
        case 'top':
          return current.offsetTop
        case 'bottom':
          return current.offsetTop + box.height
        case 'center':
        default:
          return current.offsetTop + box.height / 2
      }
    }

    console.log('box is', current)
    return (
      show && (
        <Portal root={appendTo}>
          <Div
            ref={ref}
            role={role}
            sx={{
              variant,
              position: 'absolute',
              zIndex: 100,
              left: getX(),
              top: getY(),
              ...sx,
            }}
            {...props}>
            {children}
          </Div>
        </Portal>
      )
    )
  }
)
