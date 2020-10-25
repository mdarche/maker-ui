import React, { useState, useEffect } from 'react'
import { Div, DivProps, generateId } from 'maker-ui'

import { useTabs } from './TabContext'

export interface TabPanelProps extends DivProps {
  title?: string
  open?: boolean
  disabled?: boolean
}

/**
 * The `Tab` component is a direct child of `TabGroup` and is used to wrap custom tab content.
 *
 * @see https://maker-ui.com/docs/components/tab
 */

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ title, open = false, disabled = false, sx, ...props }, ref) => {
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
      <Div
        ref={ref}
        id={id}
        className="tabs-panel"
        tabIndex={0}
        role="tabpanel"
        sx={{
          variant: `${variant}.panel`,
          flex: 1,
          order: 1,
          display: renderInactive && activeId !== id ? 'none' : undefined,
          ...sx,
        }}
        {...props}
      />
    ) : null
  }
)
