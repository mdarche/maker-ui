import type { ArrowSettings, Position } from '@/types'

/**
 * Returns a ResponsiveCSS object that contains style rules for the navigation dots
 */
export function getDotPosition(
  pos: Position,
  gap: string | number | (string | number)[]
): object {
  if (pos === 'left' || pos === 'right') {
    return {
      top: '50%',
      transform: `translate3d(0,-50%,0)`,
      left: pos === 'left' ? gap : undefined,
      right: pos === 'right' ? gap : undefined,
    }
  }

  return {
    left: '50%',
    transform: `translate3d(-50%,0,0)`,
    top: pos === 'top' ? gap : undefined,
    bottom: pos === 'bottom' ? gap : undefined,
  }
}

/**
 * Returns a left or right position style rule
 */
export const getArrowPosition = (isNext: boolean) =>
  isNext ? { right: 0 } : { left: 0 }

/**
 * Returns a center transform and reflected arrow for the left previous button.
 */
export const getArrowTransform = (
  isNext: boolean,
  custom: ArrowSettings['custom']
) => {
  return typeof custom === 'object' && custom.hasOwnProperty('prev')
    ? undefined
    : isNext
    ? { transform: 'translateY(-50%)' }
    : { transform: 'translateY(-50%) scaleX(-1)' }
}
