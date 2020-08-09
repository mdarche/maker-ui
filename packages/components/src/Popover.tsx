import React, { useState, useCallback } from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'
import { usePosition, getSign } from './helper'

const AnimatedDiv = a(Div)

// Used for Tooltips, Supplemental content, and Dropdown menus

interface Origin {
  x: 'left' | 'center' | 'right' | 'origin'
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
  config: object
  transition?:
    | 'fade'
    | 'fade-down'
    | 'fade-up'
    | 'fade-left'
    | 'fade-right'
    | 'scale'
}

const getTransform = (type: string, stage: string) => {
  switch (type) {
    case 'fade-up':
    case 'fade-down':
      return `translate3d(0,${getSign(type)}10px,0)`
    case 'fade-left':
    case 'fade-right':
      return `translate3d(${getSign(type)}10px, 0, 0)`
    case 'scale':
    case 'fade':
    default:
      return `translate3d(0px,0px,0px)`
  }
}

export const Popover = ({
  show,
  set,
  role = 'presentation',
  anchor,
  origin = { x: 'origin', y: 'bottom' },
  appendTo,
  transition,
  variant,
  config,
  sx,
  children,
  ...rest
}: PopoverProps) => {
  const [box, { current }] = usePosition(anchor)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  // TODO check for focusable elements and send focus to it.
  // Back to original element on !show

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight)
      setWidth(node.offsetWidth)
    }
  }, [])

  // TODO refactor this into one ...getTransitions function
  const animate = useTransition(show ? [1] : [], {
    from: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition, 'start'),
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0px,0px,0px)`,
      height: transition === 'scale' ? `100px` : undefined,
    },
    leave: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition, 'end'),
    },
    config,
  })

  const getX = () => {
    if (!box) return
    return origin.x === 'center'
      ? box.left + box.width / 2 - width / 2
      : origin.x === 'left'
      ? box.left - width
      : origin.x === 'right'
      ? box.right
      : box.left
  }

  const getY = () => {
    if (!box) return
    console.log('current top is', current.offsetTop)
    console.log('box top is', box.top)
    return origin.y === 'top'
      ? box.top
      : origin.y === 'bottom' || transition === 'scale'
      ? box.top + box.height
      : origin.y === 'center'
      ? box.top + box.height / 2 - height / 2
      : 0
  }

  // const getY = () => {
  //   if (!box) return
  //   console.log('box top is', box.top)
  //   return origin.y === 'top'
  //     ? current.offsetTop
  //     : origin.y === 'bottom' || transition === 'scale'
  //     ? current.offsetTop + box.height
  //     : origin.y === 'center'
  //     ? current.offsetTop + box.height / 2 - height / 2
  //     : 0
  // }

  return (
    <Portal root={appendTo}>
      {animate(
        (props, item) =>
          item && (
            <AnimatedDiv
              ref={measuredRef}
              role={role}
              style={props}
              sx={{
                variant,
                position: 'absolute',
                zIndex: 100,
                left: getX(),
                top: getY(),
                overflow: transition.includes('scale') && 'hidden',
                ...sx,
              }}
              {...rest}>
              {children}
            </AnimatedDiv>
          )
      )}
    </Portal>
  )
}
