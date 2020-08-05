import React, { useState } from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'
import { usePosition } from './helper'

const AnimatedDiv = a(Div)

// Used for Tooltips, Supplemental content, and Dropdown menus

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

export const Popover = ({
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
}: PopoverProps) => {
  const [box, { current }] = usePosition(anchor)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const animate = useTransition(show ? [1] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const getX = () => {
    if (!box) return
    return origin.x === 'center'
      ? box.left + box.width / 2 - width / 2
      : origin.x === 'left'
      ? box.left
      : box.right
  }

  const getY = () => {
    if (!box) return
    return origin.y === 'top'
      ? current.offsetTop
      : origin.y === 'bottom'
      ? current.offsetTop + box.height
      : current.offsetTop + box.height / 2 - height / 2
  }

  return (
    <Portal root={appendTo}>
      {animate(
        (props, item) =>
          item && (
            <AnimatedDiv
              ref={el => {
                if (el) setWidth(el.clientWidth)
                if (el) setHeight(el.clientHeight)
              }}
              role={role}
              style={props}
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
            </AnimatedDiv>
          )
      )}
    </Portal>
  )
}
