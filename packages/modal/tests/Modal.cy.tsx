import * as React from 'react'
import { Modal } from '../src'

/**
 * @component
 * Modal
 *
 * @tests
 * - Render with defaults
 * - Prop: `appendTo`
 * - Prop: `background`
 * - Prop: `title`
 * - Prop: `closeOnBlur`
 * - Prop: `focusRef`
 * - Prop: `center`
 * - Behavior: can be closed via `esc` key
 *
 * @notes
 * See useFocusTrap.cy.tsx for more detailed tests on the focus trap behavior
 *
 * @todo
 * Test all keyboard navigation scenarios
 */

const TestModal = (props) => {
  const [show, set] = React.useState(false)
  const focusRef = React.useRef(null)

  return (
    <div>
      <button ref={focusRef} onClick={(e) => set(!show)}>
        Toggle Modal
      </button>
      <Modal show={show} set={set} focusRef={focusRef} {...props}>
        {props.children}
      </Modal>
    </div>
  )
}

describe('Modal', () => {
  /* Render with defaults */

  it('renders when active and appends to the document body by default', () => {
    cy.mount(<TestModal>Modal content</TestModal>)
    cy.get('button').click()
    cy.get('#cy-root').should('not.contain', 'Modal content')
  })

  /* Prop: `appendTo` */

  it('attaches to a specified DOM node using ID selector with the `appendTo` prop', () => {
    cy.mount(<TestModal appendTo="cy-root">Modal content</TestModal>)
    cy.get('button').click()
    cy.root().first().contains('Modal content')
  })

  /* Prop: `background` */

  it('accepts a custom `background` prop', () => {
    cy.mount(<TestModal background="#2ebcbd">Modal content</TestModal>)
    cy.get('button').click()
    cy.get('[data-cy="modal-overlay"]').should(
      'have.backgroundColor',
      '#2ebcbd'
    )
  })

  /* Prop: `title` */

  it('accepts a custom `title` prop for its aria-label', () => {
    cy.mount(
      <TestModal title="Custom Modal" data-cy="modal">
        Modal content
      </TestModal>
    )
    cy.get('button').click()
    cy.get('[data-cy="modal"]').should(
      'have.attr',
      'aria-label',
      'Custom Modal'
    )
  })

  /* Prop: `closeOnBlur` */

  it('closes the modal when a user clicks the modal overlay', () => {
    cy.mount(
      <TestModal closeOnBlur data-cy="modal">
        <div>Modal content</div>
      </TestModal>
    )
    cy.get('button').click()
    cy.contains('Modal content')
    cy.get('[data-cy="modal-overlay"]').click()
    cy.get('[data-cy="modal"]').should('not.exist')
  })

  /* Prop: `focusRef` */

  it('sends focus to a specified ref with the `focusRef` prop', () => {
    cy.mount(<TestModal closeOnBlur>Modal content</TestModal>)
    cy.get('button').click()
    cy.contains('Modal content')
    cy.get('[data-cy="modal-overlay"]').click()
    cy.focused().contains('Toggle Modal')
  })

  /* Prop: `center` */

  it('centers child node in the middle of the viewport with the `center` prop', () => {
    cy.mount(
      <TestModal center data-cy="modal">
        Modal content
      </TestModal>
    )
    cy.get('button').click()
    cy.get('[data-cy="modal"]').should('have.css', 'align-items', 'center')
    cy.get('[data-cy="modal"]').should('have.css', 'justify-content', 'center')
  })

  /* Behavior: can be closed via `esc` key */

  it('closes the modal with the `Esc` key', () => {
    cy.mount(
      <TestModal closeOnBlur data-cy="modal">
        Modal content
      </TestModal>
    )
    cy.get('button').click()
    cy.contains('Modal content')
    cy.get('[data-cy="modal"]').type('{esc}')
    cy.get('[data-cy="modal"]').should('not.exist')
    cy.focused().contains('Toggle Modal')
  })
})
