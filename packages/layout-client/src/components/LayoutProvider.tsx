import * as React from 'react'
import { merge } from '@maker-ui/utils'
import {
  defaultSettings,
  type MakerUIOptions,
  type Options,
} from '@maker-ui/layout-server'

import { Effects } from './Effects'
import { ThemeProvider } from './ThemeProvider'

type Action =
  | { type: 'SET_MOBILE_MENU'; value?: boolean }
  | {
      type: 'SET_PANEL'
      value: { value: boolean; type: 'leftPanel' | 'rightPanel' }
    }
  | { type: 'RESET'; value?: LayoutState['active'] }

export interface LayoutState {
  active: {
    mobileMenu: boolean
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
  state: LayoutState
  dispatch: (a: Action) => void
}

// Assumes desktop screen size by default
const initialActive = {
  mobileMenu: false,
  leftPanel: true,
  rightPanel: true,
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
    case 'SET_PANEL': {
      return merge(state, {
        active: { [action.value.type]: action.value.value },
      })
    }
    case 'RESET': {
      return { ...state, active: action?.value || initialActive }
    }
    default: {
      throw new Error(`Unhandled action type.`)
    }
  }
}

export const LayoutProvider = (props: LayoutProviderProps) => {
  const options = merge(defaultSettings, props.options || {}) as Options
  const [state, dispatch] = React.useReducer(reducer, {
    active: initialActive,
    options,
  })

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      <ThemeProvider options={props?.options?.colorThemes as string[]}>
        <Effects options={options} />
        {props.children}
      </ThemeProvider>
    </LayoutContext.Provider>
  )
}
