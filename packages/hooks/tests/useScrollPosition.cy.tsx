import * as React from 'react'
import { useScrollPosition } from '../src'

/**
 * @hook
 * useScrollPosition
 *
 * @tests
 * - Calls the onScroll callback on scroll
 * - Does not call the onScroll callback when inactive
 * - Properly throttles the onScroll callback with `wait` parameter
 * - Tracks the correct scroll position
 */

interface TestComponentProps {
  onScroll?: (props: { prevPos: number; currPos: number }) => void
  wait?: number
  active?: boolean
}

const TestComponent = ({ onScroll, wait, active }: TestComponentProps) => {
  useScrollPosition(onScroll, wait, active)
  return (
    <div data-cy="scroll" style={{ height: '2000px' }}>
      <div data-cy="title">Scrollable content</div>
    </div>
  )
}

describe('useScrollPosition', () => {
  /* Calls the onScroll callback on scroll */

  it('calls the onScroll callback on scroll', () => {
    const onScroll = cy.stub().as('onScroll')
    const wait = 100
    cy.mount(<TestComponent onScroll={onScroll} wait={wait} />)
    cy.wait(100)
    cy.scrollTo(0, 500)

    cy.wrap(onScroll).should('have.been.calledWith', {
      prevPos: 0,
      currPos: 500,
    })

    cy.get('@onScroll').should('have.been.calledOnce')
  })

  /* Does not call the onScroll callback when inactive */

  it('does not call the onScroll callback when inactive', () => {
    const onScroll = cy.stub().as('onScroll')
    cy.mount(<TestComponent onScroll={onScroll} active={false} />)
    cy.wait(100)
    cy.scrollTo(0, 500)
    cy.get('@onScroll').should('not.have.been.called')
  })

  /* Properly throttles the onScroll callback with `wait` parameter */

  it('throttles the onScroll callback with the wait prop', async () => {
    const onScroll = cy.stub().as('onScroll')
    cy.mount(<TestComponent onScroll={onScroll} wait={2000} />)
    cy.wait(100)
    cy.scrollTo(0, 500)
    cy.get('@onScroll').should('not.have.been.called')
    cy.wait(3000)
    cy.wrap(onScroll).should('have.been.calledOnce')
  })

  /* Tracks the correct scroll position */

  it('should update position.current with current position', () => {
    const onScroll = cy.stub().as('onScroll')
    cy.mount(<TestComponent onScroll={onScroll} />)
    cy.wait(200)
    // First scroll
    cy.scrollTo(0, 100)
    cy.wait(200)
    // Hard to trust Cypress scroll precision so we'll use approximations
    cy.wrap(onScroll).should('have.been.calledOnce')
    cy.wrap(onScroll).should(() => {
      const [args] = onScroll.getCall(0).args
      expect(args.currPos).to.be.greaterThan(0)
    })
    // Second scroll
    cy.scrollTo(0, 300)
    cy.wait(200)
    cy.wrap(onScroll).should('have.been.calledTwice')
    cy.wrap(onScroll).should(() => {
      const [args] = onScroll.getCall(1).args
      expect(args.currPos).to.be.greaterThan(250)
    })
    // Third scroll
    cy.scrollTo(0, 100)
    cy.wait(200)
    cy.wrap(onScroll).should('have.been.calledThrice')
    cy.wrap(onScroll).should(() => {
      const [args] = onScroll.getCall(2).args
      expect(args.currPos).to.be.lessThan(200)
    })
  })
})
