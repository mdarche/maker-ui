import React from 'react'
import { Tabs } from '@elements-ui/components'

const items = [
  {
    label: 'Tab 1',
    component:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  { label: 'Tab 2', component: 'Text 2' },
  { label: 'Tab 3', component: 'Text 3' },
]

const TabsPage = () => (
  <React.Fragment>
    <Tabs nav="top" items={items} />
  </React.Fragment>
)

export default TabsPage
