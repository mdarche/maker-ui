import * as React from 'react'

import { useOptions } from './OptionContext'
import {
  contentTypes,
  workspaceTypes,
  navTypes,
  mobileNavTypes,
} from '../constants'

export type LayoutString<T> = T extends 'content'
  ? typeof contentTypes[number]
  : T extends 'workspace'
  ? typeof workspaceTypes[number]
  : T extends 'nav'
  ? typeof navTypes[number]
  : typeof mobileNavTypes[number]

export interface LayoutState {
  layout_nav: typeof navTypes[number]
  layout_navMobile: typeof mobileNavTypes[number]
  layout_content: typeof contentTypes[number]
  layout_workspace: typeof workspaceTypes[number]
  height_header: number
  height_topbar: number
  height_toolbar: number
}

interface LayoutProviderProps {
  children: React.ReactNode
}

type LayoutContextType = {
  state: Partial<LayoutState>
  setState: React.Dispatch<React.SetStateAction<LayoutState>>
}

export const LayoutContext = React.createContext<LayoutContextType>({
  state: {},
  setState: () => {},
})

/**
 * The `LayoutProvider` tracks the current site layout and important
 * runtime UI measurements.
 *
 * @internal usage only
 */

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const { header } = useOptions()
  const [state, setState] = React.useState<LayoutState>({
    layout_nav: header.navType,
    layout_navMobile: header.mobileNavType,
    layout_content: 'content',
    layout_workspace: 'canvas',
    height_header: 0,
    height_topbar: 0,
    height_toolbar: 0,
  })

  return (
    <LayoutContext.Provider value={{ state, setState }}>
      {children}
    </LayoutContext.Provider>
  )
}

/**
 * Retrieves and allows you to edit the current nav, content, and workspace layout
 *
 * @see https://maker-ui.com/hooks/#useLayout
 */

function useLayout<T extends 'content' | 'workspace' | 'nav' | 'mobileNav'>(
  type: T
): [LayoutString<T>, (layout: LayoutString<T>) => void] {
  const { state, setState } = React.useContext(LayoutContext)

  if (state === undefined) {
    throw new Error('useLayout must be used within a Maker UI Layout component')
  }

  function setLayout(newLayout: LayoutString<T>) {
    setState((s: LayoutState) => ({
      ...s,
      [`layout_${type}`]: newLayout,
    }))
  }

  return type === 'workspace'
    ? [state.layout_workspace, setLayout]
    : type === 'nav'
    ? [state.layout_nav, setLayout]
    : type === 'mobileNav'
    ? [state.layout_navMobile, setLayout]
    : [state.layout_content, setLayout]
}

/**
 * Fetches Maker UI's key layout measurements
 *
 * @internal usage only
 */

function useMeasurements() {
  const [measurements, setState]: [
    LayoutState,
    React.Dispatch<React.SetStateAction<LayoutState>>
  ] = React.useContext(LayoutContext)

  if (measurements === undefined) {
    throw new Error(
      'useMeasurement must be used within an Maker UI Layout component'
    )
  }

  function setMeasurement(key: 'topbar' | 'header' | 'toolbar', value: number) {
    setState(state => ({ ...state, [`height_${key}`]: value }))
  }

  return { measurements, setMeasurement }
}

/**
 * Reads a parent component's children and generates a formatted Maker UI layout string.
 *
 * @internal usage only
 */

function getLayoutType(
  type: 'content' | 'workspace',
  children: React.ReactNode
): string {
  let nodes: any[] = React.Children.toArray(children)
  let currentLayout: string

  function layoutString(val: string) {
    let v = type === 'content' ? val.replace('main', 'content') : val
    return v
      .replace(/fixed|provider|context/g, '')
      .replace(/ {2,}/g, ' ')
      .trim()
  }

  if (nodes) {
    currentLayout = layoutString(
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

  return 'unknown'
}

/**
 * Checks the current layout is compatible and updates the LayoutProvider and returns an
 * error flag
 *
 * Currently used in the `Workspace` and `Content` wrapper components
 *
 * @internal usage only
 */

function useLayoutDetector<
  T extends 'content' | 'workspace',
  K extends React.ReactNode
>(type: T, children: K) {
  const [layout, setLayout] = useLayout(type)
  const [showError, setShowError] = React.useState(false)
  const [initialRender, setInitialRender] = React.useState(true)

  React.useEffect(() => {
    if (children) {
      const currentLayout = getLayoutType(type, children)
      const isValidLayout =
        type === 'content'
          ? contentTypes.find(v => v === currentLayout)
          : workspaceTypes.find(v => v === currentLayout)

      if (isValidLayout) {
        if (layout !== currentLayout) {
          setLayout(currentLayout as LayoutString<T>)
          if (initialRender) setInitialRender(false)
        }
      } else {
        setShowError(true)
        if (initialRender) setInitialRender(false)
      }
    }
  }, [layout, setLayout, type, initialRender, children])

  return { layout, showError, initialRender }
}

export { LayoutProvider, useMeasurements, useLayout, useLayoutDetector }
