import React, { useState, useContext, useEffect } from 'react'
import { Box, BasicBoxProps, setBreakpoint } from 'maker-ui'

import { TabNavigation } from './TabNavigation'

const TabContext = React.createContext(null)
const TabUpdateContext = React.createContext(null)

export interface TabGroupProps extends BasicBoxProps {
  navPosition?: string
  navStack?: boolean
  navScroll?: boolean
  breakIndex?: number
  renderInactive?: boolean
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

export const TabGroup = ({
  variant = 'tabs',
  navPosition = 'top',
  navStack = false,
  navScroll = true,
  breakIndex = 0,
  renderInactive = false,
  children,
  ...props
}: TabGroupProps) => {
  const [state, setState] = useState<TabState>({
    activeId: 0,
    tabs: [],
    variant,
    renderInactive,
  })
  const isVertical = !['left', 'right'].includes(navPosition) ? true : false

  useEffect(() => {
    if (state.activeId === 0 && state.tabs.length) {
      setState(s => ({ ...s, activeId: s.tabs[0].id }))
    }
  }, [state])

  return (
    <TabContext.Provider value={state}>
      <TabUpdateContext.Provider value={setState}>
        <Box
          variant={variant}
          className="tabs"
          {...props}
          __css={{
            display: setBreakpoint(breakIndex, ['block', 'flex']),
            flexDirection: isVertical ? 'column' : null,
            flexWrap: 'wrap',
          }}>
          <TabNavigation
            settings={{
              isVertical,
              navPosition,
              navStack,
              navScroll,
              breakIndex,
            }}
          />
          {children}
        </Box>
      </TabUpdateContext.Provider>
    </TabContext.Provider>
  )
}

export function useTabs() {
  const state: TabState = useContext(TabContext)
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
