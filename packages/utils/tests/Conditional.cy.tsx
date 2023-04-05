import * as React from 'react'
import { Conditional } from '../src'

/**
 * @component
 * Conditional
 *
 * @tests
 * - Condition is false, renders children without wrapper
 * - Condition is true, renders children with trueWrapper
 * - Condition is false, renders children with falseWrapper
 * - Missing wrapper props, renders children
 */

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  return <div className="wrapper">{children}</div>
}

describe('Conditional', () => {
  /* Condition is false, renders children without wrapper */

  it('renders children without wrapper when condition is false', () => {
    cy.mount(
      <Conditional
        condition={false}
        trueWrapper={(c) => <Wrapper>{c}</Wrapper>}>
        <div>Test content</div>
      </Conditional>
    )

    cy.contains('Test content')
    cy.get('.wrapper').should('not.exist')
  })

  /* Condition is true, renders children with trueWrapper */

  it('renders children with wrapper when condition is true', () => {
    cy.mount(
      <Conditional condition={true} trueWrapper={(c) => <Wrapper>{c}</Wrapper>}>
        <div>Test content</div>
      </Conditional>
    )

    cy.contains('Test content')
    cy.get('.wrapper').should('exist')
  })

  /* Condition is false, renders children with falseWrapper */

  it('renders children with wrapper when condition is true', () => {
    cy.mount(
      <Conditional
        condition={false}
        falseWrapper={(c) => <Wrapper>{c}</Wrapper>}>
        <div>Test content</div>
      </Conditional>
    )

    cy.contains('Test content')
    cy.get('.wrapper').should('exist')
  })

  /* Missing wrapper prop, renders children */

  it('renders children when no wrappers are provided', () => {
    cy.mount(
      <Conditional condition={true}>
        <div>Test content</div>
      </Conditional>
    )

    cy.contains('Test content')
    cy.get('.wrapper').should('not.exist')
  })
})
