import * as React from 'react'
import { generateId, cn } from '@maker-ui/utils'
import { useTabs, type TabItem } from './Tabs'

export interface TabPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
    { title, eventKey, className, open = false, disabled = false, ...props },
    ref
  ) => {
    const [id] = React.useState<string>(() =>
      eventKey ? eventKey.toString() : generateId()
    )
    const [panelId] = React.useState(generateId())

    const {
      state: { activeKey, renderInactive },
      addToTabGroup,
      updateTab,
    } = useTabs()
    const tabItem: TabItem = { id, panelId, title, disabled }

    React.useEffect(() => {
      addToTabGroup(tabItem, open)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabItem, open])

    React.useEffect(() => {
      updateTab(id, tabItem)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])

    return renderInactive || activeKey === id ? (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${panelId}`}
        aria-labelledby={`control-${panelId}`}
        className={cn([
          'mkui_tab',
          activeKey === id ? ' active' : undefined,
          className,
        ])}
        {...props}
      />
    ) : null
  }
)

TabPanel.displayName = 'TabPanel'
