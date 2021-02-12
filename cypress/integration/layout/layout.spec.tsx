/// <reference types="cypress" />

import * as React from 'react'
import { Layout } from 'maker-ui'
import { mount } from '@cypress/react'

describe('Layout component', () => {
  it('renders Layout component', () => {
    // cy.visit('http://localhost:3000')
    // cy.viewport('iphone-x')
    mount(<Layout options={{}}>content</Layout>)
    cy.contains('content')
  })
})
