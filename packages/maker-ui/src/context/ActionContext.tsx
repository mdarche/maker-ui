import React, { useReducer, useContext } from 'react'

const ActionContext = React.createContext(null)
const ActionUpdateContext = React.createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'menu': {
      return { ...state, menuActive: !state.menuActive }
    }
    case 'sideNav': {
      return { ...state, sideNavActive: !state.sideNavActive }
    }
    case 'left-panel':
      return { ...state, leftPanelActive: !state.panelLeftActive }
    case 'right-panel':
      return { ...state, rightPanelActive: !state.panelRightActive }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

// Provider

const ActionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    menuActive: false,
    sideNavActive: false,
    leftPanelActive: true,
    rightPanelActive: true,
  })

  return (
    <ActionContext.Provider value={state}>
      <ActionUpdateContext.Provider value={dispatch}>
        {children}
      </ActionUpdateContext.Provider>
    </ActionContext.Provider>
  )
}

// Usage Hooks

function useMenu() {
  const { menuActive } = useContext(ActionContext)
  const dispatch = useContext(ActionUpdateContext)

  if (typeof menuActive === undefined) {
    throw new Error('useMenu must be used within an Maker UI layout')
  }

  function toggleMenu() {
    dispatch({ type: 'menu' })
  }

  return [menuActive, toggleMenu]
}

function useSideNav() {
  const { sideNavActive } = useContext(ActionContext)
  const dispatch = useContext(ActionUpdateContext)

  if (typeof sideNavActive === undefined) {
    throw new Error('useSideNav must be used within an Maker UI layout')
  }

  function setSideNav() {
    dispatch({ type: 'sideNav' })
  }
  return [sideNavActive, setSideNav]
}

export { ActionProvider, useMenu, useSideNav }
