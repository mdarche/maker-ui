import * as React from 'react'
import { Dropdown } from '@maker-ui/components'
import { mount } from '@cypress/react'
import { Div } from 'maker-ui'

// TODO - add visual snapshot testing for transition and spring props

describe('Dropdown component', () => {
  it('renders with default props', () => {
    mount(<Dropdown>test content</Dropdown>)
    cy.get('button').click()
    cy.contains('test content')
  })

  it('applies styles to button with `buttonCss`', () => {
    mount(<Dropdown buttonCss={{ color: 'red' }}>test content</Dropdown>)
    cy.get('button').should('have.color', 'red')
  })

  it('applies styles to the dropdown root with `_css`', () => {
    mount(<Dropdown _css={{ background: 'green' }}>test content</Dropdown>)
    cy.get('.dropdown').should('have.backgroundColor', 'green')
  })

  it('applies styles the direct content wrapper with `css`', () => {
    mount(<Dropdown css={{ background: 'purple' }}>test content</Dropdown>)
    cy.get('button').click()
    cy.get('.popover .container').should('have.backgroundColor', 'purple')
  })

  it('accepts a custom button string', () => {
    mount(<Dropdown button="Click here">test content</Dropdown>)
    cy.contains('Click here').click()
    cy.contains('test content')
  })

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

  it('allows toggle control via outside useState hook', () => {
    mount(<ExternalControl />)
    cy.get('#external-btn').click()
    cy.contains('test content')
    cy.get('#external-btn').click()
    cy.get('.popover').should('not.exist')
  })
})

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
