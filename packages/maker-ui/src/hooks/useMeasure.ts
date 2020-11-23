// Credit to drcmda's React Spring examples

import { useRef, useEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface MeasureState {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
  documentTop: number
}

/**
 * A browser hook that binds a Resize Observer to the specified React Node and returns either
 * its `contentRect` or `getClientBoundingRect()` properties.
 *
 * @param active - A boolean that determines whether the hook should connect the Resize Observer
 * @param contentRect - A boolean that returns the node's content rect if true. Otherwise it will
 * calculate getClientBoundingRect()
 *
 * @see https://maker-ui.com/docs/hooks/#useMeasure
 *
 */

export function useMeasure(
  active?: boolean,
  contentRect?: boolean
): [{ ref: React.MutableRefObject<any> }, MeasureState] {
  const ref = useRef(null)
  const [bounds, set] = useState<MeasureState>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    documentTop: 0,
  })
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) => {
        const { top, bottom, left, right, width, height } = contentRect
          ? entry.contentRect
          : entry.target.getBoundingClientRect()
        const documentTop = top + document.documentElement.scrollTop
        set({ top, bottom, left, right, width, height, documentTop })
      })
  )
  useEffect(() => {
    if (active) {
      if (ref.current) ro.observe(ref.current)
      return () => ro.disconnect()
    }
  }, [active, ro])
  return [{ ref }, bounds]
}
