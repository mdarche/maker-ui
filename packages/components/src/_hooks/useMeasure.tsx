import { useRef, useEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

// TODO rebuild this to work like usePosition
export function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState<any>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    documentTop: 0,
  })
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) => {
        const { top, bottom, width, height } = entry.contentRect
        const documentTop = top + document.documentElement.scrollTop
        // console.log('boundingRect =', ref.current.getBoundingClientRect().top)
        // console.log('top is', top)
        // console.log('scrollTop =', document.documentElement.scrollTop)
        // console.log('documenTop =', documentTop)
        // Add these two values together to get the correct top value
        set({ top, bottom, width, height, documentTop })
      })
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ro])
  return [{ ref }, bounds]
}
