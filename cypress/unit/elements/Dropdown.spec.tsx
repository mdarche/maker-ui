import * as React from 'react'
import { Dropdown } from '@maker-ui/elements'
import { mount } from '@cypress/react'
import { Div } from 'maker-ui'

/**
 * @component
 * Dropdown
 *
 * @tests
 * - Render with defaults
 * - Prop: `buttonCss`
 * - Prop: `css`, `_css`
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
    mount(<Dropdown>test content</Dropdown>)
    cy.get('button').click()
    cy.contains('test content')
  })

  /* Prop: `buttonCss` */
  it('applies styles to button with `buttonCss`', () => {
    mount(<Dropdown buttonCss={{ color: 'red' }}>test content</Dropdown>)
    cy.get('button').should('have.color', 'red')
  })

  /* Prop: `css`, `_css` */

  it('applies styles the direct content wrapper with `css`', () => {
    mount(
      <Dropdown css={{ background: 'purple' }} _css={{ background: 'green' }}>
        test content
      </Dropdown>
    )
    cy.get('button').click()
    cy.get('.dropdown').should('have.backgroundColor', 'green')
    cy.get('.popover .container').should('have.backgroundColor', 'purple')
  })

  /* Prop: `button` (string) */

  it('accepts a custom button string', () => {
    mount(<Dropdown button="Click here">test content</Dropdown>)
    cy.contains('Click here').click()
    cy.contains('test content')
  })

  /* Prop: `button` (component) */

  it('accepts a custom button component', () => {
    mount(
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
    mount(
      <Dropdown
        button={(show, attributes) => (
          <button id="custom-btn" {...attributes}>
            {show ? 'Close' : 'Open'}
          </button>
        )}>
        test content
      </Dropdown>
    )
    cy.get('#custom-btn').click()
    cy.contains('test content')
  })

  /* Prop: `matchWidth` */

  it('matches the container width to the button width', () => {
    mount(
      <Dropdown matchWidth buttonCss={{ width: 500 }}>
        test content
      </Dropdown>
    )
    cy.get('button').click()
    cy.contains('test content')
    cy.get('.popover').should('have.css', 'width', '500px')

    mount(
      <Dropdown
        matchWidth
        buttonCss={{ border: 'none', padding: 0 }}
        button={<Div css={{ width: 303 }}>Button inner</Div>}>
        new content
      </Dropdown>
    )
    cy.contains('Button inner').click()
    cy.contains('new content')
    cy.get('.popover').should('have.css', 'width', '303px')
  })

  /* Prop: `trapFocus` */

  it('traps focus in the dropdown with the `trapFocus` prop', () => {
    mount(
      <Dropdown trapFocus>
        <button id="btn-1">Popover button</button>
        <button id="btn-2">Popover button</button>
        <button id="btn-3">Popover button</button>
      </Dropdown>
    )
    cy.get('button').click()
    // @ts-ignore
    cy.get('#btn-1').tab()
    // @ts-ignore
    cy.get('#btn-2').tab()
    // @ts-ignore
    cy.get('#btn-3').tab()
    cy.get('#btn-1').should('have.focus')
    cy.get('body').type('{esc}')
    cy.get('.popover').should('not.exist')
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
    mount(<ExternalControl />)
    cy.get('#external-btn').click()
    cy.contains('test content')
    cy.get('#external-btn').click()
    cy.get('.popover').should('not.exist')
  })

  /* Behavior: closes on focus blur for keyboard users */

  it('closes the dropdown on blur for keyboard users', () => {
    mount(
      <>
        <Dropdown button="Button Inner">
          <button id="btn-1">Popover button</button>
          <button id="btn-2">Popover button</button>
          <button id="btn-3">Popover button</button>
        </Dropdown>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.contains('Button Inner').click()
    // @ts-ignore
    cy.get('#btn-1').tab()
    // @ts-ignore
    cy.get('#btn-2').tab()
    // @ts-ignore
    cy.get('#btn-3').tab()
    cy.get('.dropdown-btn').should('have.focus')
    cy.get('.popover').should('not.exist')
  })
})
