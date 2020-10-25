import React from 'react'
import { Tabs } from '@maker-ui/components'

const TabsPage = () => (
  <>
    <Tabs
      navPosition="top"
      renderInactive
      sx={{
        mb: 200,
        '.Tabs.Panels-button': {
          bg: 'blue',
          color: '#fff',
          fontSize: 2,
          p: 10,
        },
      }}>
      <Tabs.Panel title="Title 1">First Text</Tabs.Panel>
      <Tabs.Panel title="Title 2">Second Text</Tabs.Panel>
      <Tabs.Panel title="Title 3">Third Text</Tabs.Panel>
      <Tabs.Panel title="Title 4">Fourth Text</Tabs.Panel>
      <Tabs.Panel title="Title 5">Fifth Text</Tabs.Panel>
      <Tabs.Panel title="Title 6">Fifth Text</Tabs.Panel>
      <Tabs.Panel title="Title 7">Fifth Text</Tabs.Panel>
      <Tabs.Panel title="Title 8">Fifth Text</Tabs.Panel>
      <Tabs.Panel title="Title 9">Fifth Text</Tabs.Panel>
    </Tabs>
    <Tabs
      navPosition="right"
      navStack
      sx={{
        '.Tabs.Panels-button': {
          bg: 'blue',
          color: '#fff',
          fontSize: 2,
          p: 10,
        },
      }}>
      <Tabs.Panel title="Title 1">First Text</Tabs.Panel>
      <Tabs.Panel title="Title 2">Second Text</Tabs.Panel>
      <Tabs.Panel title="Title 3">Third Text</Tabs.Panel>
      <Tabs.Panel title="Title 4">Fourth Text</Tabs.Panel>
      <Tabs.Panel title="Title 5">Fifth Text</Tabs.Panel>
      <Tabs.Panel title="Title 6">Fifth Text</Tabs.Panel>
      <Tabs.Panel title="Title 7">Fifth Text</Tabs.Panel>
      <Tabs.Panel title="Title 8">Fifth Text</Tabs.Panel>
      <Tabs.Panel title="Title 9">Fifth Text</Tabs.Panel>
    </Tabs>
  </>
)

export default TabsPage
