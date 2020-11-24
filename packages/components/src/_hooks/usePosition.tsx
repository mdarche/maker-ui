import * as React from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface PositionState {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
  documentTop: number
}

export const usePosition = (
  ref: React.MutableRefObject<any>,
  contentRect?: boolean
) => {
  const localRef = React.useRef(null)
  const positionRef = ref || localRef

  const [bounds, set] = React.useState<PositionState>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    documentTop: 0,
  })

  const [ro] = React.useState(
    () =>
      new ResizeObserver(([entry]) => {
        const { top, bottom, left, right, width, height } = contentRect
          ? entry.contentRect
          : entry.target.getBoundingClientRect()
        const documentTop = top + document.documentElement.scrollTop
        set({ top, bottom, left, right, width, height, documentTop })
      })
  )

  React.useEffect(() => {
    if (positionRef.current) ro.observe(positionRef.current)
    return () => ro.disconnect()
  }, [positionRef, ro])

  return [bounds]
}
