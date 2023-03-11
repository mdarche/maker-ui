import * as React from 'react'
import { merge } from '@maker-ui/utils'
import { useWindowSize } from '@maker-ui/hooks'
import {
  defaultSettings,
  type MakerUIOptions,
  type Options,
} from '@maker-ui/layout-server'
import { usePathname } from 'next/navigation'

import { Effects } from './Effects'
import { getHeaderStyles, getLayoutStyles } from '../styles'

type Action =
  | { type: 'SET_MENU'; value?: boolean }
  | { type: 'SET_SIDENAV'; value?: boolean }
  | { type: 'SET_SIDENAV_COLLAPSE'; value?: boolean }
  | { type: 'SET_PANEL'; value: { active: boolean; type: 'left' | 'right' } }
  | { type: 'SET_COLOR_THEME'; value: string }
  | { type: 'RESET' }

interface LayoutState {
  active: {
    menu: boolean
    sideNav: boolean
    sideNavCollapse: boolean
    leftPanel: boolean
    rightPanel: boolean
  }
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
      return merge(state, { active: { menu: !state.active.menu } })
    }
    case 'SET_SIDENAV': {
      return merge(state, {
        active: { sideNav: action.value || !state.active.sideNav },
      })
    }
    case 'SET_SIDENAV_COLLAPSE': {
      return merge(state, {
        active: {
          sideNavCollapse: action.value || !state.active.sideNavCollapse,
        },
      })
    }
    case 'SET_PANEL': {
      return merge(state, {
        active: { [action.value.type + 'Panel']: action.value.active },
      })
    }
    case 'RESET': {
      return {
        ...state,
        active: {
          sideNav: false,
          menu: false,
          sideNavCollapse: false,
          leftPanel: true,
          rightPanel: true,
        },
      }
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
    active: {
      menu: false,
      sideNav: false,
      sideNavCollapse: false,
      leftPanel: true,
      rightPanel: true,
    },
    options,
  })

  /**
   * Set the initial color theme
   *
   * @remark To conform with `prefers-color-scheme`, you must explicitly
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
   * @TODO - ALL STYLES ADDED TO HEAD WILL BE MOVED TO SERVER WHEN
   * NEXT.JS LAYOUT API SUPPORTS <style> TAGS
   */
  React.useEffect(() => {
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

export const useLayout = () => {
  const {
    state: { options },
  } = React.useContext(LayoutContext)

  return { options: options as Options }
}

export const useMenu = () => {
  const { width } = useWindowSize()
  const {
    state: { options, active },
    dispatch,
  } = React.useContext(LayoutContext)

  function setMenu(
    type: 'menu' | 'sidenav' | 'collapse' | 'left-panel' | 'right-panel',
    value: boolean
  ) {
    // Find elements in DOM to manipulate
    const menu = document.querySelector('.mkui-mobile-menu')
    const sidenav = document.querySelector('.mkui-sn')
    const overlay_m = document.querySelector('.mkui-overlay-m')
    const overlay_s = document.querySelector('.mkui-overlay-s')
    const overlay_w = document.querySelector('.mkui-overlay-w')
    const workspace = document.querySelector('.mkui-workspace')
    const panel_left = document.querySelector('.mkui-panel-left')
    const panel_right = document.querySelector('.mkui-panel-right')

    const handleMobileMenu = () => {
      if (value) {
        menu?.classList.add('active')
        overlay_m?.classList.add('active')
      } else {
        menu?.classList.remove('active')
        overlay_m?.classList.remove('active')
      }
    }

    const handleSideNav = () => {
      const c = type === 'collapse' ? 'sn-collapse' : 'sn-hide'
      if (!value) {
        sidenav?.classList.add(c)
        overlay_s?.classList.remove('active')
      } else {
        sidenav?.classList.remove(c)
        overlay_s?.classList.add('active')
      }
    }

    /** Handle mobile menu */
    if (type === 'menu' && !options?.sideNav.isPrimaryMobileNav) {
      handleMobileMenu()
      dispatch({ type: 'SET_MENU' })
    }
    /** Handle sidenav and mobile menu when sidenav is primary */
    if (
      (type === 'menu' && options?.sideNav.isPrimaryMobileNav) ||
      type === 'sidenav'
    ) {
      handleSideNav()
      dispatch({ type: 'SET_SIDENAV' })
    }

    if (type === 'collapse') {
      handleSideNav()
      dispatch({
        type: 'SET_SIDENAV_COLLAPSE',
      })
    }

    if (type.includes('panel')) {
      const side = type === 'left-panel' ? 'left' : 'right'
      if (value) {
        workspace?.classList.add(`${side}-active`)
        ;(side === 'left' ? panel_left : panel_right)?.classList.add('active')
        if (width && width < options?.content.breakpoint!) {
          overlay_w?.classList.add('active')
        }
      } else {
        workspace?.classList.remove(`${side}-active`)
        overlay_w?.classList.remove('active')
        ;(side === 'left' ? panel_left : panel_right)?.classList.remove(
          'active'
        )
      }
      dispatch({
        type: 'SET_PANEL',
        value: { active: value, type: side },
      })
    }
  }

  function reset(mobile = true) {
    const sidenav = document.querySelector('.mkui-sn')
    const overlay_s = document.querySelector('.mkui-overlay-s')

    dispatch({ type: 'RESET' })
    if (mobile) {
      sidenav?.classList.add('sn-hide')
      overlay_s?.classList.remove('active')
    } else {
      sidenav?.classList.remove('sn-hide')
      sidenav?.classList.remove('sn-collapse')
    }
  }

  return { active, setMenu, reset }
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
