import React from 'react'
import { Flex } from 'maker-ui'
import { animated as a, useTransition } from 'react-spring'

import { format, getSign } from './helper'

function getTransition(type, distance) {
  switch (type) {
    case 'fade-right':
    case 'fade-left':
      return `translate3d(${getSign(type)}${format(distance)},0,0)`
    case 'fade-down':
    case 'fade-up':
      return `translate3d(0,${getSign(type)}${format(distance)},0)`
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
  const transitions: any[] = useTransition(children, children => children.key, {
    // @ts-ignore
    from: {
      opacity: 0,
      transform: getTransition(type, distance),
      position: 'static',
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0 },
    config,
  })
  return transitions.map(({ item, key, props }: any) => (
    <Flex
      key={key}
      id="content-wrapper"
      sx={{ flexDirection: 'column', minHeight: '80vh' }}>
      <a.div style={{ ...props, flex: 1 }}>{item}</a.div>
    </Flex>
  ))
}
