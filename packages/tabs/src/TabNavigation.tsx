import * as React from 'react'
import { TabsProps, useTabs } from './Tabs'

export interface TabNavigationProps {
  settings: {
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
export const TabNavigation = ({ settings }: TabNavigationProps) => {
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const { state, setActive } = useTabs({})
  const [tabIds, setTabIds] = React.useState<string[]>([])

  /**
   * Create array of all tab ids that are not disabled
   */
  React.useEffect(() => {
    const ids = state.tabs?.reduce((filtered: string[], { disabled, id }) => {
      if (!disabled) {
        filtered.push(id)
      }
      return filtered
    }, [])

    if (ids) {
      setTabIds(ids)
    }
  }, [state.tabs])

  /**
   * Handle keyboard arrow controls
   */
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (tabIds.some((id) => document.activeElement?.id.includes(id))) {
        const index = tabIds.findIndex((i) => i === state.activeKey)

        const next = index === tabIds.length - 1 ? 0 : index + 1
        const prev = index === 0 ? tabIds.length - 1 : index - 1

        switch (e.code) {
          case 'ArrowUp':
            if (!settings.isVertical) {
              e.preventDefault()
              return setActive(tabIds[prev])
            }
            return
          case 'ArrowDown':
            if (!settings.isVertical) {
              e.preventDefault()
              return setActive(tabIds[next])
            }
            return
          case 'ArrowRight':
            return setActive(tabIds[next])
          case 'ArrowLeft':
            return setActive(tabIds[prev])
          case 'Tab':
            if (state.tabKeyNavigate) {
              if (e.shiftKey) {
                if (index === 0) return
                e.preventDefault()
                return setActive(tabIds[prev])
              } else {
                if (index === tabIds.length - 1) return
                e.preventDefault()
                return setActive(tabIds[next])
              }
            }
            return
          default:
            return
        }
      }
    },
    [
      setActive,
      settings.isVertical,
      state.activeKey,
      state.tabKeyNavigate,
      tabIds,
    ]
  )

  React.useEffect(() => {
    window.addEventListener(`keydown`, handleKeyDown)
    return () => window.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

  React.useEffect(() => {
    // Get active key index and focus to that button ref
    const index = state.tabs?.findIndex((t) => t.id === state.activeKey)
    if (typeof index === 'number') {
      buttonRefs.current[index]?.focus()
    }
  }, [state.activeKey, state.tabs])

  return (
    <div className="mkui_tab_navigation flex" role="tablist">
      {state.tabs?.map((item, i) => (
        <button
          ref={(el) => (buttonRefs.current[i] = el)}
          key={item.id}
          role="tab"
          type="button"
          tabIndex={state.activeKey === item.id ? 0 : -1}
          id={`control-${item.id}`}
          className={`mkui_tab_btn ${
            state.activeKey === item.id ? 'active' : ''
          }${item.disabled ? 'disabled' : ''}`}
          disabled={item.disabled}
          title={typeof item.title === 'string' ? item.title : undefined}
          aria-controls={`panel-${item.id}`}
          aria-selected={state.activeKey === item.id ? 'true' : 'false'}
          onClick={() => setActive(item.id)}>
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
