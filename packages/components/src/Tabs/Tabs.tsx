import * as React from 'react'
import { Div, DivProps, setBreakpoint } from 'maker-ui'

import { TabContext } from './TabContext'
import { TabNavigation } from './TabNavigation'
import { TabPanel } from './TabPanel'
import { useFocus } from '../_hooks'

export interface TabGroupProps extends DivProps {
  navPosition?: string
  activeKey?: number | string
  overflow?: 'stack' | 'scroll'
  breakIndex?: number
  renderInactive?: boolean
  children?: React.ReactElement | React.ReactElement[]
}

/**
 * The `Tabs` component is the root component for building a tab container. It's a local
 * provider that contains the settings for responsive behaviors, positioning, and nested
 * `TabPanel` components.
 *
 * @see https://maker-ui.com/docs/components/tabs
 */

export const Tabs = ({
  variant = 'tabs',
  activeKey = 0,
  navPosition = 'top',
  overflow = 'stack',
  breakIndex = 0,
  renderInactive = true,
  sx,
  children,
  ...props
}: TabGroupProps) => {
  const isVertical = !['left', 'right'].includes(navPosition) ? true : false

  const tabsRef = React.useRef(null)

  useFocus({
    type: 'tabs',
    containerRef: tabsRef,
    trapFocus: true,
  })

  return (
    <TabContext
      variant={variant}
      activeKey={activeKey}
      renderInactive={renderInactive}>
      <Div
        ref={tabsRef}
        variant={variant}
        className="tabs-container"
        sx={{
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
            overflow,
            breakIndex,
          }}
        />
        {children}
      </Div>
    </TabContext>
  )
}

Tabs.Panel = TabPanel
