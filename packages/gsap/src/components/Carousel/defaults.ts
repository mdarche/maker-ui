import { merge } from '@maker-ui/utils'
import type { CarouselSettings, ArrowSettings, DotSettings } from './types'

/**
 * Utility that merges user carousel ettings with the default settings.
 */
export function mergeSettings(initial?: CarouselSettings) {
  return merge(
    {
      autoPlay: true,
      autoPlayLimit: 2,
      pauseOnHover: true,
      delay: 6.5,
      draggable: true,
      dragTarget: 'container' as CarouselSettings['dragTarget'],
      // hideControls: false,
      duration: 0.3,
      ease: 'power1.inOut',
      slideWidth: '100%',
      slideHeight: '100%',
      center: false,
      centerMobile: false,
    },
    initial as object
  )
}

/**
 * Utility that merges user dot settings with the default settings.
 */
export function mergeDots(initial?: DotSettings): DotSettings | false {
  if (!initial) return false
  return merge(
    {
      position: 'bottom',
      padding: 30,
      spacing: 10,
      height: 10,
      width: 10,
      borderRadius: '50%',
      colorActive: '#fff',
      colorMuted: 'rgba(0, 0, 0, 0.25)',
    },
    initial
  )
}

/**
 * Utility that merges user arrow settings with the default settings.
 */
export function mergeArrows(initial?: ArrowSettings): ArrowSettings | false {
  if (!initial) return false
  return merge(
    {
      custom: undefined,
      padding: 20,
      margin: 0,
    },
    initial
  )
}
