import React, { useState } from 'react'
import { Accordion } from '@maker-ui/components'

const AccordionPage = () => {
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
      <Accordion
        showSingle
        activeKey={key}
        sx={{
          '.accordion': { borderColor: 'gainsboro' },
          '.accordion-toggle': {
            fontSize: 3,
            bg: '#efeded',
            '&.active': { bg: '#ecf9ff' },
          },
          '.accordion-panel': { p: 100 },
        }}>
        <Accordion.Panel open title="Accordion Title" eventKey="1">
          Yo!
        </Accordion.Panel>
        <Accordion.Panel title="Accordion Title" eventKey="2">
          Yo 2!
        </Accordion.Panel>
        <Accordion.Panel title="Accordion Title" eventKey="3">
          Yo 3!
        </Accordion.Panel>
      </Accordion>
    </>
  )
}

export default AccordionPage
