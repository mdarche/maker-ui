import * as React from 'react'
import { Tabs } from '../src'

/**
 * @component
 * Tabs
 * TabPanel
 *
 * @tests
 * Tabs
 * - Render with defaults
 * - Error: too few children
 * - Prop: `css`
 * - Prop: `renderInactive`
 * - Prop: `overflow`
 * - Prop: `navPosition`
 * - Prop: `activeKey`, `eventKey`
 * - Prop: `activeClass`
 * - Behavior: toggles the active tag when clicking a tab button
 * - Behavior: properly handles keyboard interactions
 * Tabs.Panel
 * - Prop: `title` (component)
 * - Prop: `disabled`
 * - Prop: `open`
 */

describe('Tabs', () => {
  /* Render with defaults */
  it('renders with default props', () => {
    cy.mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
        <Tabs.Panel title="Panel 3">Panel content 3</Tabs.Panel>
      </Tabs>
    )

    cy.get('[role="tabpanel"]').should('have.length', 3)
    cy.get('button').should('have.length', 3)
    cy.get('[role="tabpanel"].active').should('have.length', 1)
  })

  /* Error: too few children */

  it('throws an error if there are no children or less than two items', () => {
    const msg = 'Tabs must contain at least two Tabs.Panel components.'
    // No children
    cy.mount(<Tabs></Tabs>)
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include(msg)
      return false
    })
    // Not enough children
    cy.mount(
      //@ts-ignore
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
      </Tabs>
    )
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include(msg)
      return false
    })
  })

  /* Prop: `css` */

  it('supports the `css` prop', () => {
    cy.mount(
      <Tabs
        className="test-class"
        css={{
          background: '#e90266',
          button: { padding: 0, margin: 0 },
        }}>
        <Tabs.Panel title="Panel 1">Content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 1">Content 1</Tabs.Panel>
      </Tabs>
    )
    cy.get('.test-class').should('have.backgroundColor', '#e90266')
    cy.get('button').should('have.css', 'padding', '0px')
    cy.get('button').should('have.css', 'margin', '0px')
  })

  /* Prop: `renderInactive` */

  it('supports mounting and unmounting inactive tabs with `renderInactive` prop', () => {
    cy.mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tabpanel"]').should('have.length', 2)
    cy.mount(
      <Tabs renderInactive={false}>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tabpanel"]').should('have.length', 1)
  })

  /* Prop: `overflow` */

  it('supports scrolling or stacking tab buttons on mobile with `overflow` prop', () => {
    cy.viewport('iphone-x')
    cy.mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tablist"]').should('have.css', 'flex-direction', 'column')
    cy.get('[role="tablist"]').should('have.css', 'flex-wrap', 'wrap')
    cy.mount(
      <Tabs overflow="scroll">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tablist"]').should('have.css', 'overflow-x', 'scroll')
    cy.get('[role="tablist"]').should('have.css', 'flex-wrap', 'nowrap')
  })

  /* Prop: `navPosition` */

  it('supports top, bottom, left, and right navigation with the `navPosition` prop', () => {
    // Top - default
    cy.mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tablist"]').should('have.css', 'order', '1')
    // Bottom
    cy.mount(
      <Tabs navPosition="bottom">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tablist"]').should('have.css', 'order', '2')
    // Left
    cy.mount(
      <Tabs navPosition="left">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tablist"]').should('have.css', 'order', '1')
    // Right
    cy.mount(
      <Tabs navPosition="right">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tablist"]').should('have.css', 'order', '2')
  })

  /* Prop: `activeEventKey`, `eventKey` */

  it('supports external control with the `activeKey` prop and the TabPanel `eventKey` prop', () => {
    const EventKeyTest = () => {
      const [key, setKey] = React.useState(1)

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
          <Tabs activeEventKey={key}>
            <Tabs.Panel eventKey="1" title="Title 1">
              First Text
            </Tabs.Panel>
            <Tabs.Panel eventKey="2" title="Title 2">
              Second Text
            </Tabs.Panel>
            <Tabs.Panel eventKey="3" title="Title 3">
              Third Text
            </Tabs.Panel>
          </Tabs>
        </>
      )
    }
    cy.mount(<EventKeyTest />)
    cy.get('[role="tabpanel"]').first().should('have.class', 'active')
    cy.get('.external-2').click()
    cy.get('[role="tabpanel"]').eq(1).should('have.class', 'active')
    cy.get('.external-3').last().click()
    cy.get('[role="tabpanel"]').last().should('have.class', 'active')
    cy.get('.mkui-tab-btn').first().click()
    cy.get('[role="tabpanel"]').first().should('have.class', 'active')
  })

  /* Prop: `activeClass` */

  it('adds buttonType to tab button', () => {
    cy.mount(
      <Tabs activeClass="expanded">
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tabpanel"]').first().should('have.class', 'expanded')
    cy.get('button').first().should('have.class', 'expanded')
    cy.get('[role="tabpanel"]').last().should('not.have.class', 'expanded')
    cy.get('button').last().should('not.have.class', 'expanded')
    cy.get('button').last().click()
    cy.get('[role="tabpanel"]').first().should('not.have.class', 'expanded')
    cy.get('button').first().should('not.have.class', 'expanded')
    cy.get('[role="tabpanel"]').last().should('have.class', 'expanded')
    cy.get('button').last().should('have.class', 'expanded')
  })

  /* Behavior: toggles the active tag when clicking a tab button */

  it('toggles the active tab when a tab button is clicked', () => {
    cy.mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">
          <p>
            Panel content 1 <a href="/#">Demo link 1</a>
          </p>
        </Tabs.Panel>
        <Tabs.Panel title="Panel 2">
          <p>
            Panel content 2 <a href="/#">Demo link 2</a>
          </p>
        </Tabs.Panel>
        <Tabs.Panel title="Panel 3">
          <p>
            Panel content 3 <a href="/#">Demo link</a>
          </p>
        </Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tabpanel"]').first().should('have.css', 'display', 'block')
    cy.get('button').first().should('not.have.attr', 'tabindex')
    cy.get('button').last().click()
    cy.get('button').first().should('have.attr', 'tabindex', '-1')
    cy.get('button').last().should('have.class', 'active')
    cy.get('[role="tabpanel"]').last().should('have.class', 'active')
    cy.get('[role="tabpanel"].active').should('have.length', 1)
    cy.get('[role="tabpanel"]').first().should('have.css', 'display', 'none')
  })

  /* Behavior: properly handles keyboard interactions */

  it('properly handles keyboard interactions', () => {
    // Horizontal Navigation
    cy.mount(
      <Tabs>
        <Tabs.Panel title="Panel 1">Panel content 1</Tabs.Panel>
        <Tabs.Panel title="Panel 2">Panel content 2</Tabs.Panel>
        <Tabs.Panel title="Panel 3">
          Panel content 3<button>focusable</button>
        </Tabs.Panel>
      </Tabs>
    )
    cy.get('button').first().focus()
    cy.get('body').type('{rightarrow}')
    cy.focused().should('have.text', 'Panel 2')
    cy.get('body').type('{rightarrow}')
    cy.focused().should('have.text', 'Panel 3')
    cy.get('body').type('{rightarrow}')
    cy.focused().should('have.text', 'Panel 1')
    cy.get('body').type('{leftarrow}')
    cy.focused().should('have.text', 'Panel 3')
    cy.tab()
    cy.focused().should('have.text', 'focusable')
    cy.tab({ shift: true })
    cy.focused().should('have.text', 'Panel 3')
  })
})

describe('Tabs.Panel component', () => {
  /* Prop: `title` (component) */

  it('accepts a custom title component', () => {
    cy.mount(
      <Tabs>
        <Tabs.Panel title={<h4>Custom!</h4>}>Tab Content</Tabs.Panel>
        <Tabs.Panel title="Tab 2">Tab Content</Tabs.Panel>
      </Tabs>
    )
    cy.get('button h4').contains('Custom!')
  })

  /* Prop: `disabled` */

  it('disables a panel and its button toggle with the `disabled` prop', () => {
    cy.mount(
      <Tabs>
        <Tabs.Panel disabled title="Panel 1">
          Tab Content 1
        </Tabs.Panel>
        <Tabs.Panel title="Panel 2">Tab Content 2</Tabs.Panel>
        <Tabs.Panel title="Panel 3">Tab Content 3</Tabs.Panel>
      </Tabs>
    )
    cy.get('button').first().should('be.disabled')
    cy.get('button').eq(1).should('have.class', 'active')
    cy.get('[role="tabpanel"]').eq(1).should('have.class', 'active')
    cy.get('button').last().click()
    cy.get('[role="tabpanel"]').last().should('have.class', 'active')
  })

  /* Prop: `open` */

  it('sets a default open tab panel with the `open` prop', () => {
    // Adds `open` to 2 panels and ensures that 2nd panel is active
    cy.mount(
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
    cy.get('[role="tabpanel"]').eq(1).should('have.class', 'active')
  })
})
