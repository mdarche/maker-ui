import React, { useState, useContext } from "react"

const MeasureContext = React.createContext()

// TODO - get measurements of full header and viewport width on resize
// Create provider

const MeasureContextProvider = ({ children }) => {
  const [data, measure] = useState({
    topbarHeight: 0,
  })
  const value = React.useMemo(() => {
    return { data, measure }
  }, [data])

  return (
    <MeasureContext.Provider value={value}>{children}</MeasureContext.Provider>
  )
}

// Expose measurements to layout components & child themes

const getMeasurements = () => {
  const { data } = useContext(MeasureContext)
  if (data === undefined) {
    throw new Error(
      "getMeasurements must be used within a MeasureContextProvider"
    )
  }
  return data
}

const measure = () => {
  const { measure } = useContext(MeasureContext)

  function getTopbarHeight(height) {
    measure(measurements => ({
      ...measurements,
      topbarHeight: height,
    }))
  }

  return { getTopbarHeight }
}

export { MeasureContextProvider, getMeasurements, measure }
