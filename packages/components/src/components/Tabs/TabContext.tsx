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
 * The `TabContext` component is a Context Provider handles all of the
 * settings for a `Tabs` component and all of its `TabPanel` children.
 *
 * @internal usage only
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

  React.useEffect(() => {
    if (activeKey === 0) {
      setState(state => ({ ...state, activeKey: state.tabs[0].id }))
    } else {
      setState(state => ({ ...state, activeKey: activeKey.toString() }))
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
  const state: Partial<TabState> = React.useContext(TabDataContext)
  const setState = React.useContext(TabUpdateContext)

  if (typeof state === undefined) {
    throw new Error('Tab must be used within a TabGroup component')
  }

  function setActive(id: string) {
    setState(state => ({
      ...state,
      activeKey: id,
    }))
  }

  function addToTabGroup(item: TabItem, isOpen: boolean) {
    const exists = state.tabs ? state.tabs.find(t => t.id === item.id) : false

    if (!exists) {
      setState(state => ({
        ...state,
        tabs: [...state.tabs, item],
        activeKey: isOpen ? item.id : state.activeKey,
      }))
    }
  }

  return { state, setActive, addToTabGroup }
}
