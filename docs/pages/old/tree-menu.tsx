import * as React from 'react'
import { TreeMenu, TreeItem } from '@maker-ui/components'

const TabsPage = () => (
  <>
    <TreeMenu clickableText>
      <TreeItem text="main" open>
        <TreeItem text="hello" />
        <TreeItem text="subtree with children">
          <TreeItem text="hello" />
          <TreeItem text="sub-subtree with children">
            <TreeItem text="child 1" />
            <TreeItem text="child 2" link="https://google.com" newTab />
            <TreeItem text="child 3" />
            <TreeItem text="custom content">
              <div style={{ padding: 30 }}>Test!</div>
            </TreeItem>
          </TreeItem>
          <TreeItem text="hello" />
        </TreeItem>
        <TreeItem text="world" />
        {/* <TreeItem text={<span>something something</span>} /> */}
      </TreeItem>
    </TreeMenu>
  </>
)

export default TabsPage
