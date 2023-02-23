import * as React from 'react'
import { useWindowSize } from '../src/useWindowSize'

const TestComponent = ({ callback }: { callback?: () => void }) => {
  const { height, width } = useWindowSize(callback)

  return (
    <>
      <div data-cy="height">{height}</div>
      <div data-cy="width">{width}</div>
    </>
  )
}

describe('useWindowSize', () => {
  it('returns the window size on every resize', () => {
    cy.mount(<TestComponent />)
    cy.get('[data-cy="width"]').should('not.have.text', '500')
    cy.get('[data-cy="height"]').should('not.have.text', '400')
    cy.wait(500)
    cy.viewport(500, 400)
    cy.get('[data-cy="width"]').should('have.text', '500')
    cy.get('[data-cy="height"]').should('have.text', '400')
    cy.viewport(800, 1200)
    cy.get('[data-cy="width"]').should('have.text', '800')
    cy.get('[data-cy="height"]').should('have.text', '1200')
  })

  it('invokes a callback function on resize', () => {
    const callback = cy.stub()
    cy.mount(<TestComponent callback={callback} />)
    cy.wait(500)
    cy.viewport(500, 400)
    cy.wait(500)
    cy.viewport(800, 1200)
    cy.wait(500)
    cy.wrap(callback).should('have.been.calledTwice')
  })
})
