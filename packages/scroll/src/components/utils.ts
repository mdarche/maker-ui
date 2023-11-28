import { CSSProperties } from 'react'
import { formatNumber } from '@maker-ui/utils'
import { AnimateProps } from './Animate'

export const getStyles = ({
  duration,
  distance,
  scale,
  easing,
  transformOrigin,
}: Partial<AnimateProps>) =>
  ({
    '--duration': formatNumber(duration, '%s'),
    '--easing': easing,
    '--x-distance': formatNumber(distance),
    '--y-distance': formatNumber(distance),
    '--scale-amount': scale || '1',
    '--transform-origin': transformOrigin || 'center',
  } as CSSProperties)

export function createMarkers(
  container: HTMLDivElement,
  bottom: number,
  isEnabled: boolean
) {
  if (!isEnabled) {
    return { containerLine: undefined, intersectionLine: undefined }
  }

  const lineHeight = 1

  // Red
  const intersectionLine = document.createElement('div')
  Object.assign(intersectionLine.style, {
    position: 'fixed',
    bottom: Math.abs(bottom) - lineHeight + 'px',
    left: '0px',
    width: '100%',
    height: lineHeight + 'px',
    backgroundColor: 'red',
    zIndex: '10000',
  })
  document.body.appendChild(intersectionLine)

  // Green
  const containerLine = document.createElement('div')
  const containerRect = container.getBoundingClientRect()
  Object.assign(containerLine.style, {
    position: 'absolute',
    top: containerRect.top + 'px',
    left: '0px',
    width: '100%',
    height: lineHeight + 'px',
    backgroundColor: 'green',
    zIndex: '10000',
  })
  document.body.appendChild(containerLine)

  return { containerLine, intersectionLine }
}
