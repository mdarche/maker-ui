import React, { useState, useContext, useEffect } from 'react'
import { Box } from 'theme-ui'
import { setBreakpoint } from 'maker-ui'

import TabNavigation from './TabNavigation'

const TabContext = React.createContext()
const TabUpdateContext = React.createContext()

const TabGroup = ({
  variant = 'tabs',
  navPosition = 'top',
  navStack = false,
  navScroll = true,
  breakIndex = 0,
  renderInactive = false,
  children,
  ...props
}) => {
  const [state, setState] = useState({
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
  const state = useContext(TabContext)
  const setState = useContext(TabUpdateContext)

  if (typeof state === undefined) {
    throw new Error('Tab must be used within a TabGroup component')
  }

  function setActive(id) {
    setState(s => ({
      ...s,
      activeId: id,
    }))
  }

  function addToTabGroup(item, isOpen) {
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

export default TabGroup
