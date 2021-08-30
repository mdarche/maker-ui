import * as React from 'react'
import { Div, DivProps, generateId, mergeSelectors } from 'maker-ui'

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
 * @link https://maker-ui.com/docs/elements/tabs
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabItem, open])

    return renderInactive || activeKey === id ? (
      <Div
        ref={ref}
        role="tabpanel"
        id={`panel-${panelId}`}
        aria-labelledby={`control-${panelId}`}
        className={mergeSelectors([
          `tab-panel${activeKey === id ? ' active' : ''}`,
          className,
        ])}
        css={{
          flex: 1,
          order: 1,
          display: 'none',
          '&.active': {
            display: 'block',
          },
          ...(css as object),
        }}
        {...props}
      />
    ) : null
  }
)

TabPanel.displayName = 'TabPanel'
