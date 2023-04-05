import * as React from 'react'
import { Spinner } from '../src'

/**
 * @component
 * Spinner
 *
 * @tests
 * - Renders with defaults
 * - Type: `classic`
 * - Type: `pulse`
 * - Type: `dot-spinner`
 * - Type: `blocks`
 * - Type: `dots`
 * - Type: `gear`
 * - Type: `basic`
 * - Prop: `size`
 * - Prop: `colors`
 */

describe('Spinner component', () => {
  const defaultProps = {
    colors: ['#0e94d4', '#58c5fa', '#9ad8f6', '#d2d2d2'],
  }

  it('renders the default spinner', () => {
    cy.mount(<Spinner {...defaultProps} />)
    cy.get('svg').should('exist')
  })

  it('renders the classic spinner', () => {
    cy.mount(<Spinner {...defaultProps} type="classic" />)
    cy.get('svg').should('exist')
  })

  it('renders the pulse spinner', () => {
    cy.mount(<Spinner {...defaultProps} type="pulse" />)
    cy.get('svg').should('exist')
  })

  it('renders the dot-spinner spinner', () => {
    cy.mount(<Spinner {...defaultProps} type="dot-spinner" />)
    cy.get('svg').should('exist')
  })

  it('renders the blocks spinner', () => {
    cy.mount(<Spinner {...defaultProps} type="blocks" />)
    cy.get('svg').should('exist')
  })

  it('renders the dots spinner', () => {
    cy.mount(<Spinner {...defaultProps} type="dots" />)
    cy.get('svg').should('exist')
  })

  it('renders the gear spinner', () => {
    cy.mount(<Spinner {...defaultProps} type="gear" />)
    cy.get('svg').should('exist')
  })

  it('renders the basic spinner', () => {
    cy.mount(<Spinner {...defaultProps} type="basic" />)
    cy.get('svg').should('exist')
  })

  it('applies the specified size', () => {
    const size = 100
    cy.mount(<Spinner {...defaultProps} size={size} />)
    cy.get('svg')
      .should('have.css', 'width', `${size}px`)
      .should('have.css', 'height', `${size}px`)
  })

  it('applies the specified colors to multi-colored spinners', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#000']
    cy.mount(<Spinner type="bars" colors={colors} />)
    cy.get('svg path').each((path, i) => {
      cy.wrap(path).should('have.attr', 'fill', colors[i])
    })
  })
})
