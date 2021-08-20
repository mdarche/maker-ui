import * as React from 'react'
import { Portal } from '@maker-ui/elements'
import { mount } from '@cypress/react'

describe('Portal component (internal)', () => {
  it('attaches to the body element by default', () => {
    mount(
      <div>
        <div id="test-div"></div>
        <div>
          <Portal>
            <div>Portal Content</div>
          </Portal>
        </div>
      </div>
    )
    cy.get('body div')
      .last()
      .contains('Portal Content')
  })

  // If this ever breaks, check to see if the root ID for Cypress has changed
  it('attaches to a specified DOM node using ID selector', () => {
    mount(
      <div>
        <div>
          <Portal root="__cy_root">
            <div>Portal Content</div>
          </Portal>
        </div>
      </div>
    )
    cy.get('#__cy_root div')
      .first()
      .contains('Portal Content', { timeout: 10000 })
  })
})
