import * as React from 'react'
import { cn, generateId, merge } from '@maker-ui/utils'
import { Style, type MakerCSS } from '@maker-ui/style'
import { useKeyboardShortcut } from '@maker-ui/hooks'

import { TabPanel } from './TabPanel'

export interface TabState {
  styleId: string
  activeKey: number
}

export interface TabsProps
  extends MakerCSS,
    React.HTMLAttributes<HTMLDivElement> {
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
  /** A custom class name to apply to the accordion button when it is active.
   * @default 'active'
   */
  activeClass?: string
  /** Nested `<Tab.Panel>` components. */
  children?: React.ReactElement[]
}

function validate(children: React.ReactNode) {
  React.Children.toArray(children).forEach((child: any) => {
    const type = child.props._type
    if (!type || type !== 'TabPanel') {
      throw new Error('Tabs must contain only Tabs.Panel components.')
    }
  })
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
  activeClass = 'active',
  className,
  css = {},
  mediaQuery,
  breakpoints,
  children,
  ...props
}: TabsProps) => {
  const [state, setState] = React.useState<TabState>({
    styleId: generateId(),
    activeKey: 0,
  })
  if (!children || (children && !Array.isArray(children))) {
    throw new Error('Tabs must contain at least two Tabs.Panel components.')
  } else {
    validate(children)
  }
  const tabs = children.map(({ props }, index) => ({
    id: index,
    title: props.title,
    disabled: props?.disabled,
    eventKey: props?.eventKey?.toString(),
    open: props?.open,
  }))
  const isVertical = ['top', 'bottom'].includes(navPosition) ? true : false
  const position = getNavPosition({ isVertical, navPosition, overflow })

  const navigate = (type: 'next' | 'prev') => {
    if (window === undefined) return
    const index = tabs.findIndex(({ id }) => id === state.activeKey)
    const next = index === tabs.length - 1 ? 0 : index + 1
    const prev = index === 0 ? tabs.length - 1 : index - 1
    const navigation = document.querySelectorAll('.mkui-tabs-navigation button')
    if (navigation.length) {
      ;(navigation[type === 'next' ? next : prev] as HTMLButtonElement)?.focus()
    }
    return setState((s) => ({ ...s, activeKey: type === 'prev' ? prev : next }))
  }

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

      setState((s) => ({ ...s, activeKey: tab ? tab.id : state.activeKey }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEventKey])

  const panels = renderInactive
    ? children
    : children
    ? [children[state.activeKey]]
    : []

  return (
    <div
      className={cn(['mkui-tabgroup flex', state.styleId, className])}
      {...props}>
      <Style
        root={state.styleId}
        breakpoints={breakpoints}
        mediaQuery={mediaQuery}
        css={merge(
          {
            flexDirection: isVertical ? 'column' : undefined,
            flexWrap: 'wrap',
            '.mkui-tab': {
              flex: 1,
              order: 1,
              display: renderInactive ? 'none' : undefined,
              [`&.${activeClass}`]: renderInactive
                ? {
                    display: 'block',
                  }
                : undefined,
            },
            '[role="tablist"]': {
              ...position,
            },
          },
          css
        )}
      />
      <div className="mkui-tabs-navigation flex" role="tablist">
        {tabs.map((item) => (
          <TabButton
            key={item.id}
            tab={item}
            activeKey={state.activeKey}
            setActiveKey={(k) => setState((s) => ({ ...s, activeKey: k }))}
            navigate={navigate}
            settings={{
              isVertical,
              activeClass,
            }}
          />
        ))}
      </div>
      {panels?.map(
        (
          { props: { title, className, eventKey, open, disabled, ...rest } },
          index
        ) => (
          <div
            id={`tabpanel-${index}`}
            key={index}
            className={cn([
              'mkui-tab',
              state.activeKey === index ? activeClass : undefined,
              className,
            ])}
            role="tabpanel"
            hidden={state.activeKey !== index}
            tabIndex={-1}
            aria-labelledby={`tab-${index}`}
            {...rest}
          />
        )
      )}
    </div>
  )
}

interface TabButtonProps {
  activeKey: string | number
  setActiveKey: (s: number) => void
  navigate: (type: 'next' | 'prev') => void
  tab: {
    id: number
    title: string | React.ReactElement
    disabled?: boolean
  }
  settings: {
    isVertical?: boolean
    activeClass: string
  }
}

const TabButton = ({
  activeKey,
  setActiveKey,
  navigate,
  tab,
  settings,
}: TabButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const isActive = activeKey === tab.id
  // Accessibility shortcuts
  useKeyboardShortcut(
    [
      {
        key: 'ArrowRight',
        callback: () => navigate('next'),
      },
      {
        key: 'ArrowLeft',
        callback: () => navigate('prev'),
      },
    ],
    ref
  )

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      tabIndex={activeKey === tab.id ? undefined : -1}
      id={`tab-${tab.id}`}
      className={cn([
        'mkui-tab-btn',
        isActive ? settings.activeClass : undefined,
        tab.disabled ? 'disabled' : undefined,
      ])}
      disabled={tab.disabled}
      title={typeof tab.title === 'string' ? tab.title : undefined}
      aria-selected={isActive ? 'true' : undefined}
      onClick={() => setActiveKey(tab.id)}>
      {tab.title}
    </button>
  )
}

Tabs.displayName = 'Tabs'
Tabs.Panel = TabPanel

interface PositionProps {
  isVertical?: boolean
  overflow?: TabsProps['overflow']
  navPosition?: TabsProps['navPosition']
}
/**
 * Generate positioning and overflow CSS styles
 */
export const getNavPosition = ({
  isVertical,
  navPosition,
  overflow,
}: PositionProps): object => {
  const shared = {
    overflowX: overflow === 'scroll' ? 'scroll' : undefined,
    flexWrap: overflow === 'stack' ? 'wrap' : 'nowrap',
    button:
      overflow === 'scroll'
        ? {
            flex: ['1 0 auto', 'none'],
          }
        : undefined,
  }

  return isVertical
    ? {
        ...shared,
        flexDirection: overflow === 'stack' ? ['column', 'row'] : 'row',
        order: navPosition === 'top' ? 1 : 2,
      }
    : {
        ...shared,
        flexDirection: overflow === 'stack' ? 'column' : ['row', 'column'],
        order: navPosition === 'left' ? 1 : 2,
      }
}
