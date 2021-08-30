import * as React from 'react'
import { Modal } from '@maker-ui/elements'
import { mount } from '@cypress/react'

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
 * - Prop: `css`, `_css`
 * - Prop: `spring`
 * - Behavior: can be closed via `esc` key
 *
 * @notes
 * See Dropdown.spec.tsx and Popover.spec.tsx for trapping focus implementation
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

  it('renders with default props', () => {
    mount(<TestModal>Modal content</TestModal>)
    cy.get('button').click()
    cy.contains('Modal content')
  })

  /* Prop: `appendTo` */

  it('attaches to a specified DOM node using ID selector with the `appendTo` prop', () => {
    mount(<TestModal appendTo="__cy_root">Modal content</TestModal>)
    cy.get('button').click()
    // If this ever breaks, check to see if the root ID for Cypress has changed
    cy.get('#__cy_root div').last().contains('Modal content')
  })

  /* Prop: `background` */

  it('accepts a custom `background` prop', () => {
    mount(<TestModal background="#2ebcbd">Modal content</TestModal>)
    cy.get('button').click()
    cy.get('.modal-overlay').should('have.backgroundColor', '#2ebcbd')
  })

  /* Prop: `title` */

  it('accepts a custom `title` prop for its aria-label', () => {
    mount(<TestModal title="Custom Modal">Modal content</TestModal>)
    cy.get('button').click()
    cy.get('.modal').should('have.attr', 'aria-label', 'Custom Modal')
  })

  /* Prop: `closeOnBlur` */

  it('closes the modal `onBlur`', () => {
    mount(<TestModal closeOnBlur>Modal content</TestModal>)
    cy.get('button').click()
    cy.contains('Modal content')
    cy.get('.modal-overlay').click()
    cy.get('.modal').should('not.exist')
  })

  /* Prop: `focusRef` */

  it('sends focus to a specified ref with the `focusRef` prop', () => {
    mount(<TestModal closeOnBlur>Modal content</TestModal>)
    cy.get('button').click()
    cy.contains('Modal content')
    cy.get('.modal-overlay').click()
    cy.focused().contains('Toggle Modal')
  })

  /* Prop: `center` */

  it('centers child node in the middle of the viewport with the `center` prop', () => {
    mount(<TestModal center>Modal content</TestModal>)
    cy.get('button').click()
    cy.get('.modal').should('have.css', 'align-items', 'center')
    cy.get('.modal').should('have.css', 'justify-content', 'center')
  })

  /* Prop: `css`, `_css` */

  it('applies `_css` to the modal root and `css` to the modal content wrapper', () => {
    mount(
      <TestModal
        className="custom-modal"
        _css={{ padding: 20 }}
        css={{ margin: 20 }}>
        Modal content
      </TestModal>
    )
    cy.get('button').click()
    cy.get('.custom-modal.modal').should('have.css', 'padding', '20px')
    cy.get('.modal-content').should('have.css', 'margin', '20px')
  })

  /* Prop: `spring` */

  it('supports a custom React Spring mounting transition with the `spring` prop (visual)', () => {
    // This should look ridiculous --> fade in and out like a spring
    mount(
      <TestModal spring={{ tension: 500, friction: 2, mass: 1 }}>
        Modal content
      </TestModal>
    )
    cy.get('button').click()
  })

  /* Behavior: can be closed via `esc` key */

  it('closes the modal with the `Esc` key', () => {
    mount(<TestModal closeOnBlur>Modal content</TestModal>)
    cy.get('button').click()
    cy.contains('Modal content')
    cy.get('.modal').type('{esc}')
    cy.get('.modal').should('not.exist')
  })
})
