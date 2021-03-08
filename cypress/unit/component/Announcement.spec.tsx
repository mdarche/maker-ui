import * as React from 'react'
import { Announcement } from '@maker-ui/components'
import { mount } from '@cypress/react'

import { Wrapper } from '../setup'

// cy.clearLocalStorage()

describe('Announcement component', () => {
  it('renders with the default props', () => {
    mount(
      <Wrapper>
        <Announcement />
      </Wrapper>
    )
    cy.get('.announcement')
  })

  it('renders a custom close button inner string or component', () => {
    mount(
      <Wrapper>
        <Announcement background="red" />
      </Wrapper>
    )
    // cy.get('.announcement').contains('Close Me')
  })

  it('applies _css to root and css to the container', () => {
    mount(
      <Wrapper footer>
        <Announcement css={{ margin: 10 }} _css={{ padding: 20 }} />
      </Wrapper>
    )
    cy.get('.announcement').should('have.css', 'padding', '20px')
    cy.get('.container').should('have.css', 'margin', '10px')
  })
})
