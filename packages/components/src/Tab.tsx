import React, { useState, useEffect } from 'react'
import { Box, BasicBoxProps, generateId } from 'maker-ui'

import { useTabs } from './TabGroup'

export interface TabProps extends BasicBoxProps {
  title?: string
  open?: boolean
  disabled?: boolean
}

/**
 * The `Tab` component is a direct child of `TabGroup` and is used to wrap custom tab content.
 *
 * @see https://maker-ui.com/docs/components/tab
 */

export const Tab = React.forwardRef<HTMLElement, TabProps>(
  ({ title, open = false, disabled = false, ...props }, ref) => {
    const [id] = useState(generateId())
    const {
      state: { variant, activeId, renderInactive },
      addToTabGroup,
    } = useTabs()
    const tabItem = { id, title, disabled }

    useEffect(() => {
      addToTabGroup(tabItem, open)
    }, [addToTabGroup, tabItem, open])

    return renderInactive || activeId === id ? (
      <Box
        ref={ref}
        id={id}
        className="tabs-panel"
        tabIndex="0"
        role="tabpanel"
        variant={`${variant}.panel`}
        __css={{
          flex: 1,
          order: 1,
          display: renderInactive && activeId !== id ? 'none' : undefined,
        }}
        {...props}
      />
    ) : null
  }
)
