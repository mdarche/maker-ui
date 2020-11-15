import React, { useState, useContext } from 'react'
import merge from 'deepmerge'

import { MakerOptions } from '../components/types'
import { defaultOptions } from '../options'

export const OptionContext = React.createContext(null)
const OptionUpdateContext = React.createContext(null)

// Provider

const OptionProvider = ({ options = {}, children }) => {
  const [state, dispatch] = useState<MakerOptions>(
    merge(defaultOptions, options)
  )

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
  const options: MakerOptions = useContext(OptionContext)

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
    throw new Error(
      'useLayout must be used within an Maker UI Layout component'
    )
  }

  function setLayout(newLayout) {
    dispatch(state => ({ ...state, layout: newLayout }))
  }

  return [layout, setLayout]
}

export { OptionProvider, useOptions, useOptionUpdater, useLayout }
