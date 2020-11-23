import * as React from 'react'
import { MaybeElement, ResponsiveScale } from 'maker-ui'

const TreeDataContext = React.createContext(null)

interface TreeState extends Omit<TreeContextProps, 'buttons' | 'children'> {
  expand: MaybeElement
  collapse: MaybeElement
  neutral: MaybeElement
}

export interface TreeContextProps {
  buttons?: {
    expand?: MaybeElement
    collapse?: MaybeElement
    neutral?: MaybeElement
  }
  indentation?: ResponsiveScale
  clickableText?: boolean
  children?: React.ReactElement | React.ReactElement[]
  variant?: string | string[]
}

/**
 * The `TreeContext` is a provider component that wraps all the `TreeMenu` and all
 * nested tree branches.
 *
 * @internal usage only
 */

export const TreeContext = ({
  variant,
  buttons,
  indentation,
  clickableText,
  children,
}: TreeContextProps) => {
  const [state] = React.useState<TreeState>({
    expand: buttons.expand,
    collapse: buttons.collapse,
    neutral: buttons.neutral,
    clickableText,
    indentation,
    variant,
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
