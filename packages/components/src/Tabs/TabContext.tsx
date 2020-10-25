import React, { useState, useContext, useEffect } from 'react'

// import { TabNavigation } from './TabNavigation'

const TabDataContext = React.createContext(null)
const TabUpdateContext = React.createContext(null)

export interface TabContextProps {
  renderInactive?: boolean
  variant: string | string[]
  children?: React.ReactElement
}

export interface TabState {
  activeId: string | number
  tabs: any[]
  variant: string | string[]
  renderInactive: boolean
}

/**
 * The `TabGroup` component is the root component for building a tabs container. It's a local
 * provider that contains the settings for responsive behaviors, positioning, and nested
 * `Tab` components.
 *
 * @todo - Allow users to inject non Tab components into tab canvas (npm website for example)
 * @todo - Expose the tab controls to outside components / actions (add optional event key)
 *
 * @see https://maker-ui.com/docs/components/tab
 */

export const TabContext = ({
  variant = 'tabs',
  renderInactive = false,
  children,
}: TabContextProps) => {
  const [state, setState] = useState<TabState>({
    activeId: 0,
    tabs: [],
    variant,
    renderInactive,
  })

  useEffect(() => {
    if (state.activeId === 0 && state.tabs.length) {
      setState(s => ({ ...s, activeId: s.tabs[0].id }))
    }
  }, [state])

  return (
    <TabDataContext.Provider value={state}>
      <TabUpdateContext.Provider value={setState}>
        {children}
      </TabUpdateContext.Provider>
    </TabDataContext.Provider>
  )
}

export function useTabs() {
  const state: TabState = useContext(TabDataContext)
  const setState = useContext(TabUpdateContext)

  if (typeof state === undefined) {
    throw new Error('Tab must be used within a TabGroup component')
  }

  function setActive(id): void {
    setState(s => ({
      ...s,
      activeId: id,
    }))
  }

  function addToTabGroup(item, isOpen): void {
    const exists = state.tabs ? state.tabs.find(t => t.id === item.id) : false

    if (!exists) {
      setState(s => ({
        ...s,
        tabs: [...s.tabs, item],
        activeId: isOpen ? item.id : s.activeId,
      }))
    }
  }

  return { state, setActive, addToTabGroup }
}
