import * as React from 'react'
import { Popover } from '../src'
import { PopoverProps } from '../src/Popover'

/**
 * @component
 * Popover
 *
 * @tests
 * - Render with defaults
 * - Prop: `css`,
 * - Prop: `trapFocus`
 * - Prop: `appendTo`
 * - Prop: `anchorWidth`
 * - Prop: `transition` (visual)
 * - Prop: `gap` (visual)
 * - Prop: `position` (visual)
 * - Behavior: closes on tab when focus leaves the popover
 *
 * @todo
 * - Add test for defer measurements fix. Or remove all together
 * - Add visual snapshot testing for visual tests
 */

interface TestPopoverProps extends Partial<PopoverProps> {
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>
}

const TestPopover = ({ children, buttonProps, ...props }: TestPopoverProps) => {
  const [show, set] = React.useState(false)
  const buttonRef = React.useRef(null)

  return (
    <div
      className="flex align-center justify-center"
      style={{ height: '100vh', width: '100vw' }}>
      <button
        data-cy="btn-activate"
        ref={buttonRef}
        onClick={() => set(!show)}
        {...buttonProps}>
        Popover toggle
      </button>
      <Popover
        data-cy="popover"
        show={show}
        set={set}
        anchorRef={buttonRef}
        {...props}>
        {children}
      </Popover>
    </div>
  )
}

describe('Popover', () => {
  /* Render with defaults */

  it('renders with default props', () => {
    cy.mount(<TestPopover>Popover-content</TestPopover>)
    cy.get('[data-cy="popover"]').should('not.exist')
    cy.get('button').click()
    cy.get('[data-cy="popover"]').contains('Popover-content')
    // Confirm it attaches popover to body element
    cy.get('#cy-root').should('not.contain', 'Popover-content')
  })

  /* Prop: `css`  */

  it('applies `css` to the popover content', () => {
    // Also test merged className
    cy.mount(
      <TestPopover css={{ background: '#000', span: { padding: 10 } }}>
        <span>Popover-content</span>
      </TestPopover>
    )
    cy.get('button').click()
    cy.get('[data-cy="popover"]').should('have.backgroundColor', '#000')
    cy.get('[data-cy="popover"] span').should('have.css', 'padding', '10px')
  })

  /* Prop: `trapFocus` */

  it('traps focus inside the popover with `trapFocus` (keyboard)', () => {
    // trapFocus = true
    cy.mount(
      <>
        <TestPopover trapFocus>
          <button id="btn-1">Popover button</button>
          <button id="btn-2">Popover button</button>
          <button id="btn-3">Popover button</button>
        </TestPopover>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.get('[data-cy="btn-activate"]').click()
    // @ts-ignore
    cy.get('#btn-1').tab()
    // @ts-ignore
    cy.get('#btn-2').tab()
    // @ts-ignore
    cy.get('#btn-3').tab()
    cy.get('#btn-1').should('have.focus')
    cy.get('[data-cy="btn-activate"]').click()
  })

  it.only('does not trap focus inside the popover by default', () => {
    // trapFocus = false
    cy.mount(
      <>
        <TestPopover>
          <button id="btn-1">Popover button</button>
          <button id="btn-2">Popover button</button>
          <button id="btn-3">Popover button</button>
        </TestPopover>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.get('[data-cy="btn-activate"]').click()
    cy.tab()
    cy.tab()
    cy.tab()
    cy.get('#new-focus').should('have.focus')
    cy.get('[data-cy="popover"]').should('not.exist')
  })

  /* Prop: `appendTo` */

  it('adds the popover to a specified DOM node with the `appendTo` prop', () => {
    cy.mount(<TestPopover appendTo="cy-root">Popover-content</TestPopover>)
    cy.get('button').click()
    cy.root().contains('Popover-content')
  })

  /* Prop: `anchorWidth` */

  it('matches the width of the anchor element with the `matchWidth` prop', () => {
    cy.mount(
      <TestPopover buttonProps={{ style: { width: 500 } }}>
        Popover-content
      </TestPopover>
    )
    cy.get('button').click()
    cy.get('[data-cy="popover"]').should('not.have.css', 'width', '500px')

    cy.mount(
      <TestPopover matchWidth buttonProps={{ style: { width: 500 } }}>
        Popover-content
      </TestPopover>
    )
    cy.get('button').click()
    cy.get('[data-cy="popover"]').should('have.css', 'width', '500px')
  })

  /* Prop: `transition` (visual) */

  it('supports no transition', () => {
    cy.mount(<TestPopover transition="none">Popover-content</TestPopover>)
    cy.get('button').click()
    cy.get('[data-cy="popover"]').should('have.css', 'visibility', 'visible')
  })

  // VISUAL TEST - transition
  it('supports fade-up transition', () => {
    cy.mount(<TestPopover transition="fade-up">Popover-content</TestPopover>)
    cy.get('button').click()
  })

  it('supports fade-down transition', () => {
    cy.mount(<TestPopover transition="fade-down">Popover-content</TestPopover>)
    cy.get('button').click()
  })

  it('supports fade-left transition', () => {
    cy.mount(<TestPopover transition="fade-left">Popover-content</TestPopover>)
    cy.get('button').click()
  })

  it('supports fade-left transition', () => {
    cy.mount(<TestPopover transition="fade-right">Popover-content</TestPopover>)
    cy.get('button').click()
  })

  /* Prop: `gap` (visual) */

  // VISUAL TEST - gap
  it('adds margin to the popover relative to its anchor with the `gap` prop', () => {
    cy.mount(
      <TestPopover
        buttonProps={{ style: { width: 300 } }}
        offset={20}
        position={{ x: 'right', y: 'center' }}>
        Popover-content
      </TestPopover>
    )
    cy.get('button').click()
  })

  /* Prop: `position` (visual) */

  // VISUAL TEST - position
  it('uses the `position` prop -- left, center (visual)', () => {
    cy.mount(
      <TestPopover position={{ x: 'left', y: 'center' }}>
        Popover-content
      </TestPopover>
    )
    cy.get('button').click()
  })

  // VISUAL TEST - position
  it('uses the `position` prop -- right, top (visual)', () => {
    cy.mount(
      <TestPopover position={{ x: 'right', y: 'top' }}>
        Popover-content
      </TestPopover>
    )
    cy.get('button').click()
  })

  // VISUAL TEST - position
  it('uses the `position` prop -- center, center (visual)', () => {
    cy.mount(
      <TestPopover
        css={{ background: '#d3d3d3', height: 300 }}
        position={{ x: 'center', y: 'top' }}>
        Popover-content
      </TestPopover>
    )
    cy.get('button').click()
  })

  // VISUAL TEST - position
  it('uses the `position` prop -- origin, bottom (visual)', () => {
    cy.mount(
      <TestPopover position={{ x: 'origin', y: 'bottom' }}>
        Popover-content
      </TestPopover>
    )
    cy.get('button').click()
  })

  /* Behavior: closes on tab when focus leaves the popover */

  it('closes the popover when focus leaves its inner contents with `closeOnBlur` (keyboard)', () => {
    // closeOnBlur = true
    cy.mount(
      <>
        <TestPopover>
          <button>Popover button</button>
        </TestPopover>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.get('.test-btn').click()
    // @ts-ignore
    cy.get('[data-cy="popover"] button').tab()
    cy.get('[data-cy="popover"]').should('not.exist')
  })
})
