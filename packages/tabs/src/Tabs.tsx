import * as React from 'react'
import { cn, generateId, merge } from '@maker-ui/utils'
import { Style, type ResponsiveCSS, type Breakpoints } from '@maker-ui/style'

import { TabNavigation, getNavPosition } from './TabNavigation'
import { TabPanel } from './TabPanel'

export interface TabState {
  styleId: string
  activeKey: number
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
  activeEventKey?: number | string
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
  children?: React.ReactElement[]
}

/**
 * The root component for building a tab container. The Tabs wrapper component contains
 * all settings for responsive behaviors, keyboard navigation, positioning, and nested
 * `TabPanel` components.
 *
 * @link https://maker-ui.com/docs/components/tabs
 *
 */
export const Tabs = ({
  activeEventKey,
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
    activeKey: 0,
  })
  const tabs = children
    ? children.map(({ props }, index) => ({
        id: index,
        title: props.title,
        disabled: props?.disabled,
        eventKey: props?.eventKey?.toString(),
        open: props?.open,
      }))
    : []
  const isVertical = ['top', 'bottom'].includes(navPosition) ? true : false
  const position = getNavPosition({ isVertical, navPosition, overflow })

  /**
   * Set the default open tab if none is specified
   */
  React.useEffect(() => {
    if (tabs.length && !activeEventKey) {
      // Get first tab that's marked as open
      const opened = tabs.find((t) => t.open)
      // Get first tab that's not disabled
      const notDisabled = tabs.find((t) => !t.disabled)

      setState((s) => ({
        ...s,
        activeKey: opened
          ? opened.id
          : notDisabled
          ? notDisabled.id
          : state.activeKey,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Watch props for a new activeKey (controlled by external components)
   */
  React.useEffect(() => {
    if (activeEventKey) {
      // Make sure the tab isn't disabled
      const tab = tabs.find(
        ({ eventKey, disabled }) =>
          eventKey === activeEventKey.toString() && !disabled
      )

      setState((s) => ({
        ...s,
        activeKey: tab ? tab.id : state.activeKey,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEventKey])

  const panels = renderInactive
    ? children
    : children
    ? [children[state.activeKey]]
    : []

  return (
    <>
      <Style
        root={state.styleId}
        breakpoints={breakpoints}
        css={merge(
          {
            flexDirection: isVertical ? 'column' : undefined,
            flexWrap: 'wrap',
            '.mkui-tab': {
              flex: 1,
              order: 1,
              display: renderInactive ? 'none' : undefined,
              '&.active': renderInactive
                ? {
                    display: 'block',
                  }
                : undefined,
            },
            '.mkui-tab-navigation': {
              ...position,
            },
          },
          css
        )}
      />
      <div
        className={cn(['mkui-tabgroup flex', state.styleId, className])}
        {...props}>
        <TabNavigation
          activeKey={state.activeKey}
          setActiveKey={(k) => setState((s) => ({ ...s, activeKey: k }))}
          tabs={tabs}
          settings={{
            isVertical,
            navPosition,
            overflow,
            breakpoints,
            tabKeyNavigate,
          }}
        />
        {panels?.map(
          (
            { props: { className, title, eventKey, open, disabled, ...rest } },
            index
          ) => (
            <div
              key={index}
              className={cn([
                'mkui-tab',
                state.activeKey === index ? 'active' : undefined,
                className,
              ])}
              role="tabpanel"
              id={`panel-${index}`}
              aria-labelledby={`control-${index}`}
              {...rest}
            />
          )
        )}
      </div>
    </>
  )
}

Tabs.displayName = 'Tabs'
Tabs.Panel = TabPanel
