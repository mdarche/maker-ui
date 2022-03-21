import * as React from 'react'
import { Div, DivProps, ButtonProps } from '@maker-ui/primitives'
import { mergeSelectors } from '@maker-ui/utils'

import { TabContext } from './TabContext'
import { TabNavigation } from './TabNavigation'
import { TabPanel } from './TabPanel'

export interface TabGroupProps extends DivProps {
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
  /** An optional button `type` prop that can be used to prevent or activate form submissions
   * if the tabs are used inside of a form element.
   * @default "button"
   */
  buttonType?: ButtonProps['type']
  /** Nested `<Tab.Panel>` or auxiliary components. */
  children?: React.ReactNode
}

/**
 * The `Tabs` component is the root component for building a tab container. It's a local
 * provider that contains the settings for responsive behaviors, positioning, and nested
 * `TabPanel` components.
 *
 * @todo add preset styles
 *
 * @link https://maker-ui.com/docs/elements/tabs
 */

export const Tabs = ({
  activeKey = 0,
  navPosition = 'top',
  overflow = 'stack',
  breakpoints,
  renderInactive = true,
  buttonType = 'button',
  className,
  css,
  children,
  ...props
}: TabGroupProps) => {
  const isVertical = ['top', 'bottom'].includes(navPosition) ? true : false

  return (
    <TabContext activeKey={activeKey} renderInactive={renderInactive}>
      <Div
        className={mergeSelectors(['tabs-container', className])}
        breakpoints={breakpoints}
        css={{
          display: ['block', 'flex'],
          flexDirection: isVertical ? 'column' : undefined,
          flexWrap: 'wrap',
          ...(css as object),
        }}
        {...props}>
        <TabNavigation
          buttonType={buttonType}
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
