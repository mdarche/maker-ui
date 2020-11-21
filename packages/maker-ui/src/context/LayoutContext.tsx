import * as React from 'react'

import { useOptions } from './OptionContext'

export const LayoutContext = React.createContext(null)

export interface LayoutState {
  layout_nav?: string
  layout_content?: string
  layout_workspace?: string
  height_header?: number
  height_topbar?: number
}

// Provider

const LayoutProvider = ({ children }) => {
  const { navType } = useOptions()
  const [state, dispatch] = React.useState<LayoutState>({
    layout_nav: navType,
    layout_content: 'initial',
    layout_workspace: 'initial',
    height_header: 0,
    height_topbar: 0,
  })

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      {children}
    </LayoutContext.Provider>
  )
}

// Usage Hooks

function useMeasurements() {
  const [measurements, dispatch]: [LayoutState, Function] = React.useContext(
    LayoutContext
  )

  if (measurements === undefined) {
    throw new Error(
      'useMeasurement must be used within an Maker UI Layout component'
    )
  }

  function setMeasurement(
    key: 'height_topbar' | 'height_header',
    value: number
  ) {
    dispatch(state => ({ ...state, [key]: value }))
  }

  return { measurements, setMeasurement }
}

function useLayout(type: 'content' | 'workspace' | 'nav') {
  const [
    { layout_content, layout_workspace, layout_nav },
    dispatch,
  ] = React.useContext(LayoutContext)

  if (dispatch === undefined) {
    throw new Error('useLayout must be used within a Maker UI Layout component')
  }

  function setLayout(newLayout: string) {
    dispatch(state => ({ ...state, [`layout_${type}`]: newLayout }))
  }

  return type === 'workspace'
    ? [layout_workspace, setLayout]
    : type === 'nav'
    ? [layout_nav, setLayout]
    : [layout_content, setLayout]
}

export { LayoutProvider, useMeasurements, useLayout }
