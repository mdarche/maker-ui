import React, { useState, useContext } from 'react'
import merge from 'deepmerge'

import { MakerOptions } from '../components/types'
import { defaultOptions } from '../options'

export const OptionContext = React.createContext(null)
const OptionUpdateContext = React.createContext(null)

interface OptionState extends MakerOptions {
  measure?: {
    header?: number
    topbar?: number
  }
}

// Provider

const OptionProvider = ({ options = {}, children }) => {
  const [state, dispatch] = useState<OptionState>(
    merge({ ...defaultOptions, measure: { header: 0, topbar: 0 } }, options)
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
  const options: OptionState = useContext(OptionContext)

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

function useLayout(type?: 'content' | 'workspace') {
  const { layout, workspace } = useContext(OptionContext)
  const dispatch = useContext(OptionUpdateContext)

  if (layout === undefined) {
    throw new Error(
      'useLayout must be used within an Maker UI Layout component'
    )
  }

  function setContentLayout(newLayout: string) {
    dispatch(state => ({ ...state, layout: newLayout }))
  }

  function setWorkspaceLayout(newLayout: string) {
    dispatch(state => ({ ...state, workspace: { layout: newLayout } }))
  }

  return type === 'workspace'
    ? [workspace.layout, setWorkspaceLayout]
    : [layout, setContentLayout]
}

export { OptionProvider, useOptions, useOptionUpdater, useLayout }
