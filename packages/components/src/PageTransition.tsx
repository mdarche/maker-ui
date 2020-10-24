import React from 'react'
import { Flex } from 'maker-ui'
import { animated as a, useTransition } from 'react-spring'

import { getSign } from './helper'

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

export interface PageTransitionProps {
  type: string
  distance: number
  config: any
  children: React.ReactNode
}

/**
 * The `PageTransition` component wraps your content in a transition container. See docs
 * for curretly supported transitions.
 *
 * @todo - Add types for React Spring v8+ or v9 canary
 *
 * @see https://maker-ui.com/docs/components/page-transition
 */

export const PageTransition = ({
  type = 'fade-up',
  distance = 20,
  config,
  children,
}: PageTransitionProps) => {
  const transitions = useTransition(children, {
    keys: children => children.key,
    from: {
      opacity: 0,
      transform: getTransition(type, distance),
      // position: 'static',
    },
    enter: { opacity: 1, transform: 'translate3d(0px,0px,0px)' },
    leave: { opacity: 0 },
    unique: true,
    config,
  })
  return transitions((style, item) => (
    <Flex
      id="content-wrapper"
      sx={{ flexDirection: 'column', minHeight: '80vh' }}>
      {/* @ts-ignore */}
      <a.div style={{ ...style, flex: 1 }}>{item}</a.div>
    </Flex>
  ))
}
