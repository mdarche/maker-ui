import { useState } from 'react'
import { mount } from '@cypress/react'

import { Tabs } from '../src'

/**
 * @component
 * Tabs
 * TabPanel
 *
 * @tests
 * Tabs
 * - Render with defaults
 * - Prop: `css`
 * - Prop: `renderInactive`
 * - Prop: `overflow`
 * - Prop: `navPosition`
 * - Prop: `activeKey`, `eventKey`
 * - Prop: `buttonType`
 * - Behavior: can render non-tab panel children without error
 * - Behavior: toggles the active tag when clicking a tab button
 * TabPanel
 * - Prop: `title` (comnponent)
 * - Prop: `disabled`
 * - Prop: `open`
 *
 * @todo - Test all keyboard navigation scenarios
 */

describe('Tabs', () => {
  /* Render with defaults */
  it('renders with default props', () => {
    mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
        <Tabs.Panel title="Panel 3">Panel content 3</Tabs.Panel>
      </Tabs>
    )

    cy.get('.tab-panel').should('have.length', 3)
    cy.get('.tab-button').should('have.length', 3)
    cy.get('.tab-panel.active').should('have.length', 1)
  })

  /* Prop: `css` */

  it('supports the `css` prop', () => {
    mount(
      <Tabs className="test-class" css={{ background: '#e90266' }}>
        <Tabs.Panel title="Panel 1">Content 1</Tabs.Panel>
      </Tabs>
    )
    cy.get('.test-class').should('have.backgroundColor', '#e90266')
  })

  /* Prop: `renderInactive` */

  it('supports mounting and unmounting inactive tabs with `renderInactive` prop', () => {
    mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-panel').should('have.length', 2)
    mount(
      <Tabs renderInactive={false}>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-panel').should('have.length', 1)
  })

  /* Prop: `overflow` */

  it('supports scrolling or stacking tab buttons on mobile with `overflow` prop', () => {
    cy.viewport('iphone-x')
    mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-navigation').should('have.css', 'flex-direction', 'column')
    cy.get('.tab-navigation').should('have.css', 'flex-wrap', 'wrap')
    mount(
      <Tabs overflow="scroll">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-navigation').should('have.css', 'overflow-x', 'scroll')
    cy.get('.tab-navigation').should('have.css', 'flex-wrap', 'nowrap')
  })

  /* Prop: `navPosition` */

  it('supports top, bottom, left, and right navigation with the `navPosition` prop', () => {
    // Top - default
    mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-navigation').should('have.css', 'order', '1')
    // Bottom
    mount(
      <Tabs navPosition="bottom">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-navigation').should('have.css', 'order', '2')
    // Left
    mount(
      <Tabs navPosition="left">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-navigation').should('have.css', 'order', '1')
    // Right
    mount(
      <Tabs navPosition="right">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-navigation').should('have.css', 'order', '2')
  })

  /* Prop: `activeKey`, `eventKey` */

  it('supports external control with the `activeKey` prop and the TabPanel `eventKey` prop', () => {
    const EventKeyTest = () => {
      const [key, setKey] = useState(1)

      const keyValues = [1, 2, 3]
      const handleClick = (i: number) => setKey(i)

      return (
        <>
          <div>
            {keyValues.map((i) => (
              <button
                className={`external-${i}`}
                key={i}
                onClick={() => handleClick(i)}>
                Open Panel {i}
              </button>
            ))}
          </div>
          <Tabs activeKey={key}>
            <Tabs.Panel disabled eventKey="1" title="Title 1">
              First Text
            </Tabs.Panel>
            <Tabs.Panel open eventKey="2" title="Title 2">
              Second Text
            </Tabs.Panel>
            <Tabs.Panel eventKey="3" title="Title 3">
              Third Text
            </Tabs.Panel>
          </Tabs>
        </>
      )
    }
    mount(<EventKeyTest />)
    cy.get('.external-1').click()
    cy.get('.tab-panel').first().should('not.have.class', 'active')
    cy.get('.external-2').click()
    cy.get('.tab-panel').eq(1).should('have.class', 'active')
    cy.get('.tab-button').last().click()
    cy.get('.tab-panel').last().should('have.class', 'active')
  })

  /* Prop: `buttonType` */

  it('adds buttonType to tab button', () => {
    mount(
      <Tabs buttonType="button">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-button').first().should('have.attr', 'type', 'button')
  })

  /* Behavior: can render non-tab panel children without error */

  it('renders non TabPanel children without conflict', () => {
    mount(
      <Tabs>
        <div>Non Panel 1</div>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
        <div>Non Panel 2</div>
      </Tabs>
    )
    cy.contains('Non Panel 1')
    cy.contains('Non Panel 2')
  })

  /* Behavior: toggles the active tag when clicking a tab button */

  it('toggles the active tab when a tab button is clicked', () => {
    mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
        <Tabs.Panel title="Panel 3">Panel content 3</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-panel').first().should('have.css', 'display', 'block')
    cy.get('.tab-button').first().should('have.attr', 'tabindex', '0')
    cy.get('.tab-button').last().click()
    cy.get('.tab-button').first().should('have.attr', 'tabindex', '-1')
    cy.get('.tab-button').last().should('have.class', 'active')
    cy.get('.tab-panel').last().should('have.class', 'active')
    cy.get('.tab-panel.active').should('have.length', 1)
    cy.get('.tab-panel').first().should('have.css', 'display', 'none')
  })
})

describe('TabPanel component', () => {
  /* Prop: `title` (comnponent) */

  it('accepts a custom title component', () => {
    mount(
      <Tabs>
        <Tabs.Panel title={<h4>Custom!</h4>}>Tab Content</Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-button h4').contains('Custom!')
  })

  /* Prop: `disabled` */

  it('disables a panel and its button toggle with the `disabled` prop', () => {
    mount(
      <Tabs>
        <Tabs.Panel disabled title="Panel 1">
          Tab Content 1
        </Tabs.Panel>
        <Tabs.Panel title="Panel 2">Tab Content 2</Tabs.Panel>
        <Tabs.Panel disabled title="Panel 3">
          Tab Content 3
        </Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-button').first().should('be.disabled')
    cy.get('.tab-button').last().should('be.disabled')
    cy.get('.tab-button').eq(1).should('have.class', 'active')
  })

  /* Prop: `open` */

  it('sets a default open tab panel with the `open` prop', () => {
    // Adds `open` to 2 panels and ensures that the 3rd panel is active
    mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Content 1</Tabs.Panel>
        <Tabs.Panel open title="Panel 2">
          Content 2
        </Tabs.Panel>
        <Tabs.Panel open title="Panel 3">
          Content 3
        </Tabs.Panel>
      </Tabs>
    )
    cy.get('.tab-panel').last().should('have.class', 'active')
  })
})
