import * as React from 'react'
import { Conditional } from '../src'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  return <div className="wrapper">{children}</div>
}

describe('Conditional', () => {
  it('renders children without wrapper when condition is false', () => {
    cy.mount(
      <Conditional condition={false} wrapper={(c) => <Wrapper>{c}</Wrapper>}>
        <div>Test content</div>
      </Conditional>
    )

    cy.contains('Test content')
    cy.get('.wrapper').should('not.exist')
  })

  it('renders children with wrapper when condition is true', () => {
    cy.mount(
      <Conditional condition={true} wrapper={(c) => <Wrapper>{c}</Wrapper>}>
        <div>Test content</div>
      </Conditional>
    )

    cy.contains('Test content')
    cy.get('.wrapper').should('exist')
  })

  it('renders children when no wrapper provided', () => {
    cy.mount(
      <Conditional condition={true}>
        <div>Test content</div>
      </Conditional>
    )

    cy.contains('Test content')
    cy.get('.wrapper').should('not.exist')
  })
})
