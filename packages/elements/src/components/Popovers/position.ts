import { ResponsiveScale } from 'maker-ui'
import { getSign } from '../helper'

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
  | 'scale'
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

/**
 * Format the simpler Tooltip API to work with the `Popover` parent.
 */

export function convertPosition(
  pos: string,
  bg: ResponsiveScale,
  gap: number
): { position: Position; styles: object; gap: { x: number; y: number } } {
  const vertical = { left: '50%', marginLeft: '-5px' }
  const horizontal = { top: '50%', marginTop: '-5px' }

  switch (pos) {
    case 'top':
      return {
        position: { x: 'center', y: 'top' },
        gap: { x: 0, y: gap },
        styles: {
          top: '100%',
          ...vertical,
          borderColor: `${bg} transparent transparent transparent`,
        },
      }
    case 'bottom':
      return {
        position: { x: 'center', y: 'bottom' },
        gap: { x: 0, y: gap },
        styles: {
          bottom: '100%',
          ...vertical,
          borderColor: `transparent transparent ${bg} transparent`,
        },
      }
    case 'left':
      return {
        position: { x: 'left', y: 'center' },
        gap: { x: gap, y: 0 },
        styles: {
          left: '100%',
          ...horizontal,
          borderColor: `transparent transparent transparent ${bg}`,
        },
      }
    case 'right':
    default:
      return {
        position: { x: 'right', y: 'center' },
        gap: { x: gap, y: 0 },
        styles: {
          right: '100%',
          ...horizontal,
          borderColor: `transparent ${bg} transparent transparent`,
        },
      }
  }
}
