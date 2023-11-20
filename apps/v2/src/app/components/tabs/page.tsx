'use client'
import { Section } from 'maker-ui/layout'
import { Tabs } from 'maker-ui/tabs'
import { useState } from 'react'
import 'maker-ui/tabs.css'

export default function TabsPage() {
  const [key, setKey] = useState('1')

  const keyValues = ['1daf', 'lkj2']
  const handleClick = (i: string) => setKey(i)

  return (
    <Section>
      <div style={{ marginBottom: 60 }}>
        {keyValues.map((i, index) => (
          <button key={index} onClick={() => handleClick(i)}>
            Open Panel {i}
          </button>
        ))}
      </div>
      <Tabs
        activeEventKey={key}
        // renderInactive={false}
        // tabKeyNavigate
      >
        <Tabs.Panel title="Title 1" eventKey={'1daf'}>
          First Text
        </Tabs.Panel>
        <Tabs.Panel title={<div>Custom div title</div>} eventKey="lkj2">
          Second Text
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
      </Tabs>
      <div style={{ marginBottom: 60 }} />
      <Tabs
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
      </Tabs>
    </Section>
  )
}
