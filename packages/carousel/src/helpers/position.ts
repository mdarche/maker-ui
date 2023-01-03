import type { Position } from '@/types'

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
