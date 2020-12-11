import * as React from 'react'
import { Flex, Button, setBreakpoint } from 'maker-ui'

import { useTabs } from './TabContext'

export interface TabStyleProps {
  settings: {
    isVertical?: boolean
    overflow?: 'stack' | 'scroll'
    navPosition?: string
    bpIndex?: number
  }
}

/**
 * The `TabNavigation` component generates a nav bar for the `TabGroup`.
 * It uses the `title` prop on a `TabPanel` component.
 *
 * @internal usage only
 */

export const TabNavigation = ({ settings }: TabStyleProps) => {
  const ref = React.useRef(null)
  const { state, setActive } = useTabs()

  React.useEffect(() => {
    /**
     * Create array of all tab ids that are not disabled
     */
    const tabIds = state.tabs.reduce((filtered, { disabled, id }) => {
      if (!disabled) {
        filtered.push(id)
      }
      return filtered
    }, [])

    function handleKeyDown(e) {
      if (tabIds.some(id => document.activeElement.id.includes(id))) {
        const index = tabIds.findIndex(i => i === state.activeId)

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
          default:
            return
        }
      }
    }

    window.addEventListener(`keydown`, handleKeyDown)
    return () => window.removeEventListener(`keydown`, handleKeyDown)
  }, [setActive, settings.isVertical, state])

  return (
    <Flex
      ref={ref}
      className="tab-navigation"
      role="tablist"
      sx={{
        variant: `${state.variant}.list`,
        ...getNavPosition({ settings }),
      }}>
      {state.tabs.map(item => (
        <Button
          key={item.id}
          role="tab"
          tabIndex={state.activeId === item.id ? 0 : -1}
          id={`control-${item.id}`}
          className={`tab-button${
            state.activeId === item.id ? ' active' : ''
          }${item.disabled && 'disabled'}`}
          //@ts-ignore
          disabled={item.disabled}
          title={typeof item.title === 'string' ? item.title : null}
          aria-controls={`panel-${item.panelId}`}
          aria-selected={state.activeId === item.id ? 'true' : 'false'}
          onClick={e => setActive(item.id)}
          sx={{ variant: `${state.variant}.button` }}>
          {item.title}
        </Button>
      ))}
    </Flex>
  )
}

TabNavigation.displayName = 'TabNavigation'

/**
 * Generate positioning and overflow CSS styles
 */

const getNavPosition = ({
  settings: { isVertical, navPosition, overflow = 'stack', bpIndex },
}: TabStyleProps): Object => {
  const shared = {
    overflowX: overflow === 'scroll' ? 'scroll' : null,
    flexWrap: overflow === 'stack' ? 'wrap' : 'nowrap',
    button: {
      flex:
        overflow === 'scroll' && setBreakpoint(bpIndex, ['1 0 auto', 'none']),
    },
  }

  return isVertical
    ? {
        flexDirection:
          overflow === 'stack'
            ? setBreakpoint(bpIndex, ['column', 'row'])
            : 'row',
        order: navPosition === 'top' ? 1 : 2,
        ...shared,
      }
    : {
        flexDirection:
          overflow === 'stack'
            ? 'column'
            : setBreakpoint(bpIndex, ['row', 'column']),
        order: navPosition === 'left' ? 1 : 2,
        ...shared,
      }
}
