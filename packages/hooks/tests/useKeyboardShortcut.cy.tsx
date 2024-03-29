import * as React from 'react'
import { useKeyboardShortcut } from '../src'

/**
 * @hook
 * useKeyboardShortcut
 *
 * @tests
 * - Does not register any keyboard shortcuts if active is false
 * - Triggers a callback when a matching keyboard shortcut is pressed
 * - Does not trigger a callback when a non-matching keyboard shortcut is pressed
 * - Properly handles modifier keys
 * - Assigns keyboard shortcuts to a custom ref
 */

const MockComponent = ({
  shortcuts,
  customRef,
  active,
}: {
  shortcuts: Parameters<typeof useKeyboardShortcut>[0]
  customRef?: boolean
  active?: boolean
}) => {
  const ref = React.useRef(null)
  useKeyboardShortcut(shortcuts, customRef ? ref : undefined, active)

  return (
    <div tabIndex={0} data-cy="focus" ref={ref}>
      Mock Component
    </div>
  )
}

describe('useKeyboardShortcut', () => {
  /* Does not register any keyboard shortcuts if active is false */

  it('does not register any keyboard shortcuts if active is false', () => {
    const callback = cy.stub().as('callback')
    const shortcuts = [{ key: 'KeyA', callback }]
    cy.mount(<MockComponent shortcuts={shortcuts} active={false} />)
    cy.wait(100)
    cy.get('body').type('a')
    cy.get('@callback').should('not.have.been.called')
  })

  /* Triggers a callback when a matching keyboard shortcut is pressed */

  it('triggers a callback when a matching keyboard shortcut is pressed', () => {
    const callback = cy.stub().as('callback')
    const shortcuts = [{ key: 'KeyA', callback }]
    cy.mount(<MockComponent shortcuts={shortcuts} />)
    cy.wait(100)
    cy.get('body').type('a')
    cy.get('@callback').should('have.been.calledOnce')
  })

  /* Does not trigger a callback when a non-matching keyboard shortcut is pressed */

  it('does not trigger callback when a non-matching keyboard shortcut is pressed', () => {
    const callback = cy.stub().as('callback')
    const shortcuts = [{ key: 'KeyA', callback }]
    cy.mount(<MockComponent shortcuts={shortcuts} />)
    cy.wait(100)
    cy.get('body').type('b')
    cy.get('@callback').should('not.have.been.calledOnce')
  })

  /* Properly handles modifier keys */

  it('does not trigger callback when modifier keys do not match', () => {
    const callback = cy.stub().as('callback')
    const shortcuts = [
      { key: 'KeyA', shiftKey: true, callback },
      { key: 'KeyB', altKey: true, callback },
      { key: 'KeyC', ctrlKey: true, callback },
    ]
    cy.mount(<MockComponent shortcuts={shortcuts} />)
    cy.wait(100)
    cy.get('body').type('a')
    cy.get('body').type('b')
    cy.get('body').type('c')
    cy.get('@callback').should('not.have.been.calledOnce')
  })

  it('triggers a callback when modifier keys match', () => {
    const callback = cy.stub().as('callback')
    const shortcuts = [
      { key: 'KeyA', shiftKey: true, callback },
      { key: 'KeyB', altKey: true, callback },
      { key: 'KeyC', ctrlKey: true, callback },
    ]
    cy.mount(<MockComponent shortcuts={shortcuts} />)
    cy.wait(100)
    cy.get('body').type('{shift}a')
    cy.get('body').type('{alt}b')
    cy.get('body').type('{ctrl}c')
    cy.get('@callback').should('have.been.calledThrice')
  })

  /* Assigns keyboard shortcuts to a custom ref */

  it('only listens to keydown events on the ref element if provided', () => {
    const callback = cy.stub().as('callback')
    const shortcuts = [{ key: 'KeyA', callback }]
    cy.mount(<MockComponent shortcuts={shortcuts} customRef />)
    cy.wait(100)
    cy.get('body').type('a')
    cy.get('[data-cy="focus"]').type('a')
    cy.get('@callback').should('have.been.calledOnce')
  })
})
