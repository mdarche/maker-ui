import * as React from 'react'
import { Div, DivProps, generateId, setClassName } from 'maker-ui'

import { useTabs, TabItem } from './TabContext'

export interface TabPanelProps extends Omit<DivProps, 'title'> {
  title: string | React.ReactElement
  eventKey?: number | string
  open?: boolean
  disabled?: boolean
}

/**
 * The `Tab` component is a direct child of `TabGroup` and is used to wrap custom tab content.
 *
 * @see https://maker-ui.com/docs/components/tabs
 */

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  (
    {
      title,
      eventKey,
      className,
      open = false,
      disabled = false,
      css,
      ...props
    },
    ref
  ) => {
    const [id] = React.useState(() =>
      eventKey ? eventKey.toString() : generateId()
    )
    const [panelId] = React.useState(generateId())

    const {
      state: { activeKey, renderInactive },
      addToTabGroup,
    } = useTabs()
    const tabItem: TabItem = { id, panelId, title, disabled }

    React.useEffect(() => {
      addToTabGroup(tabItem, open)
    }, [addToTabGroup, tabItem, open])

    return renderInactive || activeKey === id ? (
      <Div
        ref={ref}
        role="tabpanel"
        id={`panel-${panelId}`}
        aria-labelledby={`control-${panelId}`}
        className={setClassName('tab-panel', className)}
        css={{
          flex: 1,
          order: 1,
          display: renderInactive && activeKey !== id ? 'none' : undefined,
          ...(css as object),
        }}
        {...props}
      />
    ) : null
  }
)

TabPanel.displayName = 'TabPanel'
