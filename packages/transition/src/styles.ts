import { TransitionType } from './CSSTransition'

const getSign = (type: string): string =>
  type.includes('right') || type.includes('down') ? '-' : ''

/**
 * Configure the the transition animations
 */
function getTransform(type: string, distance: string) {
  switch (type) {
    case 'fade-up':
    case 'fade-down':
      return `translate3d(0,${getSign(type)}${distance},0)`
    case 'fade-left':
    case 'fade-right':
      return `translate3d(${getSign(type)}${distance}, 0, 0)`
    case 'fade':
    default:
      return `translate3d(0px,0px,0px)`
  }
}

export function getStyles(
  type: TransitionType,
  distance: number | string,
  duration: number,
  easing: string,
  prefix?: string
) {
  const name = prefix ? `${prefix}-fade` : 'fade'
  const dist = typeof distance === 'number' ? `${distance}px` : distance
  const format = dist.endsWith('%') ? '%' : ''
  return {
    [name + '-enter']: {
      opacity: 0,
      transform: getTransform(type, dist),
    },
    [name + '-exit']: {
      opacity: 1,
      transform: `translate3d(0${format},0${format},0)`,
    },
    [name + '-enter-active']: {
      opacity: 1,
      transform: `translate3d(0${format},0${format},0)`,
      transition: `all ${easing} ${duration}ms`,
    },
    [name + '-exit-active']: {
      opacity: 0,
      transform: getTransform(type, dist),
      transition: `all ${easing} ${duration}ms`,
    },
  }
}
