import * as React from 'react'
import { Flex, Button, useMediaQuery } from 'maker-ui'

import { useTabs } from './TabContext'

export interface TabStyleProps {
  settings: {
    isVertical?: boolean
    overflow?: 'stack' | 'scroll'
    navPosition?: string
    bpIndex?: number
  }
  mediaQuery?: (
    key: string,
    rule: (string | number)[],
    bp: number | string
  ) => object
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
  const [tabIds, setTabIds] = React.useState([])
  const { mediaQuery } = useMediaQuery()

  /**
   * Create array of all tab ids that are not disabled
   */

  React.useEffect(() => {
    const ids = state.tabs.reduce((filtered, { disabled, id }) => {
      if (!disabled) {
        filtered.push(id)
      }
      return filtered
    }, [])

    setTabIds(ids)
  }, [state.tabs])

  /**
   * Handle keyboard arrow controls
   */

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (tabIds.some(id => document.activeElement.id.includes(id))) {
        const index = tabIds.findIndex(i => i === state.activeKey)

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
    },
    [setActive, settings.isVertical, state.activeKey, tabIds]
  )

  React.useEffect(() => {
    window.addEventListener(`keydown`, handleKeyDown)
    return () => window.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

  return (
    <Flex
      ref={ref}
      className="tab-navigation"
      role="tablist"
      // @ts-ignore
      css={{
        ...getNavPosition({ settings, mediaQuery }),
      }}>
      {state.tabs.map(item => (
        <Button
          key={item.id}
          role="tab"
          tabIndex={state.activeKey === item.id ? 0 : -1}
          id={`control-${item.id}`}
          className={`tab-button${
            state.activeKey === item.id ? ' active' : ''
          }${item.disabled && 'disabled'}`}
          //@ts-ignore
          disabled={item.disabled}
          title={typeof item.title === 'string' ? item.title : null}
          aria-controls={`panel-${item.panelId}`}
          aria-selected={state.activeKey === item.id ? 'true' : 'false'}
          onClick={e => setActive(item.id)}>
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
  mediaQuery,
}: TabStyleProps): Object => {
  const shared = {
    overflowX: overflow === 'scroll' ? 'scroll' : null,
    flexWrap: overflow === 'stack' ? 'wrap' : 'nowrap',
    button: overflow === 'scroll' && {
      ...mediaQuery('flex', ['1 0 auto', 'none'], bpIndex),
    },
  }

  return isVertical
    ? {
        ...mediaQuery(
          'flexDirection',
          overflow === 'stack' ? ['column', 'row'] : ['row'],
          bpIndex
        ),
        order: navPosition === 'top' ? 1 : 2,
        ...shared,
      }
    : {
        ...mediaQuery(
          'flexDirection',
          overflow === 'stack' ? ['column'] : ['row', 'column'],
          bpIndex
        ),
        // flexDirection:
        //   overflow === 'stack'
        //     ? 'column'
        //     : setBreakpoint(bpIndex, ['row', 'column']),
        order: navPosition === 'left' ? 1 : 2,
        ...shared,
      }
}
