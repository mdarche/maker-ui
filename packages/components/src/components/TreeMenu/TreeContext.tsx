import * as React from 'react'
import { ResponsiveScale } from 'maker-ui'
import { SpringConfig } from 'react-spring'

const TreeDataContext = React.createContext(null)

interface TreeState extends Omit<TreeContextProps, 'buttons' | 'children'> {
  expand: React.ReactNode
  collapse: React.ReactNode
  neutral: React.ReactNode
}

export interface TreeContextProps {
  buttons?: {
    expand?: React.ReactNode
    collapse?: React.ReactNode
    neutral?: React.ReactNode
  }
  indentation?: ResponsiveScale
  clickableText?: boolean
  springConfig?: SpringConfig
  children?: React.ReactNode
}

/**
 * The `TreeContext` is a provider component that wraps all the `TreeMenu` and all
 * nested tree branches.
 *
 * @internal usage only
 */

export const TreeContext = ({
  buttons,
  indentation,
  clickableText,
  springConfig,
  children,
}: TreeContextProps) => {
  const [state] = React.useState<TreeState>({
    expand: buttons.expand,
    collapse: buttons.collapse,
    neutral: buttons.neutral,
    clickableText,
    indentation,
    springConfig,
  })
  return (
    <TreeDataContext.Provider value={state}>
      {children}
    </TreeDataContext.Provider>
  )
}

TreeContext.displayName = 'TreeContext'

/**
 * Hook for passing tree menu configuration to all child components.
 *
 * @internal usage only
 */

export function useTreeData() {
  const state: TreeState = React.useContext(TreeDataContext)

  if (typeof state === undefined) {
    throw new Error('TreeItem must be used inside a TreeMenu component')
  }

  return state
}
