import { useState, useEffect, useCallback, MutableRefObject } from 'react'

export const usePosition = (ref: MutableRefObject<any>) => {
  const [box, setBox] = useState<any>({})

  const set = useCallback(() => {
    const {
      left,
      width,
      right,
      height,
      top,
    } = ref.current.getBoundingClientRect()
    setBox(
      ref && ref.current
        ? {
            left,
            width,
            right,
            height,
            // Add these two values together to get the correct top value
            top: top + document.documentElement.scrollTop,
          }
        : {}
    )
  }, [ref])

  useEffect(() => {
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [set])

  return [box, ref]
}
