import React, { useReducer, useContext } from 'react'

const ActionContext = React.createContext()
const ActionUpdateContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'menu': {
      return { ...state, menuActive: !state.menuActive }
    }
    case 'sideNav': {
      return { ...state, sideNavActive: !state.sideNavActive }
    }
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

  if (typeof menuActive === undefined)
    throw new Error('useMenu must be used within an Maker UI Layout component')

  function toggleMenu() {
    dispatch({ type: 'menu' })
  }

  return [menuActive, toggleMenu]
}

function useSideNav() {
  const { sideNavActive } = useContext(ActionContext)
  const dispatch = useContext(ActionUpdateContext)

  if (typeof sideNavActive === undefined)
    throw new Error(
      'useSideNav must be used within an Maker UI Layout component'
    )

  function setSideNav() {
    dispatch({ type: 'sideNav' })
  }
  return [sideNavActive, setSideNav]
}

export { ActionProvider, useMenu, useSideNav }
