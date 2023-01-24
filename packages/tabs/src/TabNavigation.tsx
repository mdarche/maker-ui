import { cn } from '@maker-ui/utils'
import * as React from 'react'
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

  /**
   * Handle keyboard arrow controls
   */
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (
        tabs?.some(({ id }) =>
          document.activeElement?.id.includes(id.toString())
        )
      ) {
        const index = tabs.findIndex(({ id }) => id === activeKey)

        const next = index === tabs.length - 1 ? 0 : index + 1
        const prev = index === 0 ? tabs.length - 1 : index - 1

        switch (e.code) {
          case 'ArrowUp':
            if (!settings.isVertical) {
              e.preventDefault()
              return setActiveKey(prev)
            }
            return
          case 'ArrowDown':
            if (!settings.isVertical) {
              e.preventDefault()
              return setActiveKey(next)
            }
            return
          case 'ArrowRight':
            return setActiveKey(next)
          case 'ArrowLeft':
            return setActiveKey(next)
          case 'Tab':
            if (settings?.tabKeyNavigate) {
              if (e.shiftKey) {
                if (index === 0) return
                e.preventDefault()
                return setActiveKey(prev)
              } else {
                if (index === tabs.length - 1) return
                e.preventDefault()
                return setActiveKey(next)
              }
            }
            return
          default:
            return
        }
      }
    },
    [
      activeKey,
      setActiveKey,
      settings.isVertical,
      settings?.tabKeyNavigate,
      tabs,
    ]
  )

  React.useEffect(() => {
    window.addEventListener(`keydown`, handleKeyDown)
    return () => window.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

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
          tabIndex={activeKey === item.id ? 0 : -1}
          id={`control-${item.id}`}
          className={cn([
            'mkui-tab-btn',
            activeKey === item.id ? 'active' : undefined,
            item.disabled ? 'disabled' : undefined,
          ])}
          disabled={item.disabled}
          title={typeof item.title === 'string' ? item.title : undefined}
          aria-controls={`panel-${item.id}`}
          aria-selected={activeKey === item.id ? 'true' : 'false'}
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
        flexDirection: overflow === 'stack' ? ['column', 'row'] : 'row',
        order: navPosition === 'top' ? 1 : 2,
        ...shared,
      }
    : {
        flexDirection: overflow === 'stack' ? 'column' : ['row', 'column'],
        order: navPosition === 'left' ? 1 : 2,
        ...shared,
      }
}
