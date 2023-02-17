import { useRef, useEffect } from 'react'

function getScrollPosition(): number {
  const pos = document.body.getBoundingClientRect()

  return Math.abs(pos.top)
}

/**
 * A browser hook that returns the user's current and previous scroll position via callback
 *
 * @param onScroll - A callback function that shows the user's previous and current positions
 * @param wait - The timeout delay for obtaining new position values
 * @param active - A boolean that determines if the effect should be run
 *
 * Inspired by n8tb1t's https://github.com/n8tb1t/use-scroll-position
 *
 */
export function useScrollPosition(
  onScroll: (props: { prevPos: number; currPos: number }) => void,
  wait: number,
  active: boolean = true
): void {
  const position = useRef(getScrollPosition())

  useEffect(() => {
    // Exit if the effect is not active
    if (!active) return

    let throttleTimeout: any

    const callback = () => {
      const currPos = getScrollPosition()
      onScroll({ prevPos: position.current, currPos })
      position.current = currPos
      throttleTimeout = undefined
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === undefined) {
          throttleTimeout = setTimeout(callback, wait)
        }
      } else {
        callback()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [onScroll, wait, active])
}
