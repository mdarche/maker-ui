import * as React from 'react'
import { merge } from '@maker-ui/utils'
import { Global } from '@maker-ui/css'

import { colorVars, themeVars } from '../utils/css-builder'
import { globalStyles, layoutStyles, utilityStyles } from '../styles'
import { useOptions } from './OptionContext'
import { contentTypes, navTypes, mobileNavTypes } from '../constants'

export type LayoutString<T> = T extends 'content'
  ? typeof contentTypes[number]
  : T extends 'nav'
  ? typeof navTypes[number]
  : typeof mobileNavTypes[number]

export interface LayoutState {
  layout_nav: typeof navTypes[number]
  layout_navMobile: typeof mobileNavTypes[number]
  layout_content: typeof contentTypes[number]
  height_header: number
  height_topbar: number
  height_toolbar: number
  colorTheme?: string
}

interface LayoutProviderProps {
  children: React.ReactNode
  styles?: object
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
 * The `LayoutProvider` tracks the current site layout / key runtime
 * UI measurements and formats the framework's global styles.
 *
 * @todo clean up / optimize color mode logic. Fix default color mode
 *
 * @internal
 */

const LayoutProvider = ({ styles = {}, children }: LayoutProviderProps) => {
  const options = useOptions()
  const [state, setState] = React.useState<LayoutState>({
    layout_nav: options.header.navType,
    layout_navMobile: options.header.mobileNavType,
    layout_content: 'content',
    height_header: 0,
    height_topbar: 0,
    height_toolbar: 0,
    colorTheme: undefined,
  })

  React.useEffect(() => {
    setState((s) => ({
      ...s,
      layout_nav: options.header.navType,
      layout_navMobile: options.header.mobileNavType,
    }))
  }, [options])

  /**
   * Set the initial color theme
   *
   * @remark To conform with `prefers-color-scheme`, make sure you explicitly
   * set color modes with `light` and `dark` keys.
   *
   */
  React.useEffect(() => {
    const systemDark = window?.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const systemLight = window?.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches

    const themeKeys = Object.keys(options?.colors)

    //  If there are multiple color themes, save the active one to local storage
    if (typeof options?.colors[themeKeys[0]] === 'object') {
      const colorConfig =
        typeof options.persistentColorMode === 'object' &&
        options.persistentColorMode !== null

      if (colorConfig || options.persistentColorMode) {
        const storageKey = colorConfig
          ? // @ts-ignore
            options.persistentColorMode.key
          : 'color-theme'

        const sessionCheck = localStorage.getItem(storageKey)

        const setDefaultTheme = () => {
          let theme = ''
          // Check for dark theme key and if user prefers dark mode
          if (
            options.systemColorMode &&
            themeKeys.includes('dark') &&
            themeKeys.includes('light')
          ) {
            theme = 'system'
            document.body.dataset.theme = systemDark ? 'dark' : 'light'
            setState((s) => ({
              ...s,
              colorTheme: 'system',
            }))
          } else {
            const defaultTheme = themeKeys[0]
            theme = defaultTheme
            document.body.dataset.theme = defaultTheme
            setState((s) => ({ ...s, colorTheme: defaultTheme }))
          }

          localStorage.setItem(storageKey, JSON.stringify({ theme }))
        }

        if (sessionCheck) {
          // @ts-ignore
          const { theme } = JSON.parse(localStorage.getItem(storageKey))
          const colors = options.colors
            ? [
                ...(options?.systemColorMode ? ['system'] : []),
                ...Object.keys(options.colors),
              ]
            : []

          if (colors.includes(theme)) {
            document.body.dataset.theme =
              theme === 'system' && systemDark
                ? 'dark'
                : theme === 'system' && systemLight
                ? 'light'
                : theme
            setState((s) => ({ ...s, colorTheme: theme }))
          } else {
            setDefaultTheme()
          }
        } else {
          setDefaultTheme()
        }
      }
    } else {
      setState((s) => ({ ...s, colorTheme: undefined }))
    }
  }, [options.persistentColorMode, options.colors])

  /**
   * Merge all static global styles into one object
   */

  const globalCSS: object = merge.all([
    colorVars(options.colors) as object,
    themeVars(options) as object,
    globalStyles as object,
    layoutStyles as object,
    utilityStyles as object,
  ])

  return (
    <LayoutContext.Provider value={{ state, setState }}>
      <Global styles={globalCSS} />
      {styles ? <Global styles={styles} /> : null}
      {children}
    </LayoutContext.Provider>
  )
}

/**
 * Retrieves and allows you to edit the current nav, and content layout
 *
 * @link https://maker-ui.com/hooks/#useLayout
 */

function useLayout<T extends 'content' | 'nav' | 'mobileNav'>(
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

  // @ts-ignore
  return type === 'nav'
    ? [state.layout_nav, setLayout]
    : type === 'mobileNav'
    ? [state.layout_navMobile, setLayout]
    : [state.layout_content, setLayout]
}

/**
 * Fetches Maker UI's key layout measurements
 *
 * @internal
 */

function useMeasurements() {
  const { state: measurements, setState } = React.useContext(LayoutContext) as {
    state: LayoutState
    setState: LayoutContextType['setState']
  }

  if (measurements === undefined) {
    throw new Error(
      'useMeasurement must be used within an Maker UI Layout component'
    )
  }

  function setMeasurement(key: 'topbar' | 'header' | 'toolbar', value: number) {
    setState((s) => ({ ...s, [`height_${key}`]: value }))
  }

  return { measurements, setMeasurement }
}

/**
 * Reads a parent component's children and generates a formatted Maker UI layout string.
 *
 * @internal
 */

function getLayoutType(type: 'content', children: React.ReactNode): string {
  if (typeof children === 'string') return 'unknown'

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
        .map((child) =>
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
 * Currently used in the `Content` wrapper components
 *
 * @internal
 */

function useLayoutDetector<T extends 'content', K extends React.ReactNode>(
  type: T,
  children: K
) {
  const [layout, setLayout] = useLayout(type)
  const [showError, setShowError] = React.useState(false)

  React.useEffect(() => {
    if (children) {
      const currentLayout = getLayoutType(type, children)
      const isValidLayout = contentTypes.find((v) => v === currentLayout)

      if (isValidLayout) {
        if (layout !== currentLayout) {
          setLayout(currentLayout as LayoutString<T>)
        }
      } else {
        setShowError(true)
      }
    }
  }, [layout, setLayout, type, children])

  return { layout, showError }
}

function useColorTheme() {
  const options = useOptions()
  const [preference, setPreference] = React.useState('')
  const {
    state: { colorTheme },
    setState,
  } = React.useContext(LayoutContext)

  React.useEffect(() => {
    if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
      setPreference('dark')
    }
    if (window?.matchMedia('(prefers-color-scheme: light)').matches) {
      setPreference('light')
    }
  }, [])

  const themes = colorTheme
    ? [
        ...(options?.systemColorMode ? ['system'] : []),
        ...Object.keys(options.colors),
      ]
    : undefined
  const systemDark = preference === 'dark' && themes?.includes('dark')
  const systemLight = preference === 'light' && themes?.includes('light')

  function setColorTheme(theme: string) {
    if (options.persistentColorMode) {
      localStorage.setItem('color-theme', JSON.stringify({ theme }))
    }

    document.body.dataset.theme =
      theme === 'system' && systemDark
        ? 'dark'
        : theme === 'system' && systemLight
        ? 'light'
        : theme
    setState((s) => ({ ...s, colorTheme: theme }))
  }

  return { colorTheme, setColorTheme, themes, preference }
}

export {
  LayoutProvider,
  useMeasurements,
  useLayout,
  useColorTheme,
  useLayoutDetector,
}
