import React, { useState, useContext } from 'react'

const WorkspaceDataContext = React.createContext(null)
const WorkspaceUpdateContext = React.createContext(null)

interface WorkspaceState {
  layout?: 'panel canvas panel' | 'panel canvas' | 'canvas panel' | 'canvas'
  [key: string]: any
}

interface WorkspaceContextProps {
  layout?: WorkspaceState['layout']
  children: React.ReactNode
}

/**
 * The `WorkspaceContext` provider wraps all Workspace components to allow
 * easy access to shared functions, configurations, and variables.
 *
 * @internal use only
 */

export const WorkspaceContext = ({
  layout,
  children,
}: WorkspaceContextProps) => {
  const [state, setState] = useState<WorkspaceState>({
    layout,
  })

  return (
    <WorkspaceDataContext.Provider value={state}>
      <WorkspaceUpdateContext.Provider value={setState}>
        {children}
      </WorkspaceUpdateContext.Provider>
    </WorkspaceDataContext.Provider>
  )
}

export function useWorkspace() {
  const settings: WorkspaceState = useContext(WorkspaceDataContext)
  const setState = useContext(WorkspaceUpdateContext)

  if (typeof settings === undefined) {
    throw new Error('useWorkspace must be called inside a Workspace component.')
  }

  function updateSetting(key, value) {
    setState(s => ({ ...s, [key]: value }))
  }

  return { settings, updateSetting }
}
