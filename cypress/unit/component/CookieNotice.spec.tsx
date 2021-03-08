import * as React from 'react'
import { CookieNotice } from '@maker-ui/components'
import { mount } from '@cypress/react'

import { Wrapper } from '../setup'

// cy.clearLocalStorage()

describe('CookieNotice component', () => {
  it('renders with the default props', () => {
    mount(
      <Wrapper>
        <CookieNotice />
      </Wrapper>
    )
    cy.get('.announcement')
  })

  // it('renders a custom close button inner string or component', () => {
  //   mount(
  //     <Wrapper>
  //       <CookieNotice background="red" />
  //     </Wrapper>
  //   )
  //   // cy.get('.announcement').contains('Close Me')
  // })

  it('applies _css to root and css to the container', () => {
    mount(
      <Wrapper header content footer>
        <CookieNotice css={{ margin: 10 }} _css={{ padding: 20 }} />
      </Wrapper>
    )
    cy.get('.cookie-notice').should('have.css', 'padding', '20px')
    cy.get('.container').should('have.css', 'margin', '10px')
  })
})
