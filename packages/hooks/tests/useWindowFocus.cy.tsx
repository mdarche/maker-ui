import * as React from 'react'
import { useWindowFocus } from '../src'

/**
 * @hook
 * useWindowFocus
 *
 * @tests
 * - Returns true when the window is focused
 * - Returns false when the window is blurred
 * - Invokes a callback when the hook is active
 * - Does not invoke a callback when the hook is inactive
 */

const TestComponent = ({
  callback,
  active,
}: {
  callback?: () => void
  active?: boolean
}) => {
  const focused = useWindowFocus(callback, active)

  return <div data-cy="isFocused">{focused ? 'focus' : 'blur'}</div>
}

describe('useWindowFocus', () => {
  /* Returns true when the window is focused */

  it('returns true when the window is focused', () => {
    cy.mount(<TestComponent />)
    cy.wait(100)
    cy.get('[data-cy="isFocused"]').should('have.text', 'focus')
  })

  /* Returns false when the window is blurred */

  it('returns false when the window is blurred', () => {
    const callback = cy.stub()
    cy.mount(<TestComponent callback={callback} />)
    cy.wait(100)
    cy.window().blur()
    cy.get('[data-cy="isFocused"]').should('have.text', 'blur')
  })

  /* Invokes a callback when the hook is active */

  it('invokes a callback when the hook is active', () => {
    const callback = cy.stub()
    cy.mount(<TestComponent callback={callback} />)
    cy.wait(100)
    cy.window().blur()
    cy.window().focus()
    cy.wrap(callback).should('have.been.calledTwice')
  })

  /* Does not invoke a callback when the hook is inactive */

  it('does not invoke a callback when the hook is inactive', () => {
    const callback = cy.stub()
    cy.mount(<TestComponent callback={callback} active={false} />)
    cy.wait(100)
    cy.window().blur()
    cy.window().focus()
    cy.window().blur()
    cy.wrap(callback).should('not.have.been.called')
  })
})
