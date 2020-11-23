import React, { useState, useContext } from 'react'
import { MaybeElement, ResponsiveScale } from 'maker-ui'

const TreeDataContext = React.createContext(null)

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
  const [state] = useState({
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

export function useTreeData() {
  const state: any = useContext(TreeDataContext)

  if (typeof state === undefined) {
    throw new Error('TreeItem must be used inside a TreeMenu component')
  }

  return state
}
