import React, { useReducer, useContext } from "react"
import merge from "deepmerge"

import defaultOptions from "../utils/default-options"

const ElementsStateContext = React.createContext()
const ElementsUpdateContext = React.createContext()

function elementsReducer(state, action) {
  switch (action.type) {
    case "options": {
      return { ...state, options: merge(state.options, action.payload) }
    }
    case "menu": {
      return { ...state, menuActive: !state.menuActive }
    }
    case "modal": {
      return { ...state, modalActive: !state.modalActive }
    }
    case "sideNav": {
      return { ...state, sideNavActive: !state.sideNavActive }
    }
    case "layout": {
      return {
        ...state,
        options: merge(state.options, { layout: action.payload }),
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const ElementsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(elementsReducer, {
    options: defaultOptions,
    menuActive: false,
    modalActive: false,
    sideNavActive: false,
  })

  return (
    <ElementsStateContext.Provider value={state}>
      <ElementsUpdateContext.Provider value={dispatch}>
        {children}
      </ElementsUpdateContext.Provider>
    </ElementsStateContext.Provider>
  )
}

// Usage Hooks

function useOptions() {
  const { options } = useContext(ElementsStateContext)
  if (typeof options === undefined) {
    throw new Error("useOptions must be used within an ElementsProvider")
  }
  return options
}

function useOptionsUpdater() {
  const dispatch = useContext(ElementsUpdateContext)

  if (typeof options === undefined) {
    throw new Error("useOptionsUpdater must be used within an ElementsProvider")
  }

  function setOptions(options) {
    dispatch({ type: "options", payload: options })
  }

  return setOptions
}

function useMenu() {
  const { menuActive } = useContext(ElementsStateContext)
  const dispatch = useContext(ElementsUpdateContext)

  if (typeof menuActive === undefined) {
    throw new Error("useMenu must be used within an ElementsProvider")
  }

  function toggleMenu() {
    dispatch({ type: "menu" })
  }

  return [menuActive, toggleMenu]
}

function useLayout() {
  const {
    options: { layout },
  } = useContext(ElementsStateContext)
  const dispatch = useContext(ElementsUpdateContext)

  if (typeof layout === undefined) {
    throw new Error("useLayout must be used within an ElementsProvider")
  }

  function setLayout(newLayout) {
    dispatch({ type: "layout", payload: newLayout })
  }

  return [layout, setLayout]
}

function useSideNav() {
  const { sideNavActive } = useContext(ElementsStateContext)
  const dispatch = useContext(ElementsUpdateContext)

  if (typeof sideNavActive === undefined) {
    throw new Error("useSideNav must be used within an ElementsProvider")
  }

  function setSideNav() {
    dispatch({ type: "sideNav" })
  }
  return [sideNavActive, setSideNav]
}

export {
  ElementsProvider,
  useOptions,
  useOptionsUpdater,
  useMenu,
  useLayout,
  useSideNav,
}
