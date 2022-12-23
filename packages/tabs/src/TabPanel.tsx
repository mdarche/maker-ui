import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useTabs, TabItem } from './Tabs'

export interface TabPanelProps
  extends Omit<TabItem, 'id'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}

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
    const {
      id,
      state: { activeKey, renderInactive },
    } = useTabs({ title, eventKey, open, disabled })

    console.log('ID is', id)

    // const tabItem: TabItem = { id, panelId, title, disabled }

    // React.useEffect(() => {
    //   // const exists = tabs ? tabs.find((t) => t.id === id) : false
    //   addToTabGroup(tabItem, open)
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // React.useEffect(() => {
    //   console.log('Calling this')
    //   if (tabs?.map((tab) => tab.id).includes(id)) {
    //     updateTab(id, tabItem)
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [title])

    return renderInactive || activeKey === id ? (
      <div
        ref={ref}
        className={cn([
          'mkui_tab',
          activeKey === id ? ' active' : undefined,
          className,
        ])}
        role="tabpanel"
        id={`panel-${id}`}
        aria-labelledby={`control-${id}`}
        {...props}
      />
    ) : null
  }
)

TabPanel.displayName = 'TabPanel'
