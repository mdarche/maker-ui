import React, { useState } from 'react'
import { Flex, Div } from 'maker-ui'
import { Tabs } from '@maker-ui/components'

const TabsPage = () => {
  const [key, setKey] = useState('1')

  const keyValues = ['1', '2', '3']
  const handleClick = (i: string) => setKey(i)

  return (
    <>
      <div>
        {keyValues.map(i => (
          <button key={i} onClick={() => handleClick(i)}>
            Open Panel {i}
          </button>
        ))}
      </div>
      <Tabs
        renderInactive
        activeKey={key}
        sx={{
          mb: 200,
          '.tabs-button': {
            bg: 'blue',
            color: '#fff',
            fontSize: 2,
            p: 10,
          },
        }}>
        <Flex>
          <Div>
            <Tabs.Panel eventKey="1" title="Title 1">
              First Text
            </Tabs.Panel>
            <Tabs.Panel eventKey="2" title="Title 2">
              Second Text
            </Tabs.Panel>
            <Tabs.Panel eventKey="3" title="Title 3">
              Third Text
            </Tabs.Panel>
            <Tabs.Panel title="Title 4">Fourth Text</Tabs.Panel>
            <Tabs.Panel open title="Title 5">
              Fifth Text
            </Tabs.Panel>
            <Tabs.Panel title="Title 6">Sixth Text</Tabs.Panel>
            <Tabs.Panel title="Title 7">Seventh Text</Tabs.Panel>
            <Tabs.Panel title="Title 8">Eighth Text</Tabs.Panel>
            <Tabs.Panel title="Title 9">Ninth Text</Tabs.Panel>
          </Div>
          <Div>test!</Div>
        </Flex>
      </Tabs>
      <Tabs
        navPosition="right"
        navStack
        sx={{
          '.tabs-button': {
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
        <Tabs.Panel title="Title 6">Sixth Text</Tabs.Panel>
      </Tabs>
    </>
  )
}
export default TabsPage
