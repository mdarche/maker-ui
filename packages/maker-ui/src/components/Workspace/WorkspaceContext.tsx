import * as React from 'react'

interface WorkspaceState {
  [key: string]: any
}

interface WorkspaceContextProps {
  children: React.ReactNode
}

const WorkspaceDataContext = React.createContext<Partial<WorkspaceState>>({})
const WorkspaceUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<WorkspaceState>>
>(() => {})

/**
 * The `WorkspaceContext` provider wraps all Workspace components to allow
 * easy access to shared functions, configurations, and variables.
 *
 * @internal usage only
 */

export const WorkspaceContext = ({ children }: WorkspaceContextProps) => {
  const [state, setState] = React.useState<WorkspaceState>({})

  return (
    <WorkspaceDataContext.Provider value={state}>
      <WorkspaceUpdateContext.Provider value={setState}>
        {children}
      </WorkspaceUpdateContext.Provider>
    </WorkspaceDataContext.Provider>
  )
}

export function useWorkspace() {
  const settings: WorkspaceState = React.useContext(WorkspaceDataContext)
  const setState = React.useContext(WorkspaceUpdateContext)

  if (typeof settings === undefined) {
    throw new Error('useWorkspace must be called inside a Workspace component.')
  }

  function updateSetting(key: string, value: any) {
    setState(s => ({ ...s, [key]: value }))
  }

  return { settings, updateSetting }
}
