import * as React from 'react'
import { Div, DivProps } from '@maker-ui/primitives'
import { generateId, mergeSelectors } from '@maker-ui/utils'

import { useTabs, TabItem } from './TabContext'

export interface TabPanelProps extends Omit<DivProps, 'title'> {
  /** A title string or custom React element that will be used as the Tab Button for this panel. */
  title: string | React.ReactElement
  /** A unique key that can toggle the tab open and close from an external component. */
  eventKey?: number | string
  /** If true, the tab will be open by default
   * @default false
   */
  open?: boolean
  /** If true, the tab will be disabled so users cannot activate it.
   * @default false
   */
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
    }, [tabItem, title, open])

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
