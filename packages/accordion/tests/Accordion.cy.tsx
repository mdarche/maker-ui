import * as React from 'react'
import { Accordion } from '../src'

/**
 * @component
 * Accordion
 * AccordionPanel
 *
 * @tests
 * Accordion
 * - Render with defaults
 * - Successfully toggles open and closed
 * - Error: invalid children
 * - Error: no children
 * - Prop: `classNames`
 * - Prop: `activeClass`
 * - Prop: `animate`
 * - Prop: `css`
 * - Prop: `showSingle`
 * - Prop: `icon`, `customIcon`
 * - Prop: `activeKey`, `eventKey`
 * Accordion.Panel
 * - Prop: `title`
 * - Prop: `open`
 * - Behavior: correctly measures and uses child height
 *
 */

describe('Accordion', () => {
  /* Render with defaults */
  it('renders the accordion with default / required props', () => {
    cy.mount(
      <Accordion>
        <Accordion.Panel data-cy="panel" title="Panel 1">
          Content 1
        </Accordion.Panel>
        <Accordion.Panel data-cy="panel" title="Panel 2">
          Content 2
        </Accordion.Panel>
        <Accordion.Panel data-cy="panel" title="Panel 3">
          Content 3
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('[data-cy="panel"]').should('have.length', 3)
    cy.get('.expanded').should('not.exist')
    cy.get('[data-cy="panel"]').each((el, index) => {
      cy.wrap(el)
        .find('button')
        .should('contain', `Panel ${index + 1}`)
      cy.wrap(el)
        .find('.mkui-accordion-inner')
        .should('contain', `Content ${index + 1}`)
    })
  })

  it('toggles accordion with by clicking accordion button', () => {
    cy.mount(
      <Accordion>
        <Accordion.Panel data-cy="panel" title="Panel 1">
          Content 1
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('button').click()
    cy.get('[data-cy="panel"]').should('have.class', 'expanded')
  })

  /* Error: invalid children */

  it('throws an error if children are not Accordion.Panel components', () => {
    const msg = 'Accordion must only contain Accordion.Panel components.'
    // Invalid children
    cy.mount(
      <Accordion>
        <div>Non Panel 1</div>
        <Accordion.Panel title="Panel 1">Panel content 1</Accordion.Panel>
      </Accordion>
    )
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include(msg)
      return false
    })
  })

  /* Error: too few children */

  it('throws an error if there are no children or less than two items', () => {
    const msg = 'Accordion must contain a nested Accordion.Panel component.'
    // No children
    cy.mount(<Accordion></Accordion>)
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include(msg)
      return false
    })
    // Not enough children
  })

  /** Prop: classNames */

  it('supports custom classNames', () => {
    const classNames = {
      group: 'group',
      panel: 'panel',
      button: 'button',
      panelInner: 'panel-inner',
      panelGroup: 'panel-group',
    }

    cy.mount(
      <Accordion data-cy="accordion" classNames={classNames}>
        <Accordion.Panel data-cy="panel" title="Panel 1">
          Test Panel
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('[data-cy="accordion"]').should('have.class', 'group')
    cy.get('[data-cy="panel"]').should('have.class', 'panel-group')
    cy.get('button').should('have.class', 'button')
    cy.get('.mkui-accordion-panel').should('have.class', 'panel')
    cy.get('.mkui-accordion-inner').should('have.class', 'panel-inner')
  })

  /* Prop: `activeClass` */

  it('supports custom a custom active / expanded class selector', () => {
    cy.mount(
      <Accordion data-cy="accordion" activeClass="active">
        <Accordion.Panel data-cy="panel" title="Panel 1">
          Test Panel
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('button').click()
    cy.get('[data-cy="panel"]').should('have.class', 'active')
  })

  /* Prop: `animate` */

  it('supports the `animate` prop', () => {
    // Default animate if true
    cy.mount(
      <Accordion data-cy="accordion" animate>
        <Accordion.Panel data-cy="panel" title="Panel 1">
          <div style={{ height: 500 }}>Content</div>
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('button').click()
    cy.get('.mkui-accordion-panel').should('have.css', 'will-change', 'height')
    cy.get('.mkui-accordion-panel').should(
      'have.css',
      'transition',
      'height 0.3s ease 0s'
    )
    // Custom animate
    cy.mount(
      <Accordion data-cy="accordion" animate="height 1s ease 0.3s">
        <Accordion.Panel data-cy="panel" title="Panel 1">
          <div style={{ height: 500 }}>Content</div>
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('button').click()
    cy.get('.mkui-accordion-panel').should('have.css', 'will-change', 'height')
    cy.get('.mkui-accordion-panel').should(
      'have.css',
      'transition',
      'height 1s ease 0.3s'
    )
  })

  /* Prop: `css` */

  it('supports `css` prop', () => {
    cy.mount(
      <Accordion
        data-cy="accordion"
        css={{ background: '#e90266', button: { background: '#000' } }}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('[data-cy="accordion"]').should('have.backgroundColor', '#e90266')
    cy.get('button').should('have.backgroundColor', '#000')
  })

  /* Prop: `showSingle` */

  it('only expands one accordion at a time with `showSingle`', () => {
    cy.mount(
      <Accordion showSingle>
        <Accordion.Panel id="p1" title="Panel 1">
          Content 1
        </Accordion.Panel>
        <Accordion.Panel id="p2" title="Panel 2">
          Content 2
        </Accordion.Panel>
        <Accordion.Panel title="Panel 3">Content 3</Accordion.Panel>
      </Accordion>
    )
    cy.get('#p1 button').click()
    cy.get('#p1').should('have.class', 'expanded')
    cy.get('#p2 button').click()
    cy.get('#p1').should('not.have.class', 'expanded')
    cy.get('#p2').should('have.class', 'expanded')
  })

  /* Props: `icon`, `customIcon` */

  it('supports the icon and custom icon props', () => {
    // icon = false
    cy.mount(
      <Accordion icon={false}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('button svg').should('not.exist')
    // customIcon as a React component
    cy.mount(
      <Accordion customIcon={<div id="custom-icon">Custom</div>}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.get('#custom-icon')
    // customIcon as an object with expand and collapse components
    cy.mount(
      <Accordion
        customIcon={{ expand: <div>Open!</div>, collapse: <div>Close!</div> }}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.contains('Open!')
    cy.get('button').click()
    cy.contains('Close!')
    // customIcon as a callback function
    cy.mount(
      <Accordion
        customIcon={(isExpanded) => (
          <div>{isExpanded ? 'Close!' : 'Expand!'} </div>
        )}>
        <Accordion.Panel title="Panel 1">Content 1</Accordion.Panel>
      </Accordion>
    )
    cy.contains('Expand!')
    cy.get('button').click()
    cy.contains('Close!')
  })
})

/* Props: `activeKey`, `eventKey` */

it('lets outside components control the accordion panels via `eventKey`', () => {
  const EventKeyTest = () => {
    const [key, setKey] = React.useState('1')

    const keyValues = ['1', '2', '3']
    const handleClick = (i: string) => setKey(i)

    return (
      <>
        <div>
          {keyValues.map((i) => (
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
  cy.mount(<EventKeyTest />)
  cy.get('#btn-1').click()
  cy.get('.mkui-accordion.expanded').should('have.length', 1)
  cy.get('#p1').should('have.class', 'expanded')
  cy.get('#btn-3').click()
  cy.get('#p3').should('have.class', 'expanded')
  cy.get('.mkui-accordion.expanded').should('have.length', 1)
})

/**
 * Accordion.Panel
 */

describe('Accordion.Panel', () => {
  /* Prop: `title` */

  it('uses a custom title component', () => {
    cy.mount(
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

  /* Prop: `open` */

  it('is open by default with the `open` prop', () => {
    cy.mount(
      <Accordion>
        <Accordion.Panel data-cy="open-panel" title="Title 1" open>
          Content 1
        </Accordion.Panel>
        <Accordion.Panel title="Title 2">Content 2</Accordion.Panel>
      </Accordion>
    )
    cy.get('[data-cy="open-panel"]').should('have.class', 'expanded')
  })

  /* Behavior: correctly measures and uses child height */

  it('adapts to child height', () => {
    cy.mount(
      <Accordion>
        <Accordion.Panel data-cy="panel" title="Dot Syntax">
          <div style={{ height: 500 }}>Lots of content</div>
          <div>More text</div>
        </Accordion.Panel>
      </Accordion>
    )
    cy.get('.mkui-accordion-panel').should('have.css', 'height', '0px')
    cy.get('button').click()
    cy.get('.mkui-accordion-panel').invoke('height').should('gte', 500)
  })
})
