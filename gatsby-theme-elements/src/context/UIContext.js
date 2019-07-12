import React, { useState, useContext } from "react"
import themeOptions from "../../options"

const UIContext = React.createContext()
// const UIUpdateContext = React.createContext()

// Create provider

const UIContextProvider = ({ children }) => {
  const [options, setOptions] = useState(themeOptions)

  const value = React.useMemo(() => {
    return { options, setOptions }
  }, [options])

  return (
    <UIContext.Provider value={value}>
      {/* <UIUpdateContext.Provider value={setOptions}> */}
      {children}
      {/* </UIUpdateContext.Provider> */}
    </UIContext.Provider>
  )
}

// Expose theme options

const getOptions = newOptions => {
  const { options } = useContext(UIContext)
  if (options === undefined) {
    throw new Error("getOptions must be used within a UIContextProvider")
  }
  return options
}

const setOptions = newOptions => {
  // const { setOptions } = useContext(UIUpdateContext)
  // if (setOptions === undefined) {
  //   throw new Error("setOptions must be used within a UIContextProvider")
  // }
  // return setOptions(options => ({
  //   ...options,
  //   ...newOptions,
  // }))
}

export { UIContextProvider, getOptions, setOptions }
