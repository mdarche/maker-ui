import React, { useRef, useState, useEffect } from 'react'
import { Box, BasicBoxProps } from 'maker-ui'
import { animated as a, useSpring } from 'react-spring'

import { format, getSign } from './helper'

const AnimatedBox = a(Box)

const getTransform = ({ direction, distance }, show) => {
  switch (direction) {
    case 'up':
    case 'down':
      return show
        ? `translate3d(0,0,0)`
        : `translate3d(0,${getSign(direction)}${format(distance)},0)`
    case 'left':
    case 'right':
      return show
        ? `translate3d(0,0,0)`
        : `translate3d(${getSign(direction)}${format(distance)})`
    default:
      return undefined
  }
}

export interface FadeBoxProps extends BasicBoxProps {
  offset: number
  springConfig: any
  direction?: string
  distance: number
  fade?: boolean
  settings?: {
    direction: string
    distance: number
  }
}

/**
 * The `FadeBox` component renders a react component based on the user's scroll and its position
 * in the browser viewport. This lets you reveal components on scroll.
 *
 * @see https://maker-ui.com/docs/components/fade-box
 */

export const FadeBox = ({
  offset = 300,
  springConfig,
  direction,
  distance = 20,
  fade = false,
  settings = { direction: 'up', distance: 20 },
  ...props
}: FadeBoxProps) => {
  const ref = useRef(null)
  const [show, set] = useState(false)
  const fadeProps = direction ? { direction, distance } : settings

  const reveal = useSpring({
    opacity: show ? 1 : 0,
    transform: fade ? undefined : getTransform(fadeProps, show),
    config: springConfig,
  })

  useEffect(() => {
    const handleScroll = e =>
      !show && window.pageYOffset > ref.current.offsetTop - offset
        ? set(true)
        : null

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [show, offset])

  return <AnimatedBox style={reveal} ref={ref} {...props} />
}
