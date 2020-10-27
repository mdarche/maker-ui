import React, { useState, useLayoutEffect, useEffect } from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from '../Portal'
import { usePosition, getSign } from '../helper'

const AnimatedDiv = a(Div)

// Used for Tooltips, Supplemental content, and Dropdown menus

export interface Origin {
  x: 'left' | 'center' | 'right' | 'origin'
  y: 'top' | 'center' | 'bottom'
}
export interface PopoverProps extends Omit<DivProps, 'children'> {
  show: boolean
  variant?: string
  anchor?: React.MutableRefObject<any>
  anchorWidth?: boolean
  containerHeight?: number
  origin?: Origin
  role?: string
  appendTo?: string
  closeOnBlur?: boolean
  config?: object
  transition?:
    | 'fade'
    | 'fade-down'
    | 'fade-up'
    | 'fade-left'
    | 'fade-right'
    | 'scale' // Used for dropdown menu only. Requires the height prop
  children: React.ReactElement
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

/**
 * The `Popover` component lets you add supplemental views like a Tooltip or Dropdown
 * to a specified DOM node or the document body.
 *
 * Use the `Popover` to customize your own components, otherwise try out the pre-configured
 * `Tooltip` or `Dropdown` components.
 *
 * @see https://maker-ui.com/docs/components/popover
 */

export const Popover = ({
  show,
  role = 'presentation',
  anchor,
  anchorWidth,
  containerHeight,
  origin = { x: 'origin', y: 'bottom' },
  appendTo,
  transition,
  variant,
  config,
  sx,
  children,
  ...rest
}: PopoverProps) => {
  const [box] = usePosition(anchor)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  // TODO check for focusable elements and send focus to it.
  // Back to original element on !show

  useEffect(() => {
    console.log('show is', show)
  }, [show])

  useLayoutEffect(() => {
    if (!box) return
    setWidth(box.width)
  }, [box])

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
      height: transition === 'scale' ? `${containerHeight}px` : undefined,
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
    return origin.y === 'top'
      ? box.top
      : origin.y === 'bottom' || transition === 'scale'
      ? box.top + box.height
      : origin.y === 'center'
      ? box.top + box.height / 2 - height / 2
      : 0
  }

  return (
    <Portal root={appendTo}>
      {animate(
        (props, item) =>
          item && (
            <AnimatedDiv
              role={role}
              // @ts-ignore
              style={props}
              sx={{
                variant,
                position: 'absolute',
                zIndex: 100,
                left: getX(),
                top: getY(),
                width: anchorWidth && width,
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
