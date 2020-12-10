import * as React from 'react'
import { Flex, Button, setBreakpoint } from 'maker-ui'

import { useTabs } from './TabContext'
import { useFocus } from '../../hooks'

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

  useFocus({
    type: 'tabs',
    containerRef: ref,
    trapFocus: true,
  })

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
