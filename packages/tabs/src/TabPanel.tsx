import * as React from 'react'

export interface TabPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** A title string or custom React element that will be used as the Tab Button for this panel. */
  title?: string | React.ReactElement
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
  /** Used to validate children. Internal only
   * @internal
   */
  _type?: 'TabPanel'
}

/**
 * The `TabPanel` component is a direct child of `Tabs` and is used to wrap custom tab content.
 *
 * @link https://maker-ui.com/docs/elements/tabs
 */
export const TabPanel = ({ children }: TabPanelProps) => {
  return <>{children}</>
}

TabPanel.defaultProps = { _type: 'TabPanel' }
TabPanel.displayName = 'TabPanel'
