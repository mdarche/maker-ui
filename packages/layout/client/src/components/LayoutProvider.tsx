import React, { useEffect } from 'react'
import { merge } from '@maker-ui/utils'
import {
  defaultSettings,
  type MakerUIOptions,
  type Options,
} from '@maker-ui/layout-server'
import { usePathname } from 'next/navigation'

import { Effects } from './Effects'
import { getHeaderStyles, getLayoutStyles } from '../styles'
import { setBrowserTheme } from '../hooks/useColorTheme'

type Action =
  | { type: 'SET_MOBILE_MENU'; value?: boolean }
  | { type: 'SET_SIDE_NAV_MOBILE'; value?: boolean }
  | { type: 'SET_SIDE_NAV_DESKTOP'; value?: boolean }
  | {
      type: 'SET_WORKSPACE'
      value: { value: boolean; type: 'workspaceLeft' | 'workspaceRight' }
    }
  | { type: 'SET_COLOR_THEME'; value: string }
  | { type: 'RESET'; value?: LayoutState['active'] }

export interface LayoutState {
  active: {
    mobileMenu: boolean
    sideNavMobile: boolean
    sideNavDesktop: boolean
    workspaceLeft: boolean
    workspaceRight: boolean
  }
  colorTheme?: string
  options?: Options
}

interface LayoutProviderProps {
  children: React.ReactNode
  options?: MakerUIOptions
}

type LayoutContextType = {
  state: LayoutState
  dispatch: (a: Action) => void
}

// Assumes desktop screen size by default
const initialActive = {
  mobileMenu: false,
  sideNavMobile: false,
  sideNavDesktop: true,
  workspaceLeft: true,
  workspaceRight: true,
}

export const LayoutContext = React.createContext<LayoutContextType>({
  state: { active: initialActive },
  dispatch: (a) => {},
})

function reducer(state: LayoutState, action: Action): LayoutState {
  switch (action.type) {
    case 'SET_MOBILE_MENU': {
      return merge(state, { active: { mobileMenu: !state.active.mobileMenu } })
    }
    case 'SET_SIDE_NAV_MOBILE': {
      return merge(state, {
        active: { sideNavMobile: action.value || !state.active.sideNavMobile },
      })
    }
    case 'SET_SIDE_NAV_DESKTOP': {
      return merge(state, {
        active: {
          sideNavDesktop: action.value || !state.active.sideNavDesktop,
        },
      })
    }
    case 'SET_WORKSPACE': {
      return merge(state, {
        active: { [action.value.type]: action.value.value },
      })
    }
    case 'RESET': {
      return { ...state, active: action?.value || initialActive }
    }
    case 'SET_COLOR_THEME': {
      return { ...state, colorTheme: action.value }
    }
    default: {
      throw new Error(`Unhandled action type.`)
    }
  }
}

export const LayoutProvider = (props: LayoutProviderProps) => {
  const pathname = usePathname()
  const [initialized, setInitialized] = React.useState(false)
  const options = merge(defaultSettings, props.options || {}) as Options
  const [state, dispatch] = React.useReducer(reducer, {
    active: initialActive,
    options,
  })

  /**
   * Set the initial color theme
   *
   * @remark To conform with `prefers-color-scheme`, you must explicitly
   * set color modes with `light` and `dark` keys.
   *
   */
  useEffect(() => {
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
   * @TODO - ALL STYLES ADDED TO HEAD WILL BE MOVED TO SERVER WHEN
   * NEXT.JS LAYOUT API SUPPORTS <style> TAGS
   */
  useEffect(() => {
    const exists = document.getElementById('mkui-responsive')
    if (exists) {
      exists.remove()
    }

    let header = false
    let topbar = false

    React.Children.toArray(props.children).forEach((child: any) => {
      const type = child.props?.className
      if (type?.includes('mkui-header')) {
        header = true
      }
      if (type?.includes('mkui-topbar')) {
        topbar = true
      }
    })

    const style = document.createElement('style')
    let css = ''
    css += getHeaderStyles(options, { topbar, header })
    css += getLayoutStyles(options, { topbar, header })

    style.textContent = css
    style.id = 'mkui-responsive'

    document.head.appendChild(style)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  React.useEffect(() => {
    if (initialized) return
    setInitialized(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {initialized ? (
        <>
          <Effects options={options} />
          {props.children}
        </>
      ) : null}
    </LayoutContext.Provider>
  )
}
