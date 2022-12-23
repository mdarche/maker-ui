import * as React from 'react'
import { cn, generateId, merge } from '@maker-ui/utils'
import { Style, type ResponsiveCSS, type Breakpoints } from '@maker-ui/style'

import { TabNavigation, getNavPosition } from './TabNavigation'
import { TabPanel } from './TabPanel'

export interface TabItem {
  id: string
  /** A title string or custom React element that will be used as the Tab Button for this panel. */
  title?: string | React.ReactElement
  /** A unique key that can toggle the tab open and close from an external component. */
  eventKey?: number | string
  /** If true, the tab will be open by default
   * @default false
   */
  open?: boolean
  /** If true, the tab will be disabled so users cannot activate it.
   * @default false
   */
  disabled?: boolean
}

export interface TabState {
  styleId: string
  tabs: TabItem[]
  renderInactive?: TabsProps['renderInactive']
  activeKey: number | string
  tabKeyNavigate: boolean
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  css?: ResponsiveCSS
  breakpoints?: Breakpoints
  /** The position of the tab buttons relative to the tab container.
   * @default "top"
   */
  navPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** The currently active tab key if tabs are controlled by an external or parent component.
   * Make sure the key exists as an `eventKey` prop on a nested `<Tab.Panel>`.
   */
  activeKey?: number | string
  /** Determines how to handle the tab navigation buttons on mobile.
   * @default "stack"
   */
  overflow?: 'stack' | 'scroll'
  /** If false, all inactive tab panels will be removed from the DOM instead of hidden and
   * invisible with CSS.
   * @default true
   */
  renderInactive?: boolean
  /** If true, the tab key and tab key + shift will navigate the tab buttons like the arrow keys.
   * @default false
   */
  tabKeyNavigate?: boolean
  /** Nested `<Tab.Panel>` or auxiliary components. */
  children?: React.ReactNode
}

const TabContext = React.createContext<{
  state: Partial<TabState>
  setState: React.Dispatch<React.SetStateAction<TabState>>
}>({ state: {}, setState: (b) => {} })

/**
 * The root component for building a tab container. The Tabs wrapper component contains
 * all settings for responsive behaviors, keyboard navigation, positioning, and nested
 * `TabPanel` components.
 *
 * @todo add preset styles
 *
 * @link https://maker-ui.com/docs/components/tabs
 */
export const Tabs = ({
  activeKey = 0,
  navPosition = 'top',
  overflow = 'stack',
  renderInactive = true,
  tabKeyNavigate = false,
  className,
  css = {},
  breakpoints,
  children,
  ...props
}: TabsProps) => {
  const [state, setState] = React.useState<TabState>({
    styleId: generateId(),
    activeKey,
    tabs: [],
    renderInactive,
    tabKeyNavigate,
  })
  const isVertical = ['top', 'bottom'].includes(navPosition) ? true : false
  const position = getNavPosition({ isVertical, navPosition, overflow })

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
    <TabContext.Provider value={{ state, setState }}>
      <Style
        root={state.styleId}
        breakpoints={breakpoints}
        css={merge(
          {
            flexDirection: isVertical ? 'column' : undefined,
            flexWrap: 'wrap',
            '.mkui_tab': {
              flex: 1,
              order: 1,
              display: 'none',
              '&.active': {
                display: 'block',
              },
            },
            '.mkui_tab_btn': {
              ...position,
            },
          },
          css
        )}
      />
      <div
        className={cn(['mkui_tabgroup', state.styleId, className])}
        {...props}>
        <TabNavigation
          settings={{
            isVertical,
            navPosition,
            overflow,
            breakpoints,
          }}
        />
        {children}
      </div>
    </TabContext.Provider>
  )
}

Tabs.displayName = 'Tabs'
Tabs.Panel = TabPanel

/**
 * Hook for registering tab panels and tracking the currently active tab.
 *
 * @internal
 */
export function useTabs(props?: Partial<TabItem>) {
  const { eventKey, title, disabled, open } = props || {}
  const id = eventKey ? eventKey.toString() : generateId()
  const { state, setState } = React.useContext(TabContext)

  if (typeof state === undefined) {
    throw new Error('Tab must be used within a TabGroup component')
  }

  React.useEffect(() => {
    const exists = state.tabs ? state.tabs.find((t) => t.id === id) : false

    if (!exists) {
      // setState((s) => ({
      //   ...s,
      //   tabs: [...s.tabs, { id, title, disabled, open }],
      //   activeKey: open ? id : s.activeKey,
      // }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setActive(id: string) {
    setState((state) => ({
      ...state,
      activeKey: id,
    }))
  }

  // function addToTabGroup(item: TabItem, open: boolean) {
  //   const exists = state.tabs ? state.tabs.find((t) => t.id === item.id) : false
  //   console.log('Calling this function', state.tabs, item)

  //   if (!exists) {
  //     setState((s) => ({
  //       ...s,
  //       tabs: [...s.tabs, item],
  //       activeKey: open ? item.id : s.activeKey,
  //     }))
  //   }
  // }

  // function updateTab(id: string, item: TabItem) {
  //   const index = state.tabs?.findIndex((tab) => id === tab.id)

  //   if (index !== -1 && state.tabs?.length) {
  //     let newTabs = state.tabs
  //     newTabs[index as number] = item
  //     setState((s) => ({ ...s, tabs: newTabs }))
  //   }
  // }

  return { id, state, setActive }
}
