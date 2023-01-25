import React, { useState, useEffect } from 'react'

/**
 * A React hook for identifying when an element is visible in the viewport
 *
 * @param {HTMLDivElement} element - A react ref
 * @param {string} rootMargin - an offset measurement value in pixels
 * @param {HTMLDivElement} root - an optional container (defaults to window)
 */
export const useIntersection = (
  ref: React.RefObject<HTMLDivElement>,
  rootMargin: string,
  root?: React.RefObject<HTMLDivElement>
) => {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setState(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(callbackFunction, {
      rootMargin,
      root: root?.current,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isVisible
}
