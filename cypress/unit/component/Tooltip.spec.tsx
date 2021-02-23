import * as React from 'react'
import { Flex } from 'maker-ui'
import { Tooltip } from '@maker-ui/components'
import { mount } from '@cypress/react'

/**
 * @see Popover.spec.tsx for gap, defer, trapFocus, and closeOnBlur unit tests
 */

const TestTooltip = ({ children, ...props }) => {
  return (
    <Flex
      align="center"
      justify="center"
      css={{ height: '100vh', width: '100vw' }}>
      {/* @ts-ignore */}
      <Tooltip {...props}>{children}</Tooltip>
    </Flex>
  )
}

describe('Tooltip component', () => {
  it('renders with default props', () => {
    mount(<TestTooltip label="Label">Tooltip content</TestTooltip>)
    cy.get('button').focus()
    cy.contains('Tooltip content')
  })

  it('renders with a custom label component', () => {
    mount(<TestTooltip label={<h2>Label</h2>}>Tooltip content</TestTooltip>)
    cy.get('h2').contains('Label')
    cy.get('button').focus()
    cy.contains('Tooltip content')
  })

  it('applies `buttonCss` to the button label and `css` to the tooltip content container', () => {
    mount(
      <TestTooltip
        buttonCss={{ padding: 10 }}
        css={{ padding: 20 }}
        label="label">
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').should('have.css', 'padding', '10px')
    cy.get('button').focus()
    cy.get('.tooltip').should('have.css', 'padding', '20px')
  })

  it('applies a custom color and background with the `background` and `color` props', () => {
    mount(
      <TestTooltip label="label" background="#e3e333" color="#e23353">
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').focus()
    cy.get('.tooltip').should('have.backgroundColor', '#e3e333')
    cy.get('.tooltip').should('have.color', '#e23353')
  })

  // VISUAL TEST - pseudo arrow
  it('removes the pseudo arrow styles with the `noArrow` prop (visual)', () => {
    mount(<TestTooltip label="label">Tooltip content</TestTooltip>)
    cy.get('button').focus()
  })

  // VISUAL TEST - position top
  it.only('positions the tooltip to the top of the label', () => {
    mount(
      <TestTooltip
        label="label"
        position="top"
        gap={30}
        css={{ padding: 20, height: 300 }}>
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').focus()
  })

  // VISUAL TEST - position bottom
  it('positions the tooltip to the bottom of the label', () => {
    mount(
      <TestTooltip label="label" css={{ height: 200 }}>
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').focus()
  })

  // VISUAL TEST - position left
  it('positions the tooltip to the top of the label (visual)', () => {
    mount(
      <TestTooltip label="label" css={{ height: 200 }}>
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').focus()
  })
})
