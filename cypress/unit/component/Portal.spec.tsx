import * as React from 'react'
import { Portal } from '@maker-ui/components/src/components/Portal'
import { mount } from '@cypress/react'

describe('Partal component (internal)', () => {
  it('attaches to the body element by default', () => {
    mount(
      <div>
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

  it.only('attaches to a specified DOM node using ID selector', () => {
    mount(
      <div>
        <div>
          <Portal root="cypress-root">
            <div>Portal Content</div>
          </Portal>
        </div>
      </div>
    )
    cy.get('#cypress-root div')
      .first()
      .contains('Portal Content')
  })
})
