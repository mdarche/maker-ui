import React from 'react'
import { TreeMenu, TreeItem } from '@maker-ui/components'
import { SEO } from '@maker-ui/seo'

const TabsPage = () => (
  <React.Fragment>
    <SEO title="TreeMenu" />
    <TreeMenu clickableText>
      <TreeItem text="main" open>
        <TreeItem text="hello" />
        <TreeItem text="subtree with children" link="https://google.com" newTab>
          <TreeItem text="hello" />
          <TreeItem text="sub-subtree with children">
            <TreeItem text="child 1" link="https://google.com" newTab />
            <TreeItem text="child 2" />
            <TreeItem text="child 3" />
            <TreeItem text="custom content">
              <div>Test!</div>
            </TreeItem>
          </TreeItem>
          <TreeItem text="hello" />
        </TreeItem>
        <TreeItem text="world" />
        <TreeItem text={<span>something something</span>} />
      </TreeItem>
    </TreeMenu>
  </React.Fragment>
)

export default TabsPage
