// Credit to n8tb1t's https://github.com/n8tb1t/use-scroll-position

import { useRef, useLayoutEffect } from 'react'

const isBrowser = typeof window !== 'undefined'

function getScrollPosition(): number | { x: number; y: number } {
  if (!isBrowser) return { x: 0, y: 0 }
  const position = document.body.getBoundingClientRect()

  return Math.abs(position.top)
}

/**
 * A browser hook that returns the user's current scroll position via callback
 *
 * @param effect - A callback function that shows the user's previous and current positions
 * @param wait - The timeout delay for obtaining new position values
 * @param active - A boolean that determines if the effect should be run
 *
 */

export function useScrollPosition(
  effect: any,
  wait: number,
  active: boolean
): void {
  const position = useRef(getScrollPosition())

  useLayoutEffect(() => {
    // Exit if run on server or if the effect is not active
    if (!active || !isBrowser) return

    let throttleTimeout = null

    const callBack = () => {
      const currPos = getScrollPosition()
      effect({ prevPos: position.current, currPos })
      position.current = currPos
      throttleTimeout = null
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [effect, wait, active])
}
