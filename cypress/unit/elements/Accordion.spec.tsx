import * as React from 'react'
import { Accordion, AccordionPanel } from '@maker-ui/elements'
import { mount } from '@cypress/react'

/**
 * Accordion
 *
 * @todo - Test all keyboard navigation scenarios
 *
 */

describe('Accordion component', () => {
  it('renders with default props', () => {
    mount(
      <Accordion>
        <AccordionPanel title="Panel 1">Content 1</AccordionPanel>
        <AccordionPanel title="Panel 2">Content 2</AccordionPanel>
        <AccordionPanel title="Panel 3">Content 3</AccordionPanel>
      </Accordion>
    )
    cy.get('.accordion-container .accordion').should('have.length', 3)
    cy.get('.expanded').should('not.exist')
  })

  it('supports `css` prop', () => {
    mount(
      <Accordion css={{ background: '#e90266' }}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('.accordion-container').should('have.backgroundColor', '#e90266')
  })

  it('only expands one accordion at a time with `showSingle`', () => {
    mount(
      <Accordion showSingle>
        <Accordion.Panel open id="p1" title="Panel 1">
          Content 1
        </Accordion.Panel>
        <Accordion.Panel id="p2" title="Panel 2">
          Content 2
        </Accordion.Panel>
        <Accordion.Panel title="Panel 3">Content 3</Accordion.Panel>
      </Accordion>
    )
    cy.get('#p1 .accordion-toggle').click()
    cy.get('#p1').should('have.class', 'expanded')
    cy.get('#p2 .accordion-toggle').click()
    cy.get('#p1').should('not.have.class', 'expanded')
    cy.get('#p2').should('have.class', 'expanded')
  })

  it('toggles accordion with by clicking title button', () => {
    mount(
      <Accordion>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('.accordion-toggle').click()
    cy.get('.accordion').should('have.class', 'expanded')
  })

  it('can hide icon', () => {
    mount(
      <Accordion icon={false}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('.accordion-toggle svg').should('not.exist')
  })

  it('accepts a custom component icon', () => {
    mount(
      <Accordion customIcon={<div id="custom-icon">Custom</div>}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('#custom-icon')
  })

  it('accepts distinct open and close icon components', () => {
    mount(
      <Accordion
        customIcon={{ expand: <div>Open!</div>, collapse: <div>Close!</div> }}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.contains('Open!')
    cy.get('.accordion-toggle').click()
    cy.contains('Close!')
  })

  it('accepts a jsx callback component icon', () => {
    mount(
      <Accordion
        customIcon={isExpanded => (
          <div>{isExpanded ? 'Close!' : 'Expand!'} </div>
        )}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.contains('Expand!')
    cy.get('.accordion-toggle').click()
    cy.contains('Close!')
  })

  it('changes animation spring with `springConfig` (visual)', () => {
    mount(
      <Accordion spring={{ mass: 1, tension: 324, friction: 15 }}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('.accordion-toggle').click()
    cy.get('.accordion').should('have.class', 'expanded')
  })

  it('lets outside components control the accordion panels via `eventKey`', () => {
    const EventKeyTest = () => {
      const [key, setKey] = React.useState('1')

      const keyValues = ['1', '2', '3']
      const handleClick = (i: string) => setKey(i)

      return (
        <>
          <div>
            {keyValues.map(i => (
              <button key={i} id={`btn-${i}`} onClick={() => handleClick(i)}>
                Open Panel {i}
              </button>
            ))}
          </div>
          <Accordion activeKey={key} showSingle>
            <Accordion.Panel id="p1" title="Accordion Title 1" eventKey="1">
              Yo 1!
            </Accordion.Panel>
            <Accordion.Panel id="p2" title="Accordion Title 2" eventKey="2">
              Yo 2!
            </Accordion.Panel>
            <Accordion.Panel id="p3" title="Accordion Title 3" eventKey="3">
              Yo 3!
            </Accordion.Panel>
          </Accordion>
        </>
      )
    }
    mount(<EventKeyTest />)
    cy.get('#btn-1').click()
    cy.get('.accordion.expanded').should('have.length', 1)
    cy.get('#p1').should('have.class', 'expanded')
    cy.get('#btn-3').click()
    cy.get('#p3').should('have.class', 'expanded')
    cy.get('.accordion.expanded').should('have.length', 1)
  })
})

/**
 * Accordion.Panel
 */

describe('AccordionPanel component', () => {
  it('supports `Accordion.Panel` dot syntax', () => {
    mount(
      <Accordion>
        <Accordion.Panel title="Dot Syntax">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('.accordion-toggle').contains('Dot Syntax')
  })

  it('uses a custom title component', () => {
    mount(
      <Accordion>
        <Accordion.Panel
          title={
            <div className="custom-title">
              <h3>Title component</h3>
            </div>
          }>
          Content 1
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('.custom-title h3')
  })

  it('adapts to child height', () => {
    mount(
      <Accordion>
        <Accordion.Panel title="Dot Syntax">
          <div style={{ height: 500 }}>Lots of content</div>
          <div>More text</div>
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('.accordion-panel')
      .invoke('height')
      .should('gte', 500)
  })

  it('is open by default with the `open` prop', () => {
    mount(
      <Accordion>
        <Accordion.Panel title="Title 1" open>
          Content 1
        </Accordion.Panel>
        <Accordion.Panel title="Title 2">Content 2</Accordion.Panel>
      </Accordion>
    )
    cy.get('.accordion-container .accordion')
      .eq(0)
      .should('have.class', 'expanded')
  })

  it('adds `_css` prop to title button and `css` to content wrapper', () => {
    mount(
      <Accordion>
        <Accordion.Panel
          title="CSS Test"
          css={{ margin: 10 }}
          _css={{ padding: 20 }}>
          Content 1
        </Accordion.Panel>
      </Accordion>
    )
  })
})

// Event Key
