import * as React from 'react'
import { Div, DivProps } from 'maker-ui'

import { TabContext } from './TabContext'
import { TabNavigation } from './TabNavigation'
import { TabPanel } from './TabPanel'

export interface TabGroupProps extends DivProps {
  navPosition?: string
  activeKey?: number | string
  overflow?: 'stack' | 'scroll'
  bpIndex?: number
  renderInactive?: boolean
  children?: React.ReactNode
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
  activeKey = 0,
  navPosition = 'top',
  overflow = 'stack',
  breakpoints,
  renderInactive = true,
  css,
  children,
  ...props
}: TabGroupProps) => {
  const isVertical = ['top', 'bottom'].includes(navPosition) ? true : false

  return (
    <TabContext activeKey={activeKey} renderInactive={renderInactive}>
      <Div
        className="tabs-container"
        breakpoints={breakpoints}
        css={{
          display: ['block', 'flex'],
          flexDirection: isVertical ? 'column' : undefined,
          flexWrap: 'wrap',
          ...(css as object),
        }}
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
      </Div>
    </TabContext>
  )
}

Tabs.displayName = 'Tabs'
Tabs.Panel = TabPanel
