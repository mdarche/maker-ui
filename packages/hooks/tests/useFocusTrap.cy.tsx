import * as React from 'react'
import { useFocusTrap } from '../src/useFocusTrap'

/**
 * @hook
 * useFocusTrap
 *
 * @tests
 * - Traps focus within the container when active
 * - Does not trap focus when inactive
 * - Invokes callback when focus is trapped
 */

const TestComponent = ({ callback }: { callback?: () => void }) => {
  const [active, setActive] = React.useState(true)
  const ref = React.useRef<HTMLDivElement>(null)
  useFocusTrap(ref, active, callback)

  return (
    <div data-cy="component">
      <button>Outside button 1</button>
      <div ref={ref} data-testid="container">
        <a data-testid="third" href="/">
          Link 1
        </a>
        <button>Button 1</button>
        <input type="text" placeholder="Input 1" />
        <div>
          <button>Button 2</button>
          <input type="text" placeholder="Input 2" />
        </div>
      </div>
      <button>Outside button 2</button>
      <button data-cy="activate" onClick={() => setActive(!active)}>
        {active ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  )
}

/* Traps focus within the container when active */

describe('useFocusTrap', () => {
  it('traps focus within the container when active', () => {
    cy.mount(<TestComponent />)
    cy.tab()
    cy.focused().should('have.text', 'Link 1')
    cy.tab()
    cy.focused().should('have.text', 'Button 1')
    cy.tab()
    cy.focused().should('have.attr', 'placeholder', 'Input 1')
    cy.tab()
    cy.focused().should('have.text', 'Button 2')
    cy.tab()
    cy.focused().should('have.attr', 'placeholder', 'Input 2')
    cy.tab()
    cy.focused().should('have.text', 'Link 1')
    cy.tab({ shift: true })
    cy.focused().should('have.attr', 'placeholder', 'Input 2')
    cy.tab({ shift: true })
    cy.focused().should('have.text', 'Button 2')
    cy.tab({ shift: true })
    cy.focused().should('have.attr', 'placeholder', 'Input 1')
    cy.tab({ shift: true })
    cy.focused().should('have.text', 'Button 1')
    cy.tab({ shift: true })
    cy.focused().should('have.text', 'Link 1')
    cy.tab({ shift: true })
    cy.focused().should('have.attr', 'placeholder', 'Input 2')
  })

  /* Does not trap focus when inactive */

  it('does not trap focus when not active', () => {
    cy.mount(<TestComponent />)
    cy.get('[data-cy="activate"]').click()
    cy.get('body').tab()
    cy.focused().should('have.text', 'Outside button 1')
    cy.tab()
    cy.tab()
    cy.tab()
    cy.tab()
    cy.tab()
    cy.tab()
    cy.focused().should('have.text', 'Outside button 2')
  })

  /* Invokes callback when focus is trapped */

  it('calls an exit callback function when active changes to false after previously being true', () => {
    const callback = cy.stub()
    cy.mount(<TestComponent callback={callback} />)
    cy.get('[data-cy="activate"]').click()
    cy.wrap(callback).should('have.been.calledOnce')
    cy.get('[data-cy="activate"]').click()
    cy.get('[data-cy="activate"]').click()
    cy.wrap(callback).should('have.been.calledTwice')
  })
})
