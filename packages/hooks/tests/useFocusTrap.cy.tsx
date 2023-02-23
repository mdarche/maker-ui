import * as React from 'react'
import { useFocusTrap } from '../src/useFocusTrap'

const TestComponent = ({ active }: { active?: boolean }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  useFocusTrap(ref, active)

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
    </div>
  )
}

describe('useFocusTrap', () => {
  it('traps focus within the container by default', () => {
    cy.mount(<TestComponent />)
    cy.tab()
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

  it('does not trap focus when `active` is false', () => {
    cy.mount(<TestComponent active={false} />)
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
})
