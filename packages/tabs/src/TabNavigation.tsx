import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { TabsProps } from './Tabs'

export interface TabNavigationProps {
  activeKey: string | number
  setActiveKey: (s: number) => void
  tabs?: {
    id: number
    title: string | React.ReactElement
    disabled?: boolean
  }[]
  settings: {
    tabKeyNavigate?: boolean
    isVertical?: boolean
    overflow?: TabsProps['overflow']
    navPosition?: TabsProps['navPosition']
    breakpoints?: (string | number)[]
    activeClass: string
  }
}

/**
 * The `TabNavigation` component generates a nav bar for the `TabGroup`.
 * It uses the `title` prop on a `TabPanel` component.
 *
 * @internal
 */
export const TabNavigation = ({
  activeKey,
  setActiveKey,
  tabs,
  settings,
}: TabNavigationProps) => {
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([])

  React.useEffect(() => {
    // Get active key index and focus to that button ref
    const index = tabs?.findIndex((t) => t.id === activeKey)
    if (typeof index === 'number') {
      buttonRefs.current[index]?.focus()
    }
  }, [activeKey, tabs])

  return (
    <div className="mkui-tab-navigation flex" role="tablist">
      {tabs?.map((item, i) => (
        <button
          ref={(el) => (buttonRefs.current[i] = el)}
          key={item.id}
          role="tab"
          type="button"
          tabIndex={activeKey === item.id ? undefined : -1}
          id={`tab-${item.id}`}
          className={cn([
            'mkui-tab-btn',
            activeKey === item.id ? settings.activeClass : undefined,
            item.disabled ? 'disabled' : undefined,
          ])}
          disabled={item.disabled}
          title={typeof item.title === 'string' ? item.title : undefined}
          aria-selected={activeKey === item.id ? 'true' : undefined}
          onClick={() => setActiveKey(item.id)}>
          {item.title}
        </button>
      ))}
    </div>
  )
}

TabNavigation.displayName = 'TabNavigation'

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
