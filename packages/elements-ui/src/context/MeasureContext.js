import React, { useState, useContext } from "react"

const MeasureStateContext = React.createContext()
const MeasureUpdateContext = React.createContext()

const MeasureProvider = ({ children }) => {
  const [measurements, setMeasurements] = useState({
    topbarHeight: 0,
    headerHeight: 0,
    viewportWidth: 0,
    viewportHeight: 0,
  })

  return (
    <MeasureStateContext.Provider value={measurements}>
      <MeasureUpdateContext.Provider value={setMeasurements}>
        {children}
      </MeasureUpdateContext.Provider>
    </MeasureStateContext.Provider>
  )
}

// Usage Hooks

function useMeasureState() {
  const measurements = useContext(MeasureStateContext)

  if (typeof measurements === undefined) {
    throw new Error("useMeasureState must be used within a MeasureProvider")
  }

  return measurements
}

function useMeasureUpdater() {
  const setMeasurements = useContext(MeasureUpdateContext)

  if (typeof setMeasurements === undefined) {
    throw new Error("useMeasureUpdater must be used within a MeasureProvider")
  }

  return setMeasurements
}

export { MeasureProvider, useMeasureState, useMeasureUpdater }
