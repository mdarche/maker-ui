import * as React from 'react'
import { Flex, Button, setBreakpoint } from 'maker-ui'

import { useTabs } from './TabContext'
import { useFocus } from '../_hooks'

export interface TabStyleProps {
  settings: {
    isVertical?: boolean
    overflow?: 'stack' | 'scroll'
    navPosition?: string
    breakIndex?: number
  }
}

const getNavPosition = ({
  settings: { isVertical, navPosition, overflow = 'stack', breakIndex },
}: TabStyleProps): Object => {
  const shared = {
    overflowX: overflow === 'scroll' ? 'scroll' : null,
    flexWrap: overflow === 'stack' ? 'wrap' : 'nowrap',
    button: {
      flex:
        overflow === 'scroll' &&
        setBreakpoint(breakIndex, ['1 0 auto', 'none']),
    },
  }

  if (isVertical) {
    return {
      flexDirection:
        overflow === 'stack'
          ? setBreakpoint(breakIndex, ['column', 'row'])
          : 'row',
      order: navPosition === 'top' ? 1 : 2,
      ...shared,
    }
  }

  return {
    flexDirection:
      overflow === 'stack'
        ? 'column'
        : setBreakpoint(breakIndex, ['row', 'column']),
    order: navPosition === 'left' ? 1 : 2,
    ...shared,
  }
}

/**
 * The `TabNavigation` component generates a nav bar for the `TabGroup`.
 * It uses the `title` prop on a `TabPanel` component.
 *
 * @internal usage only
 */

export const TabNavigation = ({ settings }: TabStyleProps) => {
  const [ref, setRef] = React.useState(null)
  const { state, setActive } = useTabs()

  if (ref) {
    const elements = ref.querySelectorAll('button')
    console.log('new elements are', elements)
    // useFocus({
    //   type: 'tabs',
    //   containerRef: ref,
    //   trapFocus: true,
    // })
  }

  // useFocus({
  //   type: 'tabs',
  //   containerRef: ref,
  //   trapFocus: true,
  // })

  return (
    <Flex
      ref={newRef => setRef(newRef)}
      className="tab-navigation"
      role="tablist"
      sx={{
        variant: `${state.variant}.list`,
        ...getNavPosition({ settings }),
      }}>
      <button>Test button</button>
      {state.tabs.map(item => (
        <Button
          key={item.id}
          role="tab"
          // tabIndex={state.activeId === item.id ? 0 : -1}
          className={`tab-button${state.activeId === item.id ? ' active' : ''}`}
          // @ts-ignore
          disabled={item.disabled}
          title={typeof item.title === 'string' ? item.title : null}
          aria-controls={item.panelId}
          aria-selected={state.activeId === item.id ? 'true' : 'false'}
          onClick={e => setActive(item.id)}
          sx={{ variant: `${state.variant}.button` }}>
          {item.title}
        </Button>
      ))}
    </Flex>
  )
}
