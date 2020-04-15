import React from 'react'
import { Flex } from 'theme-ui'
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

const PageTransition = ({
  type = 'fade-up',
  distance = 20,
  config,
  children,
}) => {
  const transitions = useTransition(children, children => children.key, {
    from: {
      opacity: 0,
      transform: getTransition(type, distance),
      position: 'static',
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0 },
    config,
  })
  return transitions.map(({ item, key, props }) => (
    <Flex
      key={key}
      id="content-wrapper"
      sx={{ flexDirection: 'column', minHeight: '80vh' }}>
      <a.div style={{ ...props, flex: 1 }}>{item}</a.div>
    </Flex>
  ))
}

export default PageTransition
