import React, { useEffect, useLayoutEffect, useCallback } from "react"

// import { useMeasureUpdater } from "../context/MeasureContext"
import { useOptionsUpdater } from "../context/ElementsContext"

// TODO - Add Skiplinks

const ElementsRoot = ({ options, children }) => {
  const setOptions = useOptionsUpdater()
  // const setMeasurements = useMeasureUpdater()

  // const measure = useCallback(() => {
  //   if (typeof window !== `undefined`) {
  //     setMeasurements(state => ({
  //       ...state,
  //       viewportWidth: window.innerWidth,
  //       viewportHeight: window.innerHeight,
  //     }))
  //   }
  // }, [setMeasurements])

  useEffect(() => {
    if (options !== undefined) {
      setOptions(options)
    }
  }, [setOptions, options])

  // useLayoutEffect(() => {
  //   window.addEventListener(`resize`, measure)

  //   return () => window.removeEventListener(`resize`, measure)
  // }, [measure])

  return <React.Fragment>{children}</React.Fragment>
}

export default ElementsRoot
