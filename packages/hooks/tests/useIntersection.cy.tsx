import * as React from 'react'
import { useIntersection } from '../src'

/**
 * @hook
 * useIntersection
 *
 * @tests
 * - Detects when an element is visible
 * - Detects when an element is not visible
 * - Detects when an element is visible with a custom offset
 * - Invokes a callback when the element is visible
 */

interface Props {
  customRoot?: boolean
  offset?: number | string
  threshold?: number
  onIntersect?: (isVisible: boolean) => void
  height?: boolean
}

const TestComponent = ({
  customRoot,
  onIntersect,
  offset,
  threshold,
  height = true,
}: Props) => {
  const ref = React.useRef(null)
  const rootRef = React.useRef(null)
  const visible = useIntersection({
    ref,
    root: customRoot ? rootRef : undefined,
    offset,
    threshold,
    onIntersect,
  })

  return (
    <div style={{ height: height ? '100vh' : undefined }}>
      <div ref={ref} data-cy="target" style={{ height: 500 }}>
        {visible ? 'Visible' : 'Not visible'}
      </div>
      <div ref={rootRef} style={{ height: '100vh' }}>
        Below
      </div>
    </div>
  )
}

describe('useIntersection', () => {
  /* Detects when the target is visible */

  it('detects when the target is visible', () => {
    cy.mount(
      <>
        <div style={{ height: 100 }} />
        <TestComponent />
      </>
    )
    cy.get('[data-cy="target"]').should('have.text', 'Visible')
  })

  /* Detects when the target is not visible */

  it('detects when the target is not visible', () => {
    cy.mount(
      <>
        <TestComponent />
        <div style={{ height: 1000 }} />
      </>
    )
    cy.scrollTo(0, 1000)
    cy.wait(200)
    cy.get('[data-cy="target"]').should('have.text', 'Not visible')
  })

  /* Handles the offset value */

  it('accounts for the offset value if provided', () => {
    cy.viewport(1280, 800)
    cy.mount(
      <>
        <div style={{ height: 1500 }} />
        <TestComponent height={false} offset="-500px 0px 0px 0px" />
      </>
    )
    cy.wait(200)
    cy.get('[data-cy="target"]').should('have.text', 'Not visible')
    cy.scrollTo(0, 1000)
    cy.wait(200)
    cy.get('[data-cy="target"]').should('have.text', 'Visible')
  })

  /* Handles the threshold value */

  it('accounts for the threshold value if provided', () => {
    // The intersection will only fire if the target is 100% visible
    cy.mount(
      <>
        <div style={{ height: 1500 }} />
        <TestComponent height={false} threshold={1} />
        <div style={{ height: 1500 }} />
      </>
    )
    //Scroll to partial item
    cy.wait(200)
    cy.scrollTo(0, 1100)
    cy.get('[data-cy="target"]').should('have.text', 'Not visible')
    // Scroll past the item
    cy.wait(200)
    cy.scrollTo(0, 1500)
    cy.get('[data-cy="target"]').should('have.text', 'Not visible')
    // Scroll back to the item
    cy.scrollTo(0, 1300)
    cy.wait(200)
    cy.get('[data-cy="target"]').should('have.text', 'Visible')
  })

  /* Invokes callback when target is visible */

  it('calls the onIntersect callback when the target is visible', () => {
    const onIntersect = cy.stub()
    cy.mount(
      <>
        <div style={{ height: 300 }} />
        <TestComponent onIntersect={onIntersect} />
      </>
    )
    cy.wait(200)
    cy.get('[data-cy="target"]').should('have.text', 'Visible')
    cy.wrap(onIntersect).should('have.been.calledOnce')
    cy.wrap(onIntersect).should('have.been.calledWith', true)
  })
})
