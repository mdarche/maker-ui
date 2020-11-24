// Credit to drcmda's React Spring examples

import { useRef, useEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface MeasureProps {
  observe?: boolean
  contentRect?: boolean
  externalRef?: React.MutableRefObject<any>
}

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
 * @param active - Boolean that determines whether the hook should connect the Resize Observer
 * @param contentRect - Boolean that returns the node's content rect if true. Otherwise it will
 * calculate getClientBoundingRect()
 * @param externalRef - If you can't bind the output ref to your component, you can also supply
 * another React ref object to make the size calculations.
 *
 * @see https://maker-ui.com/docs/hooks/#useMeasure
 *
 */

export function useMeasure(
  props?: MeasureProps
): [{ ref: React.MutableRefObject<any> }, MeasureState] {
  // TODO - revisit TS issues with props destructuring
  const observe = props && props.observe ? props.observe : true
  const contentRect = props && props.contentRect ? props.contentRect : false
  const externalRef = props && props.externalRef ? props.externalRef : undefined

  const localRef = useRef(null)
  const ref = externalRef || localRef

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
    if (observe) {
      if (ref.current) ro.observe(ref.current)
      return () => ro.disconnect()
    }
  }, [observe, ref, ro])
  return [{ ref }, bounds]
}
