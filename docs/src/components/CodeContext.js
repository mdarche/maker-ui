import React, { useContext, useState, useEffect } from 'react'
import { useMakerUI } from 'maker-ui'
import nightOwl from '@theme-ui/prism/presets/night-owl.json'
import github from '@theme-ui/prism/presets/github.json'

// Syntax Highlighting Options

const prismOptions = [
  { label: 'Github', theme: github },
  { label: 'Night Owl', theme: nightOwl },
]

// The Kent C. Dodds way to create / access context

const CodeContext = React.createContext(null)
const CodeUpdateContext = React.createContext(null)

const CodeProvider = ({ children }) => {
  const { extendTheme } = useMakerUI()

  const [state, dispatch] = useState({
    currentTheme: prismOptions[0],
  })

  useEffect(() => {
    extendTheme(
      { styles: { code: { ...state.currentTheme.theme } } },
      'code-block',
      true
    )
  }, [state])

  return (
    <CodeContext.Provider value={state}>
      <CodeUpdateContext.Provider value={dispatch}>
        {children}
      </CodeUpdateContext.Provider>
    </CodeContext.Provider>
  )
}

// Usage Hook

function useCode() {
  const { currentTheme } = useContext(CodeContext)
  const dispatch = useContext(CodeUpdateContext)

  if (typeof currentTheme === undefined) {
    throw new Error('useCode must be used within a CodeProvider')
  }

  function setTheme(newTheme) {
    if (newTheme !== currentTheme.label) {
      dispatch({
        currentTheme: prismOptions.find(({ label }) => label === newTheme),
      })
    }
  }

  return [currentTheme, setTheme]
}

export { CodeProvider, useCode, prismOptions }
