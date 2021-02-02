import * as React from 'react'
import { Div, DivProps, useScrollPosition } from 'maker-ui'
import { animated, useSpring, SpringConfig } from 'react-spring'

import { format, getSign } from './helper'

const AnimatedDiv = animated(Div)

interface TransitionProps {
  transition?: 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right'
  distance?: number
}

export interface FadeBoxProps extends DivProps {
  offset?: number
  springConfig?: SpringConfig
  transition?: TransitionProps['transition']
  distance?: TransitionProps['distance']
  fade?: boolean
  settings?: TransitionProps
}

/**
 * The `FadeBox` component lets you reveal components on scroll.
 *
 * @see https://maker-ui.com/docs/components/fade-box
 */

export const FadeBox = ({
  offset = 300,
  transition,
  distance = 20,
  fade = false,
  settings = { transition: 'fade-up', distance: 20 },
  springConfig,
  css,
  ...props
}: FadeBoxProps) => {
  const ref = React.useRef<any>(null)
  const [show, set] = React.useState(false)
  const fadeProps = transition ? { transition, distance } : settings

  const spring = useSpring({
    transform: fade ? undefined : getTransform(fadeProps, show),
    opacity: show ? 1 : 0,
    config: springConfig,
  })

  useScrollPosition(
    ({ currPos }) => {
      if (ref.current && !show && currPos > ref.current.offsetTop - offset) {
        set(true)
      }
    },
    100,
    true
  )
  return (
    <AnimatedDiv
      ref={ref}
      style={spring as any}
      css={{ ...(css as object) }}
      {...props}
    />
  )
}

FadeBox.displayName = 'FadeBox'

/**
 * Utility function to calculate transform string
 * @param {TransitionProps} transitionObject - The transition and distance values
 * @param {boolean} show - The current state of the transition
 */
const getTransform = (
  { transition, distance }: TransitionProps,
  show: boolean
) => {
  switch (transition) {
    case 'fade-up':
    case 'fade-down':
      return show
        ? `translate3d(0,0,0)`
        : `translate3d(0,${getSign(transition)}${format(distance)},0)`
    case 'fade-left':
    case 'fade-right':
      return show
        ? `translate3d(0,0,0)`
        : `translate3d(${getSign(transition)}${format(distance)},0,0)`
    case 'fade':
    default:
      return undefined
  }
}
