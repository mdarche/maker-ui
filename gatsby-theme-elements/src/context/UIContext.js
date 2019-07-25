import React, { useState, useContext, useMemo } from "react"
import themeOptions from "../utils/defaults"
const merge = require("deepmerge")

const UIContext = React.createContext()

// Context Provider

const UIContextProvider = ({ children }) => {
  const [state, setState] = useState({
    options: themeOptions,
    menuActive: false,
    sideNavActive: true,
  })
  const value = useMemo(() => {
    return { state, setState }
  }, [state])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

// Usage Hooks

function useOptions() {
  const { state } = useContext(UIContext)

  if (state.options === undefined) {
    throw new Error("useOptions must be used within a UIContextProvider")
  }

  return state.options
}

function useMenu() {
  const { state, setState } = useContext(UIContext)
  const menuActive = state.menuActive

  function toggleMenu() {
    setState(state => ({
      ...state,
      menuActive: !state.menuActive,
    }))
  }

  return [menuActive, toggleMenu]
}

function useTopbar() {
  const { setState } = useContext(UIContext)

  function setTopbar(value) {
    setState(state => merge(state, { options: { topbar: { sticky: value } } }))
  }

  return setTopbar
}

function useSideNav() {
  const { state, setState } = useContext(UIContext)
  const sideNavActive = state.sideNavActive

  function toggleSideNav(value) {
    setState(state => ({
      ...state,
      sideNavActive: value ? value : !state.sideNavActive,
    }))
  }

  return [sideNavActive, toggleSideNav]
}

export { UIContextProvider, useOptions, useMenu, useSideNav, useTopbar }
