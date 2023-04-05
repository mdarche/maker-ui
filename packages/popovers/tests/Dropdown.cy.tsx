import * as React from 'react'
import { Dropdown } from '../src'

/**
 * @component
 * Dropdown
 *
 * @tests
 * - Render with defaults
 * - Prop: `css`
 * - Prop: `button` (string, component, callback)
 * - Prop: `matchWidth`
 * - Prop: `trapFocus`
 * - Prop: `controls`
 * - Behavior: closes on focus blur for keyboard users
 *
 * @todo
 * add visual snapshot testing for transition and spring props
 */

describe('Dropdown', () => {
  /* Render with defaults */

  it('renders with default props', () => {
    cy.mount(<Dropdown>test content</Dropdown>)
    cy.get('test content').should('not.exist')
    cy.get('button').click()
    cy.contains('test content')
  })

  /* Prop: `css` */

  it('applies styles the direct content wrapper with `css`', () => {
    cy.mount(
      <Dropdown
        data-cy="dropdown"
        css={{
          background: '#000',
          button: { fontSize: 72 },
          '.content': { padding: 30 },
        }}>
        <div className="content">test content</div>
      </Dropdown>
    )
    cy.get('button').should('have.css', 'font-size', '72px')
    cy.get('button').click()
    cy.get('[data-cy="dropdown"]').should('have.backgroundColor', '#000')
    cy.get('.content').should('have.css', 'padding', '30px')
  })

  /* Prop: `button` (string) */

  it('accepts a custom button string', () => {
    cy.mount(<Dropdown button="Click here">test content</Dropdown>)
    cy.contains('Click here').click()
    cy.contains('test content')
  })

  /* Prop: `button` (component) */

  it('accepts a custom button component', () => {
    cy.mount(
      <Dropdown button={<span className="custom">custom-jsx</span>}>
        test content
      </Dropdown>
    )
    cy.get('.custom')
    cy.contains('custom-jsx').click()
    cy.contains('test content')
  })

  /* Prop: `button` (callback) */

  it('accepts a custom button callback component', () => {
    cy.mount(
      <Dropdown
        button={(show, attributes) => (
          <button id="custom-btn" {...attributes}>
            {show ? 'Close' : 'Open'}
          </button>
        )}>
        test content
      </Dropdown>
    )
    cy.contains('Open')
    cy.get('#custom-btn').click()
    cy.contains('Close')
  })

  /* Prop: `matchWidth` */

  it('matches the container width to the button width', () => {
    cy.mount(
      <Dropdown matchWidth css={{ button: { width: 500 } }}>
        test content
      </Dropdown>
    )
    cy.get('button').click()
    cy.contains('test content')
    cy.get('[role="listbox"]').should('have.css', 'width', '500px')

    cy.mount(
      <Dropdown
        matchWidth
        css={{ button: { border: 'none', padding: 0 } }}
        button={<div style={{ width: 303 }}>Button inner</div>}>
        new content
      </Dropdown>
    )
    cy.contains('Button inner').click()
    cy.contains('new content')
    cy.get('[role="listbox"]').should('have.css', 'width', '303px')
  })

  /* Prop: `trapFocus` */

  it('traps focus in the dropdown with the `trapFocus` prop', () => {
    cy.mount(
      <Dropdown trapFocus button="Dropdown">
        <button data-cy="btn-1">Popover button</button>
        <button data-cy="btn-2">Popover button</button>
        <button data-cy="btn-3">Popover button</button>
      </Dropdown>
    )
    cy.contains('Dropdown').click()
    cy.tab()
    cy.tab()
    cy.tab()
    cy.get('[data-cy="btn-1"]').should('have.focus')
    cy.get('body').type('{esc}')
    cy.get('[role="listbox"]').should('not.exist')
  })

  /* Prop: `controls` */

  it('allows toggle control via outside useState hook', () => {
    const ExternalControl = () => {
      const [show, set] = React.useState(false)
      return (
        <>
          <button id="external-btn" onClick={() => set(!show)}>
            External Button
          </button>
          <Dropdown controls={[show, set]}>test content</Dropdown>
        </>
      )
    }
    cy.mount(<ExternalControl />)
    cy.get('#external-btn').click()
    cy.contains('test content')
    cy.get('#external-btn').click()
    cy.get('[role="listbox"]').should('not.exist')
  })

  /* Behavior: closes on focus blur for keyboard users */

  it('closes the dropdown on blur for keyboard users', () => {
    cy.mount(
      <>
        <Dropdown button="Button Inner">
          <button id="btn-1">Popover button</button>
          <button id="btn-2">Popover button</button>
          <button id="btn-3">Popover button</button>
        </Dropdown>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.contains('Button Inner').click().focus()
    cy.tab()
    cy.tab()
    cy.tab()
    cy.tab()
    cy.get('#new-focus').should('have.focus')
    cy.get('[role="listbox"]').should('not.exist')
  })
})
