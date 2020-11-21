import * as React from 'react'

import { contentTypes, workspaceTypes } from '../utils/constants'
import { useLayout } from '../context/LayoutContext'

function layoutString(type: string, val: string) {
  let v = type === 'content' ? val.replace('main', 'content') : val
  return v
    .replace('fixed', '') // TODO - or 'provider' or 'context'
    .replace(/ {2,}/g, ' ')
    .trim()
}

export function layoutMatch(type: string, layout: string) {
  return type === 'content'
    ? contentTypes.includes(layout)
    : workspaceTypes.includes(layout)
}

/**
 * Utility function for reading a component's children and generating a Maker UI layout string
 */

export function getLayoutType(type: string, children: React.ReactNode): string {
  let nodes: any[] = React.Children.toArray(children)
  let currentLayout: string

  if (nodes) {
    currentLayout = layoutString(
      type,
      nodes
        .map(child =>
          child.type.displayName
            ? child.type.displayName.toLowerCase()
            : 'unknown'
        )
        .join(' ')
    )

    return currentLayout
  }
}

export function useLayoutDetector(
  type: 'content' | 'workspace',
  children: React.ReactNode
) {
  const [layout, setLayout] = useLayout(type)
  const [showError, setShowError] = React.useState(false)

  React.useEffect(() => {
    if (children) {
      const currentLayout = getLayoutType(type, children)
      const isValidLayout = layoutMatch(type, currentLayout)

      if (isValidLayout) {
        if (layout !== currentLayout) {
          setLayout(currentLayout)
        }
      } else {
        setShowError(true)
      }
    }
  }, [layout, setLayout, type, children])

  return { layout, showError }
}
