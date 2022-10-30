import { useState } from 'react'
import { Div, Section } from 'maker-ui'
import { Tabs } from '@maker-ui/tabs'

export default function TabsPage() {
  const [key, setKey] = useState('1')

  const keyValues = ['1', '2', '3']
  const handleClick = (i: string) => setKey(i)

  return (
    <Section>
      <div>
        {keyValues.map((i) => (
          <button key={i} onClick={() => handleClick(i)}>
            Open Panel {i}
          </button>
        ))}
      </div>
      <Tabs
        activeKey={key}
        tabKeyNavigate
        css={{
          marginTop: 100,
          marginBottom: 200,
          '.tab-button': {
            background: '#fff',
            color: '#000',
            padding: 10,
          },
        }}>
        <Tabs.Panel eventKey="1" title="Title 1">
          First Text
        </Tabs.Panel>
        <Tabs.Panel eventKey="2" title="Title 2">
          Second Text
        </Tabs.Panel>
        <Tabs.Panel eventKey="3" title="Title 3">
          Third Text
        </Tabs.Panel>
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
      <Div css={{ height: [100, 2000] }}>test</Div>
    </Section>
  )
}
