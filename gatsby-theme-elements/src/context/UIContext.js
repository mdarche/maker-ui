import React, { useState, useContext } from "react"
import { useColorMode } from "theme-ui"

import themeOptions from "../../options"

const UIContext = React.createContext()

// Create provider

const UIContextProvider = ({ children }) => {
  const [state, setState] = useState({
    options: themeOptions,
    mobileActive: false,
  })
  const value = React.useMemo(() => {
    return { state, setState }
  }, [state])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

// Expose options to layout components & child themes

const getOptions = () => {
  const { state } = useContext(UIContext)
  if (state.options === undefined) {
    throw new Error("getOptions must be used within a UIContextProvider")
  }
  return state.options
}

const updateUI = () => {
  const { setState } = useContext(UIContext)

  function toggleMenu() {
    console.log("Toggling menu")
    setState(state => ({
      ...state,
      mobileActive: !state.mobileActive,
    }))
  }

  function colorMode() {
    const [colorMode, setColorMode] = useColorMode()
  }

  return { toggleMenu }
}

export { UIContextProvider, UIContext, getOptions, updateUI }
