import * as React from 'react'
import { CSSTransition, type CSSTransitionProps } from '../src'

/**
 * @component
 * CSSTransition
 *
 * @tests
 * - Render with defaults
 * - Prop: `show` (all types)
 * - Prop: `isSwitch`
 * - Prop: `type`
 * - Prop: `className`
 * - Prop: `containerProps`
 * - Prop: `timeout`, `easing`, `distance`
 * - Prop: `noStyles`
 */

const TestComponent = (props: Partial<CSSTransitionProps>) => {
  const [show, set] = React.useState(false)
  return (
    <div data-cy="container">
      <button onClick={() => set(!show)}>Show</button>
      <div id="container">
        <div id="child" />
      </div>
      <CSSTransition show={props?.show || show} {...props} data-cy="transition">
        <div data-cy="new-content">Content</div>
      </CSSTransition>
    </div>
  )
}

const NumberSwitchComponent = (props: Partial<CSSTransitionProps>) => {
  const [show, set] = React.useState(0)
  return (
    <div>
      <button data-cy="btn-0" onClick={() => set(0)}>
        Show 0
      </button>
      <button data-cy="btn-1" onClick={() => set(1)}>
        Show 1
      </button>
      <button data-cy="btn-2" onClick={() => set(2)}>
        Show 2
      </button>
      <CSSTransition show={show} {...props}>
        {show === 1 ? (
          <div data-cy="content-1">Content 1</div>
        ) : show === 2 ? (
          <div data-cy="content-2">Content 2</div>
        ) : (
          <div data-cy="content-0">Content 0</div>
        )}
      </CSSTransition>
    </div>
  )
}

const StringSwitchComponent = (props: Partial<CSSTransitionProps>) => {
  const [show, set] = React.useState('0')
  return (
    <div>
      <button data-cy="btn-0" onClick={() => set('0')}>
        Show 0
      </button>
      <button data-cy="btn-1" onClick={() => set('1')}>
        Show 1
      </button>
      <button data-cy="btn-2" onClick={() => set('2')}>
        Show 2
      </button>
      <CSSTransition show={show} {...props}>
        {show === '1' ? (
          <div data-cy="content-1">Content 1</div>
        ) : show === '2' ? (
          <div data-cy="content-2">Content 2</div>
        ) : (
          <div data-cy="content-0">Content 0</div>
        )}
      </CSSTransition>
    </div>
  )
}

const BooleanSwitchComponent = (props: Partial<CSSTransitionProps>) => {
  const [show, set] = React.useState(true)
  return (
    <div>
      <button onClick={() => set(!show)}>Show</button>
      <div id="container">
        <div id="child" />
      </div>
      <CSSTransition show={show} {...props}>
        {show ? (
          <div data-cy="content-0">Content</div>
        ) : (
          <div data-cy="content-1">Content</div>
        )}
      </CSSTransition>
    </div>
  )
}

