import React, { useState, useEffect, useRef } from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'
import { usePosition, getSign } from './helper'

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
  origin,
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
  const ref = useRef(null)

  useEffect(() => {
    console.log('ref is', ref.current)
  }, [ref])

  const animate = useTransition(show ? [1] : [], {
    from: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition, 'start'),
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0px,0px,0px)`,
      height: '200px',
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
      : box.right
  }

  const getY = () => {
    if (!box) return
    console.log(current.offsetTop)
    return origin.y === 'top'
      ? current.offsetTop
      : origin.y === 'bottom'
      ? current.offsetTop + box.height
      : current.offsetTop + box.height / 2
  }

  return (
    <Portal root={appendTo}>
      {animate(
        (props, item) =>
          item && (
            <AnimatedDiv
              ref={ref}
              // ref={el => {
              //   if (el) setWidth(el.clientWidth) // FIX THIS
              //   if (el) setHeight(el.clientHeight) // FIX THIS
              // }}
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
              {...rest}>
              {children}
            </AnimatedDiv>
          )
      )}
    </Portal>
  )
}
