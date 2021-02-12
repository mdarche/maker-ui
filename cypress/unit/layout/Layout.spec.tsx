/// <reference types="cypress" />

import * as React from 'react'
import { Layout } from 'maker-ui'
import { mount } from '@cypress/react'

describe('Layout component', () => {
  // Exists
  it('mounts the Layout component', () => {
    mount(<Layout options={{}}>content</Layout>)
    cy.contains('content').should('exist')
  })

  // Skiplinks
  it('renders skiplinks according to MakerUIOptions', () => {
    // Default option
    mount(<Layout options={{}}>First layout</Layout>)
    cy.get('.skiplinks').should('exist')
    // Set skiplinks to false
    mount(
      <Layout options={{ a11y: { skiplinks: false } }}>Second layout</Layout>
    )
    cy.get('.skiplinks').should('not.exist')
  })

  it('renders custom skiplinks according to props', () => {
    mount(
      <Layout
        options={{}}
        skiplinks={[{ id: 'test', label: 'Skip to test content' }]}>
        First layout
      </Layout>
    )
    cy.contains('Skip to test content').should('exist')
  })

  // Styles prop
  it('adds user styles to the document head', () => {
    mount(
      <Layout
        options={{}}
        styles={{ '.my-div': { color: 'rgb(251, 251, 251)' } }}>
        <div className="my-div">test</div>
      </Layout>
    )
    cy.get('.my-div').should('have.css', 'color', 'rgb(251, 251, 251)')
  })
})
