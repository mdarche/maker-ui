import * as React from 'react'
import { TabGroupProps } from './Tabs'

export interface TabContextProps {
  renderInactive?: TabGroupProps['renderInactive']
  activeKey: number | string
  children: React.ReactElement
  tabKeyNavigate: boolean
}

export interface TabItem {
  id: string
  panelId: string
  title: string | React.ReactElement
  disabled: boolean
}

export interface TabState extends Omit<TabContextProps, 'children'> {
  tabs: TabItem[]
}

const TabDataContext = React.createContext<{
  state: Partial<TabState>
  setState: React.Dispatch<React.SetStateAction<TabState>>
}>({ state: {}, setState: (b) => {} })

/**
 * The `TabContext` component is a Provider that handles all of the
 * settings for a `Tabs` component and its `TabPanel` children.
 *
 * @internal
 */
export const TabContext = ({
  activeKey,
  renderInactive = false,
  tabKeyNavigate,
  children,
}: TabContextProps) => {
  const [state, setState] = React.useState<TabState>({
    activeKey,
    tabs: [],
    renderInactive,
    tabKeyNavigate,
  })

  /**
   * Set the default open tab if none is specified
   */
  React.useEffect(() => {
    if (state.tabs.length && state.activeKey === 0) {
      // Get first tab that isn't disabled
      const tab = state.tabs.find((t) => !t.disabled)
      setState((state) => ({
        ...state,
        activeKey: tab ? tab.id : state.activeKey,
      }))
    }
  }, [state])

  /**
   * Watch props for a new activeKey (controlled by external variable)
   */
  React.useEffect(() => {
    if (state.activeKey !== 0) {
      // Make sure the tab isn't disabled
      const tab = state.tabs.find(
        ({ id, disabled }) => id === activeKey.toString() && !disabled
      )

      setState((state) => ({
        ...state,
        activeKey: tab ? activeKey.toString() : state.activeKey,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey])

  return (
    <TabDataContext.Provider value={{ state, setState }}>
      {children}
    </TabDataContext.Provider>
  )
}

TabContext.displayName = 'TabContext'

/**
 * Hook for registering tab panels and tracking the currently active tab.
 *
 * @internal
 */
export function useTabs() {
  const { state, setState } = React.useContext(TabDataContext)

  if (typeof state === undefined) {
    throw new Error('Tab must be used within a TabGroup component')
  }

  function setActive(id: string) {
    setState((state) => ({
      ...state,
      activeKey: id,
    }))
  }

  function addToTabGroup(item: TabItem, open: boolean) {
    const exists = state.tabs ? state.tabs.find((t) => t.id === item.id) : false

    if (!exists) {
      setState((s) => ({
        ...s,
        tabs: [...s.tabs, item],
        activeKey: open ? item.id : s.activeKey,
      }))
    }
  }

  function updateTab(id: string, item: TabItem) {
    const index = state.tabs?.findIndex((tab) => id === tab.id)

    if (index !== -1 && state.tabs?.length) {
      let newTabs = state.tabs
      newTabs[index as number] = item
      setState((s) => ({ ...s, tabs: newTabs }))
    }
  }

  return { state, setActive, addToTabGroup, updateTab }
}
