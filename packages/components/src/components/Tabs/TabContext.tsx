import * as React from 'react'

const TabDataContext = React.createContext(null)
const TabUpdateContext = React.createContext(null)

export interface TabContextProps {
  renderInactive?: boolean
  activeKey?: number | string
  variant: string | string[]
  children?: React.ReactElement
}

export interface TabState {
  activeId: string | number
  tabs: {
    id: string
    panelId: string
    title: string | React.ReactElement
    disabled: boolean
  }[]
  variant: string | string[]
  renderInactive: boolean
}

/**
 * The `TabContext` component is a Context Provider handles all of the
 * settings for a `Tabs` component and all of its `TabPanel` children.
 *
 * @internal usage only
 */

export const TabContext = ({
  variant = 'tabs',
  activeKey,
  renderInactive = false,
  children,
}: TabContextProps) => {
  const [state, setState] = React.useState<TabState>({
    activeId: activeKey,
    tabs: [],
    variant,
    renderInactive,
  })

  React.useEffect(() => {
    if (activeKey === 0) {
      setState(state => ({ ...state, activeId: state.tabs[0].id }))
    } else {
      setState(state => ({ ...state, activeId: activeKey.toString() }))
    }
  }, [activeKey])

  return (
    <TabDataContext.Provider value={state}>
      <TabUpdateContext.Provider value={setState}>
        {children}
      </TabUpdateContext.Provider>
    </TabDataContext.Provider>
  )
}

TabContext.displayName = 'TabContext'

/**
 * Hook for registering tab panels and tracking the currently active tab.
 *
 * @internal usage only
 */

export function useTabs() {
  const state: TabState = React.useContext(TabDataContext)
  const setState = React.useContext(TabUpdateContext)

  if (typeof state === undefined) {
    throw new Error('Tab must be used within a TabGroup component')
  }

  function setActive(id: string): void {
    setState(state => ({
      ...state,
      activeId: id,
    }))
  }

  function addToTabGroup(item, isOpen): void {
    const exists = state.tabs ? state.tabs.find(t => t.id === item.id) : false

    if (!exists) {
      setState(state => ({
        ...state,
        tabs: [...state.tabs, item],
        activeId: isOpen ? item.id : state.activeId,
      }))
    }
  }

  return { state, setActive, addToTabGroup }
}
