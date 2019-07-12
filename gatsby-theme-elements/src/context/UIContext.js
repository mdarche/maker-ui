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

// Expose theme options

const setThemeOptions = newOptions => {
  const { setOptions } = useContext(UIContext)

  return setOptions(options => ({
    ...options,
    ...newOptions,
  }))
}

export { UIContext, UIContextProvider, setThemeOptions }
