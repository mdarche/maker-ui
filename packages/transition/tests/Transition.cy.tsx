import * as React from 'react'
import { Transition, type TransitionProps } from '../src'

/**
 * @component
 * Transition
 *
 * @tests
 * - Render with defaults
 * - Prop: `show`
 * - Prop: `unmountOnExit`
 * - Prop: `containerProps`
 * - Prop: `easing`, `timeout`
 * - Prop: `transitionState`
 */

const TestComponent = (props: Partial<TransitionProps>) => {
  const [show, set] = React.useState(false)
  return (
    <div>
      <button onClick={() => set(!show)}>Show</button>
      <div id="container">
        <div id="child" />
      </div>
      <Transition show={show} {...props}>
        <div data-cy="new-content">Content</div>
      </Transition>
    </div>
  )
}

describe('Transition', () => {
  /* Render with defaults */

  it('renders with default props', () => {
    cy.mount(<TestComponent />)
    cy.get('[data-cy="new-content"]').should('not.exist')
  })

  /* Prop: `show` */

  it('will show / hide the child component depending on the value of `show`', () => {
    cy.mount(<TestComponent />)
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('exist')
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('not.exist')
  })

  /* Prop: `unmountOnExit` */

  it('does not unmount the component when `unmountOnExit` is false', () => {
    cy.mount(<TestComponent unmountOnExit={false} />)
    cy.get('[data-cy="new-content"]').should('exist')
    cy.get('[data-cy="new-content"]').should('not.be.visible')
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('be.visible')
  })

  /* Prop: `containerProps` */

  it('passes props to the container via `containerProps`', () => {
    cy.mount(<TestComponent containerProps={{ 'data-cy': 'container' }} />)
    cy.get('[data-cy="new-content"]').should('not.exist')
    cy.get('button').click()
    cy.get('[data-cy="container"]').should('exist')
  })

  /* Props: `easing`, `timeout` */

  it('allows the easing curve and timeout to be customized', () => {
    cy.mount(
      <TestComponent
        easing="linear"
        timeout={1000}
        containerProps={{ 'data-cy': 'container' }}
      />
    )
    cy.get('button').click()
    cy.get('[data-cy="container"]').should(
      'have.css',
      'transition',
      'all 1s linear 0s'
    )
  })

  /* Prop: `transitionState` */

  it('should use the provided `transitionState` prop', () => {
    const transitionState = {
      start: { opacity: 0, transform: 'scale(0.5)' },
      entering: { opacity: 1, transform: 'scale(1)' },
      entered: { opacity: 1, transform: 'scale(1)' },
      exiting: { opacity: 0, transform: 'scale(0.5)' },
      exited: { opacity: 0, transform: 'scale(0.5)' },
    }

    cy.mount(
      <TestComponent
        transitionState={transitionState}
        unmountOnExit={false}
        containerProps={{ 'data-cy': 'container' }}
      />
    )
    cy.get('button').click()
    cy.get('[data-cy="container"]').should('have.css', 'opacity', '1')
    cy.get('[data-cy="container"]').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)'
    )
    cy.get('button').click()
    cy.get('[data-cy="container"]').should('have.css', 'opacity', '0')
    cy.get('[data-cy="container"]').should(
      'have.css',
      'transform',
      'matrix(0.5, 0, 0, 0.5, 0, 0)'
    )
  })
})
