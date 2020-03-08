import React, { useState } from 'react'
import { Box, Flex, Button } from 'theme-ui'

import setBreakpoint from './set-breakpoint'

const defaults = [1, 2, 3].map(i => ({
  label: `Tab ${i}`,
  component: `Tab ${i}: Add text or a custom component`,
}))

const Tabs = React.forwardRef(
  (
    {
      items = defaults,
      nav = 'top',
      variant = 'tabs',
      stack = false,
      breakIndex = 0,
      ...props
    },
    ref
  ) => {
    const [show, set] = useState(items[0])
    const isVertical = nav !== 'left' && nav !== 'right' ? true : false

    return (
      <Box
        ref={ref}
        variant={variant}
        {...props}
        __css={{
          display: setBreakpoint(breakIndex, ['block', 'flex']),
          flexDirection: isVertical ? 'column' : null,
          flexWrap: 'wrap',
        }}>
        <Flex
          variant={`${variant}.navigation`}
          className="tabs-navigation"
          sx={{
            flexDirection: isVertical
              ? stack
                ? setBreakpoint(breakIndex, ['column', 'row'])
                : 'row'
              : stack
              ? 'column'
              : setBreakpoint(breakIndex, ['row', 'column']),
            overflowX: stack ? null : 'scroll',
            flexWrap: stack ? 'wrap' : 'nowrap',
            order: isVertical
              ? nav === 'top'
                ? 1
                : 2
              : nav === 'left'
              ? 1
              : 2,
          }}>
          {items.map((item, index) => (
            <Button
              key={index}
              title={item.label}
              variant={`${variant}.button`}
              className={
                show.label === item.label ? 'active tabs-button' : 'tabs-button'
              }
              onClick={e => set(items[index])}
              sx={{ flex: stack ? null : '1 0 auto', minWidth: 'min' }}>
              {item.label}
            </Button>
          ))}
        </Flex>
        <Box
          variant={`${variant}.container`}
          className="tabs-container"
          sx={{
            flex: 1,
            order: 1,
          }}>
          {show.component}
        </Box>
      </Box>
    )
  }
)

export default Tabs
