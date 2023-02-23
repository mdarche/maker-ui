import React, { useState, useEffect } from 'react'

interface IntersectionSettings {
  threshold?: number
  ref: React.RefObject<HTMLElement>
  offset?: string | number
  root?: React.RefObject<HTMLDivElement>
  onIntersect?: (isVisible: boolean) => void
}

/**
 * A React hook for identifying when an element is visible in the viewport
 *
 * @param {number} threshold - a number between 0 and 1 that indicates the intersection ratio.
 * 0 means the element enters the bottom of the viewport and 1 means the whole element
 * must be visible.
 * @param {HTMLDivElement} ref - The target react ref
 * @param {string | number} offset - an offset measurement value that is used as the
 * IntersectionObserver's `rootMargin`
 * @param {HTMLDivElement} root - an optional container (defaults to window)
 * @param {function} onIntersect - a callback function that is invoked any time
 * the intersection fires
 *
 * @returns A boolean that indicates if the element is visible
 *
 */
export const useIntersection = ({
  threshold = 0,
  ref = { current: null },
  offset = '0px 0px 0px 0px', // Bottom of the viewport
  root,
  onIntersect,
}: IntersectionSettings) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const refCurrent = ref?.current
    if (!refCurrent) return

    const callback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setVisible(entry.isIntersecting)
      if (onIntersect) {
        onIntersect(entry.isIntersecting)
      }
    }

    const rootMargin = typeof offset === 'number' ? `${offset}px` : offset
    const observer = new IntersectionObserver(callback, {
      rootMargin,
      root: root?.current,
      threshold,
    })

    observer.observe(refCurrent)

    return () => observer.disconnect()
  }, [ref, offset, root, onIntersect, threshold])

  return visible
}
