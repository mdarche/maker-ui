import { Offset } from './Popover'

export interface Position {
  x: 'left' | 'center' | 'right' | 'origin'
  y: 'top' | 'center' | 'bottom'
}

export type TransitionType =
  | 'fade'
  | 'fade-down'
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'none'

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

export function getTransition(transition: string) {
  // No transition
  if (transition === 'none') {
    return {
      start: { visibility: 'hidden' },
      enter: { visibility: 'visible' },
      leave: { visibility: 'hidden' },
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

/**
 * Format the simpler Tooltip API to work with the `Popover` parent.
 */

export function getPosition(
  pos: string,
  offset: number
): { position: Position; offset: Offset } {
  switch (pos) {
    case 'top':
      return {
        position: { x: 'center', y: 'top' },
        offset: { x: 0, y: offset },
      }
    case 'bottom':
      return {
        position: { x: 'center', y: 'bottom' },
        offset: { x: 0, y: offset },
      }
    case 'left':
      return {
        position: { x: 'left', y: 'center' },
        offset: { x: offset, y: 0 },
      }
    case 'right':
    default:
      return {
        position: { x: 'right', y: 'center' },
        offset: { x: offset, y: 0 },
      }
  }
}

/**
 * Utility for parsing transition strings and setting positive or negative value
 *
 * @param {string} type - A transition string ('fade-up', 'slide-right', etc.)
 *
 */
export const getSign = (type: string): string =>
  type.includes('right') || type.includes('down') ? '-' : ''
