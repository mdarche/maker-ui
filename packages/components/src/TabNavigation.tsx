import React from 'react'
import { Flex, Box, setBreakpoint } from 'maker-ui'

import { useTabs } from './TabGroup'

export interface TabStyleProps {
  settings: {
    isVertical?: boolean
    navPosition?: string
    navStack?: boolean
    navScroll?: boolean
    breakIndex?: number
  }
}

const getNavPosition = ({
  settings: { isVertical, navPosition, navStack, navScroll, breakIndex },
}: TabStyleProps): Object => {
  const shared = {
    overflowX: navScroll ? 'scroll' : null,
    flexWrap: navStack ? 'wrap' : 'nowrap',
    button: {
      flex: navScroll && setBreakpoint(breakIndex, ['1 0 auto', 'none']),
    },
  }

  if (isVertical) {
    return {
      flexDirection: navStack
        ? setBreakpoint(breakIndex, ['column', 'row'])
        : 'row',
      order: navPosition === 'top' ? 1 : 2,
      ...shared,
    }
  }

  return {
    flexDirection: navStack
      ? 'column'
      : setBreakpoint(breakIndex, ['row', 'column']),
    order: navPosition === 'left' ? 1 : 2,
    ...shared,
  }
}

/**
 * The `TabNavigation` component generates a nav bar for the `TabGroup`.
 * It uses the `title` prop on a nested `Tab` component.
 *
 * @internal use only
 */

export const TabNavigation = ({ settings }: TabStyleProps) => {
  const { state, setActive } = useTabs()

  return (
    <Flex
      variant={`${state.variant}.list`}
      className="tabs-list"
      role="tablist"
      sx={getNavPosition({ settings })}>
      {state.tabs.map(item => (
        <Box
          key={item.id}
          as="button"
          variant={`${state.variant}.button`}
          className={
            state.activeId === item.id
              ? 'active-tab tabs-button'
              : 'tabs-button'
          }
          role="tab"
          disabled={item.disabled}
          title={item.title}
          aria-controls={item.id}
          aria-selected={state.activeId === item.id ? 'true' : 'false'}
          onClick={e => setActive(item.id)}>
          {item.title}
        </Box>
      ))}
    </Flex>
  )
}
