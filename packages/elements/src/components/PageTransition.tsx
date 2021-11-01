import * as React from 'react'
import { Div, mergeSelectors } from 'maker-ui'
import { animated, Transition } from '@react-spring/web'

import { getSign } from './helper'

const AnimatedDiv = animated(Div)

export interface PageTransitionProps {
  type?: 'fade-up' | 'fade-right' | 'fade-left' | 'fade-down'
  distance?: number
  springConfig?: any
  id?: string | number
  className?: string
  children: React.ReactNode
}

/**
 * The `PageTransition` component wraps your content in a transition container. See docs
 * for currently supported transitions.
 *
 * @link https://maker-ui.com/docs/elements/page-transition
 */

export const PageTransition = ({
  type = 'fade-up',
  distance = 20,
  id,
  className,
  springConfig,
  ...props
}: PageTransitionProps) => {
  const items = [{ id, props }]

  return (
    <Transition
      reset
      items={items}
      keys={(item: any) => item.id}
      from={{ opacity: 0, transform: getTransition(type, distance) }}
      enter={{ opacity: 1, transform: 'translate3d(0px,0px,0px)' }}
      leave={{
        opacity: 0,
        position: 'absolute',
      }}
      config={springConfig}>
      {(styles, { props }) => (
        <AnimatedDiv
          className={mergeSelectors(['page-transition', className])}
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

function getTransition(type: string, distance: number) {
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
