import React, { useState, useContext } from 'react'

const ExtendContext = React.createContext(null)
const ExtendUpdateContext = React.createContext(null)

// Provider

const ExtensionProvider = ({ children }) => {
  const [state, set] = useState({
    extendedOptions: {},
    extendedTheme: {},
    themeKeys: [],
  })

  return (
    <ExtendContext.Provider value={state}>
      <ExtendUpdateContext.Provider value={set}>
        {children}
      </ExtendUpdateContext.Provider>
    </ExtendContext.Provider>
  )
}

// Usage Hook

function useExtensions() {
  const state = useContext(ExtendContext)
  const setState = useContext(ExtendUpdateContext)

  if (state === undefined) {
    throw new Error('useExtensions must be used within the Maker UI framework')
  }

  return [state, setState]
}

export { ExtensionProvider, useExtensions }