describe('CSSTransition', () => {
  /** Renders with default props */

  it('renders with default props', () => {
    cy.mount(<TestComponent />)
    cy.get('[data-cy="new-content"]').should('not.exist')
  })

  /* Prop: `show` */

  it('shows / hides the child component depending on the value of `show`', () => {
    // Show / hide one element with a boolean
    cy.mount(<TestComponent />)
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('exist')
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('not.exist')
    // Show / hide multiple elements with a number
    cy.mount(<NumberSwitchComponent />)
    cy.get('[data-cy="content-0"]').should('exist')
    cy.get('[data-cy="content-1"]').should('not.exist')
    cy.get('[data-cy="content-2"]').should('not.exist')
    cy.get('[data-cy="btn-1"]').click()
    cy.get('[data-cy="content-0"]').should('not.exist')
    cy.get('[data-cy="content-1"]').should('exist')
    cy.get('[data-cy="content-2"]').should('not.exist')
    cy.get('[data-cy="btn-2"]').click()
    cy.get('[data-cy="content-0"]').should('not.exist')
    cy.get('[data-cy="content-1"]').should('not.exist')
    cy.get('[data-cy="content-2"]').should('exist')
    cy.get('[data-cy="btn-0"]').click()
    cy.get('[data-cy="content-0"]').should('exist')
    cy.get('[data-cy="content-1"]').should('not.exist')
    cy.get('[data-cy="content-2"]').should('not.exist')
    // Show / hide multiple elements with a string
    cy.mount(<StringSwitchComponent />)
    cy.get('[data-cy="content-0"]').should('exist')
    cy.get('[data-cy="content-1"]').should('not.exist')
    cy.get('[data-cy="content-2"]').should('not.exist')
    cy.get('[data-cy="btn-1"]').click()
    cy.get('[data-cy="content-0"]').should('not.exist')
    cy.get('[data-cy="content-1"]').should('exist')
    cy.get('[data-cy="content-2"]').should('not.exist')
    cy.get('[data-cy="btn-2"]').click()
    cy.get('[data-cy="content-0"]').should('not.exist')
    cy.get('[data-cy="content-1"]').should('not.exist')
    cy.get('[data-cy="content-2"]').should('exist')
    cy.get('[data-cy="btn-0"]').click()
    cy.get('[data-cy="content-0"]').should('exist')
    cy.get('[data-cy="content-1"]').should('not.exist')
    cy.get('[data-cy="content-2"]').should('not.exist')
  })

  /* Prop: `isSwitch` */

  it('toggles between two components using `isSwitch` and `show` as a boolean', () => {
    cy.mount(<BooleanSwitchComponent isSwitch />)
    cy.get('[data-cy="content-0"]').should('exist')
    cy.get('[data-cy="content-1"]').should('not.exist')
    cy.get('button').click()
    cy.get('[data-cy="content-0"]').should('not.exist')
    cy.get('[data-cy="content-1"]').should('exist')
  })

  /* Prop: `type` */

  it('renders the correct type of transition', () => {
    // Fade
    cy.mount(<TestComponent type="fade" />)
    cy.get('[data-cy="new-content"]').should('not.exist')
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('have.css', 'opacity', '1')
    cy.get('[data-cy="transition"]')
      .invoke('attr', 'class')
      .then((classes) => {
        expect(classes).to.include('fade-enter-active')
      })
    // Fade Up
    cy.mount(<TestComponent type="fade-up" />)
    cy.get('[data-cy="new-content"]').should('not.exist')
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('have.css', 'opacity', '1')
    cy.get('[data-cy="new-content"]').should('have.css', 'transform', 'none')
    cy.get('[data-cy="transition"]')
      .invoke('attr', 'class')
      .then((classes) => {
        expect(classes).to.include('fade-up-enter-active')
      })
    // Fade Down
    cy.mount(<TestComponent type="fade-down" />)
    cy.get('[data-cy="new-content"]').should('not.exist')
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('have.css', 'opacity', '1')
    cy.get('[data-cy="new-content"]').should('have.css', 'transform', 'none')
    cy.get('[data-cy="transition"]')
      .invoke('attr', 'class')
      .then((classes) => {
        expect(classes).to.include('fade-down-enter-active')
      })
    // Fade Left
    cy.mount(<TestComponent type="fade-left" />)
    cy.get('[data-cy="new-content"]').should('not.exist')
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('have.css', 'opacity', '1')
    cy.get('[data-cy="new-content"]').should('have.css', 'transform', 'none')
    cy.get('[data-cy="transition"]')
      .invoke('attr', 'class')
      .then((classes) => {
        expect(classes).to.include('fade-left-enter-active')
      })
    // Fade Right
    cy.mount(<TestComponent type="fade-right" />)
    cy.get('[data-cy="new-content"]').should('not.exist')
    cy.get('button').click()
    cy.get('[data-cy="new-content"]').should('have.css', 'opacity', '1')
    cy.get('[data-cy="new-content"]').should('have.css', 'transform', 'none')
    cy.get('[data-cy="transition"]')
      .invoke('attr', 'class')
      .then((classes) => {
        expect(classes).to.include('fade-right-enter-active')
      })
  })

  /* Prop: `className` */

  it('renders a custom className prefix', () => {
    cy.mount(<TestComponent className="custom" />)
    cy.get('button').click()
    cy.get('[data-cy="transition"]')
      .invoke('attr', 'class')
      .then((classes) => {
        expect(classes).to.include('custom-enter-active')
      })
  })

  /* Prop: `containerProps` */

  it('passes props to the container via `containerProps`', () => {
    cy.mount(<TestComponent containerProps={{ className: 'custom' }} />)
    cy.get('[data-cy="custom"]').should('not.exist')
    cy.get('button').click()
    cy.get('.custom').should('exist')
  })

  /* Prop: `timeout`, `easing`, `distance` */
  // TODO: Fix this test - this is a tougher one to test since the transition toggles numerous classes

  // it.only('renders the correct transition duration, easing, and distance', () => {
  //   cy.mount(<TestComponent timeout={1000} easing="ease-in" distance="100px" />)
  //   cy.get('button').click()
  //   cy.get('[data-cy="transition"]').should(
  //     'have.css',
  //     'transition',
  //     'all ease-in 100ms'
  //   )
  // })

  /* Prop: `noStyles` */

  it('does not render transition styles if `noStyles` is true', () => {
    cy.mount(<TestComponent noStyles />)
    cy.get('button').click()
    cy.get('[data-cy="container"] style').should('not.exist')
  })
})
