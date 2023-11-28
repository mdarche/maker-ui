import { useRef, useEffect } from 'react'

function getScrollPosition(): number {
  if (typeof window === 'undefined') return 0
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
 */
export function useScrollPosition(
  onScroll: (props: { prevPos: number; currPos: number }) => void,
  wait = 0,
  active = true
) {
  const position = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    // Exit if the effect is not active
    if (!active) return

    let throttleTimeout: NodeJS.Timeout | undefined

    const callback = () => {
      const currPos = getScrollPosition()
      onScroll({ prevPos: position?.current || 0, currPos })
      position.current = currPos || 0
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
