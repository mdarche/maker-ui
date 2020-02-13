// Full credit to n8tb1t's performant implementation https://github.com/n8tb1t/use-scroll-position

import { useRef, useLayoutEffect } from 'react'

const isBrowser = typeof window !== 'undefined'

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

// Hook

export function useScrollPosition(effect, element, useWindow, wait) {
  const position = useRef(getScrollPosition({ useWindow }))

  useLayoutEffect(() => {
    if (!isBrowser) return
    let throttleTimeout = null

    const callBack = () => {
      const currPos = getScrollPosition({ element, useWindow })
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
  }, [effect, element, useWindow, wait])
}
