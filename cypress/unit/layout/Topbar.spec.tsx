/// <reference types="cypress" />

import * as React from 'react'
import { Topbar } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper, defaults, format } from '../setup'

describe('Topbar component', () => {
  it('renders the Topbar component with default props', () => {
    mount(
      <Wrapper>
        <Topbar>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar').should('have.backgroundColor', 'var(--color-bg_topbar)')
    cy.get('#topbar .container').should(
      'have.css',
      'max-width',
      format(defaults.topbar.maxWidth)
    )
  })

  it('renders with user-generated options', () => {
    mount(
      <Wrapper
        options={{
          colors: { light: { bg_topbar: '#e5e1e8' } },
          topbar: { maxWidth: 600 },
        }}>
        <Topbar>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar').should('have.backgroundColor', '#e5e1e8')
    cy.get('#topbar .container').should('have.css', 'max-width', '600px')
  })

  it('applies sticky styles according to options', () => {
    mount(
      <Wrapper options={{ topbar: { sticky: true, stickyOnMobile: false } }}>
        <Topbar>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar').should('have.css', 'position', 'sticky')
    cy.viewport('iphone-x')
      .get('#topbar')
      .should('have.css', 'position', 'relative')
  })

  it('applies sticky styles according to props', () => {
    mount(
      <Wrapper>
        <Topbar stickyOnMobile>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar').should('have.css', 'position', 'relative')
    cy.viewport('iphone-x')
      .get('#topbar')
      .should('have.css', 'position', 'sticky')
  })

  it('sets the scrollOverlow prop', () => {
    mount(
      <Wrapper>
        <Topbar scrollOverflow>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar .container').should('have.css', 'overflow-x', 'scroll')
    cy.get('#topbar .container').should('have.css', 'white-space', 'nowrap')
  })

  it('applies _css to root and css to the container', () => {
    mount(
      <Wrapper>
        <Topbar _css={{ margin: 10 }} css={{ padding: 20 }}>
          topbar
        </Topbar>
      </Wrapper>
    )

    cy.get('#topbar').should('have.css', 'margin', '10px')
    cy.get('#topbar .container').should('have.css', 'padding', '20px')
  })
})
