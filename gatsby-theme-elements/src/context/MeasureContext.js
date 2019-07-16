import React, { useState, useContext } from "react"

const MeasureContext = React.createContext()

// TODO - get measurements of full header and viewport width on resize

const MeasureContextProvider = ({ children }) => {
  const [metrics, measure] = useState({
    topbarHeight: 0,
    viewportX: 0,
    viewportY: 0,
  })
  const value = React.useMemo(() => {
    return { metrics, measure }
  }, [metrics])

  return (
    <MeasureContext.Provider value={value}>{children}</MeasureContext.Provider>
  )
}

// Usage Hooks

function useMeasurements() {
  const { metrics } = useContext(MeasureContext)
  if (metrics === undefined) {
    throw new Error(
      "useMeasurements must be used within a MeasureContextProvider"
    )
  }
  return metrics
}

function measure() {
  const { measure } = useContext(MeasureContext)

  function setTopbarHeight(height) {
    measure(metrics => ({
      ...metrics,
      topbarHeight: height,
    }))
  }

  function setViewportXY([x, y]) {
    measure(metrics => ({
      ...metrics,
      viewportX: x,
      viewportY: y,
    }))
  }

  return { setTopbarHeight, setViewportXY }
}

export { MeasureContextProvider, useMeasurements, measure }
