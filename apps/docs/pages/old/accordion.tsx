import * as React from 'react'
import { Accordion } from '@maker-ui/elements'

const AccordionPage = () => {
  const [key, setKey] = React.useState('1')

  const keyValues = ['1', '2', '3']
  const handleClick = (i: string) => setKey(i)

  return (
    <>
      <div>
        {keyValues.map((i) => (
          <button key={i} onClick={() => handleClick(i)}>
            Open Panel {i}
          </button>
        ))}
      </div>
      <Accordion
        className="example-accordion"
        activeKey={key}
        showSingle
        animate
        css={{
          margin: 50,
          '.accordion': { borderColor: 'gainsboro' },
          '.accordion-toggle': {
            fontSize: 16,
            background: '#efeded',
            '&.active': { background: '#ecf9ff' },
          },
          '.accordion-panel': { padding: 100 },
        }}>
        <Accordion.Panel title="Accordion Title 1" eventKey="1">
          Yo!
        </Accordion.Panel>
        <Accordion.Panel title="Accordion Title 2" eventKey="2">
          Yo 2!
        </Accordion.Panel>
        <Accordion.Panel title="Accordion Title 3" eventKey="3">
          Yo 3!
        </Accordion.Panel>
      </Accordion>
    </>
  )
}

export default AccordionPage
