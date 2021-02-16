import * as React from 'react'
import { ColorButton } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper } from '../setup'

/**
 * See Navbar.spec.tsx for integration tests relating to options.header
 */

describe('ColorButton component', () => {
  it('renders with default props', () => {
    mount(
      <Wrapper
        options={{
          colors: {
            light: { background: '#e2e2e2' },
            dark: { background: '#333' },
          },
        }}>
        <ColorButton />
      </Wrapper>
    )
    cy.get('.color-button')
  })

  it('cycles through color modes onClick', () => {
    mount(
      <Wrapper
        options={{
          colors: {
            light: { background: '#e2e2e2' },
            dark: { background: '#333' },
            gray: { background: '#777' },
          },
        }}>
        <ColorButton />
      </Wrapper>
    )
    cy.get('body').should('have.backgroundColor', '#e2e2e2')
    cy.contains('light').click()
    cy.get('body').should('have.backgroundColor', '#333')
    cy.contains('dark').click()
    cy.get('body').should('have.backgroundColor', '#777')
    cy.contains('gray').click()
    cy.get('body').should('have.backgroundColor', '#e2e2e2')
  })

  it('supports a custom button inner via props', () => {
    mount(
      <Wrapper
        options={{
          colors: {
            light: { background: '#e2e2e2' },
            dark: { background: '#333' },
          },
        }}>
        <ColorButton customButton="Change Color" />
      </Wrapper>
    )
    cy.contains('Change Color').click()
    cy.get('body').should('have.backgroundColor', '#333')
    mount(
      <Wrapper
        options={{
          colors: {
            light: { background: '#e2e2e2' },
            dark: { background: '#333' },
          },
        }}>
        <ColorButton customButton={<div>Test-btn</div>} />
      </Wrapper>
    )
    cy.contains('Test-btn')
  })

  it('supports a custom button via prop callback', () => {
    mount(
      <Wrapper
        options={{
          colors: {
            light: { background: '#e2e2e2' },
            dark: { background: '#333' },
            gray: { background: '#777' },
          },
        }}>
        <ColorButton
          customButton={(mode, atts) => (
            <button {...atts}>{mode}-button</button>
          )}
        />
      </Wrapper>
    )
    cy.contains('light-button').click()
    cy.get('body').should('have.backgroundColor', '#333')
    cy.contains('dark-button')
  })

  it('does not render when MakerUIOptions only specify one mode or default colors', () => {
    mount(
      <Wrapper>
        <ColorButton />
      </Wrapper>
    )
    cy.get('.color-button').should('not.exist')
  })
})
