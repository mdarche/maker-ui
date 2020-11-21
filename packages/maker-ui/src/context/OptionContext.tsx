import * as React from 'react'
import merge from 'deepmerge'

import { MakerOptions } from '../components/types'
import { defaultOptions } from '../options'

export const OptionContext = React.createContext(null)
const OptionUpdateContext = React.createContext(null)

// Provider

const OptionProvider = ({ options = {}, children }) => {
  const [state, dispatch] = React.useState<MakerOptions>(
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
  const options: MakerOptions = React.useContext(OptionContext)

  if (options === undefined) {
    throw new Error(
      'useOptions must be used within an Maker UI Layout component'
    )
  }

  return options
}

function useOptionUpdater() {
  const dispatch = React.useContext(OptionUpdateContext)

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

export { OptionProvider, useOptions, useOptionUpdater }
