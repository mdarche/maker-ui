import React, { useState, useContext } from "react"
import themeOptions from "../../options"

const UIContext = React.createContext()

// Create provider

const UIContextProvider = ({ children }) => {
  const [options, setOptions] = useState(themeOptions)

  const value = React.useMemo(() => {
    return { options, setOptions }
  }, [options])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

// Expose options to layout components & child themes

const getOptions = () => {
  const { options } = useContext(UIContext)
  if (options === undefined) {
    throw new Error("getOptions must be used within a UIContextProvider")
  }
  return options
}

const measure = () => {
  const { setOptions } = useContext(UIContext)

  function getTopBarHeight(height) {
    setOptions(options => ({
      ...options,
      topBar: { ...options.topBar, height },
    }))
  }

  return { getTopBarHeight }
}

export { UIContextProvider, getOptions, measure }
