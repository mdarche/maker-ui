// Credit to n8tb1t's performant hooks implementation https://github.com/n8tb1t/use-scroll-position

import { useRef, useLayoutEffect } from 'react'

const isBrowser = typeof window !== 'undefined'

function getScrollPosition() {
  if (!isBrowser) return { x: 0, y: 0 }
  const position = document.body.getBoundingClientRect()

  return { x: position.left, y: position.top }
}

export function useScrollPosition(effect, wait) {
  const position = useRef(getScrollPosition())

  useLayoutEffect(() => {
    if (!isBrowser) return
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
  }, [effect, wait])
}
