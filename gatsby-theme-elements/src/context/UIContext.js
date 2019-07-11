import React, { useState } from "react"
import themeOptions from "../../options"

const UIContext = React.createContext()

const UIContextProvider = ({ children }) => {
  const [options, setOptions] = useState(themeOptions)

  const value = React.useMemo(() => {
    return { options, setOptions }
  }, [options])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export { UIContext, UIContextProvider }
