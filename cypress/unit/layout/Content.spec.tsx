import * as React from 'react'
import { Content, Main } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper } from '../setup'

describe('Content component', () => {
  it('renders the Content component', () => {
    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
        </Content>
      </Wrapper>
    )
    cy.get('#site-inner')
  })

  it('shows a helpful error boundary when layout is unknown', () => {
    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
          <div>unregistered child</div>
        </Content>
      </Wrapper>
    )
    cy.contains('Invalid layout configuration')
  })

  it('shows a helpful error boundary when layout is an incorrect type', () => {
    mount(
      <Wrapper>
        <Content>string value</Content>
      </Wrapper>
    )
    cy.contains('Invalid layout configuration')
  })

  // it('renders with prop values', () => {
  //   mount(
  //     <Wrapper>
  //       <Main className="main-test" background="#000" css={{ padding: 5 }}>
  //         content
  //       </Main>
  //     </Wrapper>
  //   )
  //   cy.get('main').should('have.backgroundColor', '#000')
  //   cy.get('main').should('have.css', 'padding', '5px')
  //   cy.get('main').should('have.class', 'main-test')
  // })
})
