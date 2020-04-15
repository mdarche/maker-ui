import React, { useState, useContext } from 'react'
import merge from 'deepmerge'

import defaultOptions from '../config/options'

const OptionContext = React.createContext()
const OptionUpdateContext = React.createContext()

// Provider

const OptionProvider = ({ options = {}, children }) => {
  const [state, dispatch] = useState(merge(defaultOptions, options))

  return (
    <OptionContext.Provider value={state}>
      <OptionUpdateContext.Provider value={dispatch}>
        {children}
      </OptionUpdateContext.Provider>
    </OptionContext.Provider>
  )
}

// Usage Hooks

function useOptions() {
  const options = useContext(OptionContext)

  if (options === undefined) {
    throw new Error(
      'useOptions must be used within an Maker UI Layout component'
    )
  }

  return options
}

function useOptionUpdater() {
  const dispatch = useContext(OptionUpdateContext)

  if (dispatch === undefined) {
    throw new Error(
      'useOptionsUpdater must be used within an Maker UI Layout component'
    )
  }

  function setOptions(options) {
    dispatch(state => merge(state, options))
  }

  return setOptions
}

function useLayout() {
  const { layout } = useContext(OptionContext)
  const dispatch = useContext(OptionUpdateContext)

  if (layout === undefined) {
    throw new Error('useLayout must be used within an Maker UI layout')
  }

  function setLayout(newLayout) {
    dispatch(state => ({ ...state, layout: newLayout }))
  }

  return [layout, setLayout]
}

export { OptionProvider, useOptions, useOptionUpdater, useLayout }
