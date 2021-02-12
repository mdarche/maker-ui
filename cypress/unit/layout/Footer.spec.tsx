/// <reference types="cypress" />

import * as React from 'react'
import { Footer } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper } from '../setup'

describe('Footer component', () => {
  it('renders the footer component with default props', () => {
    mount(
      <Wrapper header content>
        <Footer>footer</Footer>
      </Wrapper>
    )

    cy.get('footer').should('exist')
    cy.get('footer').should('have.backgroundColor', 'var(--color-bg_footer)')
  })
})
