import React from 'react'
import { Div, DivProps, setBreakpoint } from 'maker-ui'

import { TabContext } from './TabContext'
import { TabNavigation } from './TabNavigation'
import { TabPanel } from './TabPanel'

export interface TabGroupProps extends DivProps {
  navPosition?: string
  navStack?: boolean
  navScroll?: boolean
  breakIndex?: number
  renderInactive?: boolean
  children?: React.ReactElement | React.ReactElement[]
}

/**
 * The `Tabs` component is the root component for building a tabs container. It's a local
 * provider that contains the settings for responsive behaviors, positioning, and nested
 * `Tab` components.
 *
 * @todo - Allow users to inject non Tab components into tab canvas (npm website for example)
 * @todo - Expose the tab controls to outside components / actions (add optional event key)
 *
 * @see https://maker-ui.com/docs/components/tab
 */

export const Tabs = ({
  variant = 'tabs',
  navPosition = 'top',
  navStack = false,
  navScroll = true,
  breakIndex = 0,
  renderInactive = false,
  sx,
  children,
  ...props
}: TabGroupProps) => {
  const isVertical = !['left', 'right'].includes(navPosition) ? true : false

  return (
    <TabContext variant={variant} renderInactive={renderInactive}>
      <Div
        className="tabs"
        sx={{
          variant,
          display: setBreakpoint(breakIndex, ['block', 'flex']),
          flexDirection: isVertical ? 'column' : null,
          flexWrap: 'wrap',
          ...sx,
        }}
        {...props}>
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
      </Div>
    </TabContext>
  )
}

Tabs.Panel = TabPanel
