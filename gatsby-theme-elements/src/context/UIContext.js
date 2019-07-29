import React, { useState, useContext, useMemo } from "react"
import merge from "deepmerge"
import options from "../config/defaults"

const errorCheck = (name, value) => {
  if (value === undefined) {
    throw new Error(`${name} must be used within a UIContextProvider`)
  }
}

// UI Context Provider

const UIContext = React.createContext()

const UIContextProvider = ({ children }) => {
  const [state, setState] = useState({
    options,
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
  errorCheck("useOptions", state)

  return state.options
}

function useMenu() {
  const { state, setState } = useContext(UIContext)
  const menuActive = state.menuActive
  errorCheck("useMenu", state)

  function toggleMenu() {
    setState(state => ({
      ...state,
      menuActive: !state.menuActive,
    }))
  }

  return [menuActive, toggleMenu]
}

function useSideNav() {
  const { state, setState } = useContext(UIContext)
  const sideNavActive = state.sideNavActive
  errorCheck("useSideNav", state)

  function toggleSideNav(value) {
    setState(state => ({
      ...state,
      sideNavActive: value ? value : !state.sideNavActive,
    }))
  }

  return [sideNavActive, toggleSideNav]
}

function useTopbar() {
  const { setState } = useContext(UIContext)
  errorCheck("useTopbar", setState)

  function setTopbar(value) {
    setState(state => merge(state, { options: { topbar: { sticky: value } } }))
  }

  return setTopbar
}

export { UIContextProvider, useOptions, useMenu, useSideNav, useTopbar }
