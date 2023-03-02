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
    <div>
      <button onClick={() => set(!show)}>Show</button>
      <div id="container">
        <div id="child" />
      </div>
      <CSSTransition show={props?.show || show} {...props}>
        <div data-cy="new-content">Content</div>
      </CSSTransition>
    </div>
  )
}

describe('CSSTransition', () => {
  it.only('renders with default props', () => {
    cy.mount(<TestComponent />)
    cy.get('[data-cy="new-content"]').should('not.exist')
  })
})
