import * as React from 'react'
import { Div, DivProps, setBreakpoint } from 'maker-ui'

import { TabContext } from './TabContext'
import { TabNavigation } from './TabNavigation'
import { TabPanel } from './TabPanel'

export interface TabGroupProps extends DivProps {
  navPosition?: string
  activeKey?: number | string
  overflow?: 'stack' | 'scroll'
  bpIndex?: number
  renderInactive?: boolean
  children?: React.ReactElement | React.ReactElement[]
}

/**
 * The `Tabs` component is the root component for building a tab container. It's a local
 * provider that contains the settings for responsive behaviors, positioning, and nested
 * `TabPanel` components.
 *
 * @todo add preset styles
 *
 * @see https://maker-ui.com/docs/components/tabs
 */

export const Tabs = ({
  variant = 'tabs',
  activeKey = 0,
  navPosition = 'top',
  overflow = 'stack',
  bpIndex = 0,
  renderInactive = true,
  sx,
  children,
  ...props
}: TabGroupProps) => {
  const isVertical = ['top', 'bottom'].includes(navPosition) ? true : false

  return (
    <TabContext
      variant={variant}
      activeKey={activeKey}
      renderInactive={renderInactive}>
      <Div
        variant={variant}
        className="tabs-container"
        sx={{
          display: setBreakpoint(bpIndex, ['block', 'flex']),
          flexDirection: isVertical ? 'column' : null,
          flexWrap: 'wrap',
          ...sx,
        }}
        {...props}>
        <TabNavigation
          settings={{
            isVertical,
            navPosition,
            overflow,
            bpIndex,
          }}
        />
        {children}
      </Div>
    </TabContext>
  )
}

Tabs.displayName = 'Tabs'
Tabs.Panel = TabPanel
