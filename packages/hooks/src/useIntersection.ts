import React, { useState, useEffect } from 'react'

interface IntersectionSettings {
  ref: React.RefObject<HTMLDivElement>
  offset?: string | number
  root?: React.RefObject<HTMLDivElement>
  onIntersect?: (isVisible: boolean) => void
}

/**
 * A React hook for identifying when an element is visible in the viewport
 *
 * @param {HTMLDivElement} ref - A react ref
 * @param {string} offset - an offset measurement value in pixels
 * @param {HTMLDivElement} root - an optional container (defaults to window)
 * @param {function} onIntersect - a callback function that is invoked any time
 * the intersection fires
 *
 */
export const useIntersection = ({
  ref,
  offset = 0,
  root,
  onIntersect,
}: IntersectionSettings) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const callback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setVisible(entry.isIntersecting)

      if (onIntersect) {
        onIntersect(entry.isIntersecting)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: typeof offset === 'number' ? `${offset}px` : offset,
      root: root?.current,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return visible
}
