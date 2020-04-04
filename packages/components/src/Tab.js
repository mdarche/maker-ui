import React, { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { generateId } from 'maker-ui'

import { useTabs } from './TabGroup'

const Tab = React.forwardRef(
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

export default Tab
