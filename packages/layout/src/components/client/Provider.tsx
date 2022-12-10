'use client'

import * as React from 'react'
import { merge } from '@maker-ui/utils'
import { Effects } from './Effects'
import type { MakerUIOptions, Options } from '@/types'
import { defaults } from '@/defaults'

type Action =
  | { type: 'SET_MENU' }
  | { type: 'SET_SIDENAV' }
  | { type: 'SET_SIDENAV_COLLAPSE' }
  | { type: 'SET_COLOR_THEME'; value: string }

interface LayoutState {
  sideNavActive: boolean
  menuActive: boolean
  sideNavCollapse: boolean
  colorTheme?: string
  options?: Options
}

interface LayoutProviderProps {
  children: React.ReactNode
  options?: MakerUIOptions
}

type LayoutContextType = {
  state: Partial<LayoutState>
  dispatch: (a: Action) => void
}

const LayoutContext = React.createContext<LayoutContextType>({
  state: {},
  dispatch: (a) => {},
})

/**
 * Utility that ensures all values in an array exist in a target array.
 */
function allExist(arr: string[], values: string[]) {
  return values.every((value) => {
    return arr.indexOf(value) !== -1
  })
}

function setBrowserTheme(
  value: string | 'default',
  themes: string[],
  setStorage = true
) {
  if (window === undefined) return
  const key = 'color-theme'
  let t = ''
  const dark = window?.matchMedia('(prefers-color-scheme: dark)').matches

  if (value === 'system' && allExist(themes, ['system', 'dark', 'light'])) {
    t = dark ? 'dark' : 'light'
  } else if (value === 'default') {
    t = themes[0]
  } else {
    t = value
  }
  document.body.dataset.theme = t
  if (setStorage) {
    localStorage.setItem(key, JSON.stringify({ theme: value }))
  }
}

function reducer(state: LayoutState, action: Action): LayoutState {
  switch (action.type) {
    case 'SET_MENU': {
      return { ...state, menuActive: !state.menuActive }
    }
    case 'SET_SIDENAV': {
      return { ...state, sideNavActive: !state.sideNavActive }
    }
    case 'SET_SIDENAV_COLLAPSE': {
      return { ...state, sideNavCollapse: !state.sideNavCollapse }
    }
    case 'SET_COLOR_THEME': {
      return { ...state, colorTheme: action.value }
    }
    default: {
      throw new Error(`Unhandled action type.`)
    }
  }
}

export const Provider = (props: LayoutProviderProps) => {
  const options = merge(defaults, props.options || {}) as Options
  const [state, dispatch] = React.useReducer(reducer, {
    sideNavActive: false,
    menuActive: false,
    sideNavCollapse: false,
    options,
  })

  /**
   * Set the initial color theme
   *
   * @remark To conform with `prefers-color-scheme`, make sure you explicitly
   * set color modes with `light` and `dark` keys.
   *
   */
  React.useEffect(() => {
    const themes = options.colorThemes
    //  If there are multiple color themes, save the active one to local storage
    if (themes.length) {
      const key = 'color-theme'
      const sessionCheck = localStorage.getItem(key)

      if (sessionCheck) {
        const { theme } = JSON.parse(localStorage.getItem(key) as string) || {}
        const exists = themes.includes(theme)

        setBrowserTheme(exists ? theme : 'default', themes, exists)
        dispatch({ type: 'SET_COLOR_THEME', value: exists ? theme : themes[0] })
      } else {
        setBrowserTheme('default', themes)
        dispatch({ type: 'SET_COLOR_THEME', value: themes[0] })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * NOTE - ALL STYLES ADDED TO HEAD WILL BE MOVED TO SERVER WHEN
   * NEXT.JS LAYOUT API SUPPORTS <style> TAGS
   */
  React.useEffect(() => {
    // Add option based styles to document head
    // Add initial media query styles to document head
  }, [])

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      <Effects options={options} />
      {props.children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const {
    state: { options },
  } = React.useContext(LayoutContext)

  return { options }
}

export const useMenu = () => {
  const {
    state: { options, menuActive, sideNavActive, sideNavCollapse },
    dispatch,
  } = React.useContext(LayoutContext)

  function setMenu(type: 'menu' | 'sidenav' | 'collapse', value?: boolean) {
    if (type === 'menu') {
      // If sidenav is main menu, handle appropriately-- check options
      dispatch({ type: 'SET_MENU' })
    } else if (type === 'collapse') {
      dispatch({ type: 'SET_SIDENAV_COLLAPSE' })
    } else {
    }
  }

  return { menuActive, sideNavActive, sideNavCollapse, setMenu }
}

export function useColorTheme() {
  const {
    state: { colorTheme, options },
    dispatch,
  } = React.useContext(LayoutContext)

  function setColorTheme(theme: string) {
    setBrowserTheme(theme, options?.colorThemes || [])
    dispatch({ type: 'SET_COLOR_THEME', value: theme })
  }

  return {
    themes: options?.colorThemes || [],
    current: colorTheme,
    setColorTheme,
  }
}
