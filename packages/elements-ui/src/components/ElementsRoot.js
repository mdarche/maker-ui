import React, { useEffect, useLayoutEffect, useCallback } from "react"

import { useMeasureUpdater } from "../context/MeasureContext"
import { useOptions } from "../context/ElementsContext"
import defaults from "../utils/default-options"

// TODO - Add Skiplinks

const ElementsRoot = ({ options = defaults, children }) => {
  const [setOptions] = useOptions()
  const setMeasurements = useMeasureUpdater()

  useEffect(() => {
    setOptions(options)
  }, [options])

  useLayoutEffect(() => {
    window.addEventListener(`resize`, measure)

    const measure = useCallback(() => {
      if (typeof window !== `undefined`) {
        setMeasurements(state => ({
          ...state,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
        }))
      }
    }, [setMeasurements])

    return () => window.removeEventListener(`resize`, measure)
  }, [])

  return <React.Fragment>{children}</React.Fragment>
}

export default ElementsRoot
