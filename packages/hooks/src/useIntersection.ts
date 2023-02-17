import React, { useState, useEffect } from 'react'

interface IntersectionSettings {
  threshold?: number
  ref: React.RefObject<HTMLDivElement>
  offset?: string | number
  root?: React.RefObject<HTMLDivElement>
  onIntersect?: (isVisible: boolean) => void
}

/**
 * A React hook for identifying when an element is visible in the viewport
 *
 * @param {number} threshold - a number between 0 and 1 that indicates the intersection ratio
 * @param {HTMLDivElement} ref - A react ref
 * @param {string} offset - an offset measurement value in pixels
 * @param {HTMLDivElement} root - an optional container (defaults to window)
 * @param {function} onIntersect - a callback function that is invoked any time
 * the intersection fires
 *
 * @returns A boolean that indicates if the element is visible
 *
 */
export const useIntersection = ({
  threshold = 1,
  ref = { current: null },
  offset = 0,
  root,
  onIntersect,
}: IntersectionSettings) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const refCurrent = ref.current
    if (!refCurrent) return

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
      threshold,
    })

    observer.observe(refCurrent)

    return () => observer.disconnect()
  }, [ref, offset, root, onIntersect, threshold])

  return visible
}
