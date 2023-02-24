import * as React from 'react'
import { Portal } from '../src'

/**
 * @component
 * Portal
 *
 * @tests
 * - Render with defaults
 * - Prop: `root`
 */

describe('Portal (internal)', () => {
  /* Render with defaults */

  it('attaches to the body element by default', () => {
    cy.mount(
      <div>
        <div>Test content</div>
        <Portal>
          <div>Portal Content</div>
        </Portal>
      </div>
    )
    cy.get('body div').last().contains('Portal Content')
  })

  /* Prop: `root` */

  it('attaches to a specified DOM node using ID selector', () => {
    cy.mount(
      <div>
        <div>Test content</div>
        <Portal root="cy-root">
          <div>Portal Content</div>
        </Portal>
      </div>
    )
    cy.get('[data-cy-root] div')
      .first()
      .contains('Portal Content', { timeout: 10000 })
  })
})
