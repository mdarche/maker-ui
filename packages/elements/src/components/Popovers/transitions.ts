import { getSign } from '../helper'

/**
 * Configure the the transition animations
 */

function getTransform(type: string) {
  switch (type) {
    case 'fade-up':
    case 'fade-down':
      return `translate3d(0,${getSign(type)}10px,0)`
    case 'fade-left':
    case 'fade-right':
      return `translate3d(${getSign(type)}10px, 0, 0)`
    case 'fade':
    default:
      return `translate3d(0px,0px,0px)`
  }
}

export function getTransition(transition: string, height: number) {
  // No transition
  if (transition === 'none') {
    return {
      start: { visibility: 'hidden' },
      enter: { visibility: 'visible' },
      leave: { visibility: 'hidden' },
    }
  }
  // Scale transition
  if (transition === 'scale') {
    return {
      start: { height: '0px' },
      enter: { height: `${height}px` },
      leave: { height: '0px' },
    }
  }
  // Fade transition & default
  return {
    start: {
      opacity: 0,
      transform: getTransform(transition),
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0px,0px,0px)`,
    },
    leave: {
      opacity: 0,
      transform: getTransform(transition),
    },
  }
}
