import * as React from 'react'

export interface ActionState {
  menuActive: boolean
  sideNavActive: boolean
  sideNavCollapse: boolean
  leftPanelActive: boolean
  rightPanelActive: boolean
  toolbarActive: boolean
}
type Action =
  | { type: 'MENU' }
  | { type: 'SIDENAV' }
  | { type: 'SIDENAV-COLLAPSE' }
  | { type: 'PANEL-LEFT' }
  | { type: 'PANEL-RIGHT' }

type DispatchType = (s: Action) => void

interface ActionProviderProps {
  children: React.ReactNode
}

function reducer(state: ActionState, action: Action): ActionState {
  switch (action.type) {
    case 'MENU': {
      return { ...state, menuActive: !state.menuActive }
    }
    case 'SIDENAV': {
      return { ...state, sideNavActive: !state.sideNavActive }
    }
    case 'SIDENAV-COLLAPSE': {
      return { ...state, sideNavCollapse: !state.sideNavCollapse }
    }
    case 'PANEL-LEFT':
      return { ...state, leftPanelActive: !state.leftPanelActive }
    case 'PANEL-RIGHT':
      return { ...state, rightPanelActive: !state.rightPanelActive }
    default: {
      throw new Error(`Unhandled action type.`)
    }
  }
}

const ActionContext = React.createContext<Partial<ActionState>>({})
const ActionUpdateContext = React.createContext<DispatchType>(() => {})

/**
 * The `ActionProvider` controls the showing / toggling of all compatible Maker UI
 * layout components.
 *
 * @internal usage only
 */

const ActionProvider = ({ children }: ActionProviderProps) => {
  const [state, dispatch]: [ActionState, any] = React.useReducer(reducer, {
    menuActive: false,
    sideNavActive: false,
    sideNavCollapse: false,
    leftPanelActive: true,
    rightPanelActive: true,
    toolbarActive: true,
  })

  return (
    <ActionContext.Provider value={state}>
      <ActionUpdateContext.Provider value={dispatch}>
        {children}
      </ActionUpdateContext.Provider>
    </ActionContext.Provider>
  )
}

/**
 * Returns the current state and a toggle function for the `MobileMenu`
 *
 * @link https://maker-ui.com/hooks/#useMenu
 */

function useMenu(): [boolean, () => void] {
  const { menuActive }: Partial<ActionState> = React.useContext(ActionContext)
  const dispatch = React.useContext(ActionUpdateContext)

  if (typeof menuActive === undefined) {
    throw new Error('useMenu must be used within an Maker UI layout')
  }

  function toggleMenu() {
    dispatch({ type: 'MENU' })
  }

  return [menuActive as boolean, toggleMenu]
}

/**
 * Returns the current state and a toggle function for the `SideNav`
 *
 * @link https://maker-ui.com/hooks/#useSideNav
 */

function useSideNav(): [boolean, () => void] {
  const { sideNavActive }: Partial<ActionState> = React.useContext(
    ActionContext
  )
  const dispatch = React.useContext(ActionUpdateContext)

  if (typeof sideNavActive === undefined) {
    throw new Error('useSideNav must be used within an Maker UI layout')
  }

  function setSideNav() {
    dispatch({ type: 'SIDENAV' })
  }

  return [sideNavActive as boolean, setSideNav]
}

/**
 * Returns the current state and a toggle function for the `SideNav`
 *
 * @link https://maker-ui.com/hooks/#useSideNav
 */

function useCollapseSideNav(): [boolean, () => void] {
  const { sideNavCollapse }: Partial<ActionState> = React.useContext(
    ActionContext
  )
  const dispatch = React.useContext(ActionUpdateContext)

  if (typeof sideNavCollapse === undefined) {
    throw new Error('useSideNav must be used within an Maker UI layout')
  }

  function setSideNavCollapse() {
    dispatch({ type: 'SIDENAV-COLLAPSE' })
  }

  return [sideNavCollapse as boolean, setSideNavCollapse]
}

export { ActionProvider, useMenu, useSideNav, useCollapseSideNav }
