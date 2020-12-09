import * as React from 'react'
import { Div } from 'maker-ui'
import { animated as a, Transition } from 'react-spring'

import { getSign } from './helper'

const AnimatedDiv = a(Div)

export interface PageTransitionProps {
  type?: string
  distance?: number
  springConfig?: any
  id?: string | number
  children: React.ReactNode
}

/**
 * The `PageTransition` component wraps your content in a transition container. See docs
 * for currently supported transitions.
 *
 * @see https://maker-ui.com/docs/components/page-transition
 */

export const PageTransition = ({
  type = 'fade-up',
  distance = 20,
  id,
  springConfig,
  ...props
}: PageTransitionProps) => {
  const items = [{ id, props }]

  return (
    <Transition
      reset
      items={items}
      keys={item => item.id}
      from={{ opacity: 0, transform: getTransition(type, distance) }}
      enter={{ opacity: 1, transform: 'translate3d(0px,0px,0px)' }}
      leave={{
        opacity: 0,
        position: 'absolute',
      }}
      config={springConfig}>
      {(styles, { props }) => (
        <AnimatedDiv
          className="page-transition"
          style={{ ...styles, width: '100%' }}>
          <div {...props} />
        </AnimatedDiv>
      )}
    </Transition>
  )
}

PageTransition.displayName = 'PageTransition'

/**
 * Utility function to calculate transform string
 */

function getTransition(type, distance) {
  switch (type) {
    case 'fade-right':
    case 'fade-left':
      return `translate3d(${getSign(type)}${distance}px,0px,0px)`
    case 'fade-down':
    case 'fade-up':
      return `translate3d(0px,${getSign(type)}${distance}px,0px)`
    default:
      return undefined
  }
}
