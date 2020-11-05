import React, { useState, useLayoutEffect, useCallback, useRef } from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from '../Portal'
import { usePosition, getSign } from '../helper'
import { useFocus, useMeasure } from '../_hooks'

const AnimatedDiv = a(Div)

export interface Origin {
  x: 'left' | 'center' | 'right' | 'origin'
  y: 'top' | 'center' | 'bottom'
}
export interface PopoverProps extends Omit<DivProps, 'children'> {
  show: boolean
  toggle?: Function
  anchorRef?: React.MutableRefObject<any>
  anchorWidth?: boolean
  origin?: Origin
  role?: string
  appendTo?: string | Element
  trapFocus?: boolean
  closeOnBlur?: boolean
  config?: object
  transition?:
    | 'fade'
    | 'fade-down'
    | 'fade-up'
    | 'fade-left'
    | 'fade-right'
    | 'scale' // Used for dropdown menu only. Requires the set prop
  children: React.ReactElement | React.ReactElement[]
}

const getTransform = (type: string) => {
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
  toggle,
  role = 'presentation',
  anchorRef,
  anchorWidth,
  origin = { x: 'origin', y: 'bottom' },
  appendTo,
  trapFocus,
  closeOnBlur,
  transition,
  variant,
  config,
  sx,
  children,
  ...rest
}: PopoverProps) => {
  const popoverRef = useRef(null)
  const [box] = usePosition(anchorRef)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [initialRender, setInitialRender] = useState(true)
  // const [bind, { height:, top, documentTop }] = useMeasure()

  const measuredRef = useCallback(
    node => {
      if (node !== null && height === 0) {
        setHeight(node.offsetHeight)
      }
    },
    [height]
  )

  // useFocus({
  //   containerRef: popoverRef,
  //   focusRef: anchorRef,
  //   show,
  //   toggle,
  //   closeOnBlur,
  //   trapFocus,
  // })

  // TODO check for focusable elements and send focus to it.
  // Back to original element on !show

  useLayoutEffect(() => {
    if (transition === 'scale') {
      setInitialRender(false)
      toggle(false)
    }
  }, [transition, toggle])

  useLayoutEffect(() => {
    if (!box) return
    setWidth(box.width)
  }, [box])

  // TODO refactor this into one ...getTransitions function
  const animate = useTransition(show ? [1] : [], {
    from: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition),
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0px,0px,0px)`,
      height: transition === 'scale' ? `${height}px` : undefined,
    },
    leave: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition),
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
              ref={popoverRef}
              // @ts-ignore
              style={props}
              sx={{
                variant,
                position: 'absolute',
                display: 'block',
                zIndex: 100,
                left: getX(),
                top: getY(),
                width: anchorWidth && width,
                overflow: transition.includes('scale') && 'hidden',
                ...sx,
              }}
              {...rest}>
              <Div
                // {...bind}
                ref={measuredRef}
                // BIND
                sx={{
                  opacity: transition === 'scale' && initialRender && [0],
                  visibility: transition === 'scale' &&
                    initialRender && ['hidden'],
                }}>
                {children}
              </Div>
            </AnimatedDiv>
          )
      )}
    </Portal>
  )
}
