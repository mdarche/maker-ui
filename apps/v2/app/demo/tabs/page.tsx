'use client'
import { Section } from '@maker-ui/layout'
import { Tabs } from '@/client'
import { useState } from 'react'

export default function TabsPage() {
  const [key, setKey] = useState('1')

  const keyValues = ['1daf', 'lkj2', '3fdsl']
  const handleClick = (i: string) => setKey(i)

  return (
    <Section>
      <div>
        {keyValues.map((i, index) => (
          <button key={index} onClick={() => handleClick(i)}>
            Open Panel {i}
          </button>
        ))}
      </div>
      <Tabs
        activeKey={key}
        // tabKeyNavigate
        css={{
          marginTop: 100,
          marginBottom: 200,
          '.mkui_tab_btn': {
            background: '#fff',
            // color: '#000',
            padding: 10,
          },
        }}>
        K how about now
        <Tabs.Panel title="Title 1">First Text</Tabs.Panel>
        {/* <Tabs.Panel eventKey="2" title="Title 2">
          Second Text
        </Tabs.Panel>
        <Tabs.Panel eventKey="3" title="Title 3">
          Third Text
        </Tabs.Panel> */}
        {/* <Tabs.Panel title="Title 4">Fourth Text</Tabs.Panel>
        <Tabs.Panel open title="Title 5">
          Fifth Text
        </Tabs.Panel>
        <Tabs.Panel title="Title 6">Sixth Text</Tabs.Panel>
        <Tabs.Panel title="Title 7">Seventh Text</Tabs.Panel>
        <Tabs.Panel title="Title 8">Eighth Text</Tabs.Panel>
        <Tabs.Panel title="Title 9">Ninth Text</Tabs.Panel> */}
      </Tabs>
      {/* <Tabs
        navPosition="left"
        overflow="scroll"
        className="tabs"
        css={{
          '.tab-button': {
            background: 'blue',
            color: '#fff',
            padding: 10,
          },
        }}>
        <Tabs.Panel title="Title 1">First Text</Tabs.Panel>
        <Tabs.Panel title="Title 2">
          <button>test</button>Second Text
        </Tabs.Panel>
        <Tabs.Panel title="Title 3">Third Text</Tabs.Panel>
        <Tabs.Panel title="Title 4">
          <a href="/test">Test</a>
        </Tabs.Panel>
        <Tabs.Panel title="Title 5">Fifth</Tabs.Panel>
        <Tabs.Panel title="Title 6">Sixth Text</Tabs.Panel>
      </Tabs> */}
    </Section>
  )
}
