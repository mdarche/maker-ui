import * as React from 'react'
import { TabGroupProps } from './Tabs'

export interface TabContextProps {
  renderInactive?: TabGroupProps['renderInactive']
  activeKey: number | string
  children: React.ReactElement
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

const TabDataContext = React.createContext<Partial<TabState>>({})
const TabUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<TabState>>
>(() => {})

/**
 * The `TabContext` component is a Provider that handles all of the
 * settings for a `Tabs` component and its `TabPanel` children.
 *
 * @internal
 */

export const TabContext = ({
  activeKey,
  renderInactive = false,
  children,
}: TabContextProps) => {
  const [state, setState] = React.useState<TabState>({
    activeKey,
    tabs: [],
    renderInactive,
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
 * @internal
 */

export function useTabs() {
  const state: Partial<TabState> = React.useContext(TabDataContext)
  const setState = React.useContext(TabUpdateContext)

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
      setState((state) => ({
        ...state,
        tabs: [...state.tabs, item],
        activeKey: open ? item.id : state.activeKey,
      }))
    }
  }

  return { state, setActive, addToTabGroup }
}
