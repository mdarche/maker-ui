import * as React from 'react'
import { Layout, Div } from 'maker-ui'
import { mount } from '@cypress/react'

describe('Layout component', () => {
  it('mounts the Layout component', () => {
    mount(<Layout options={{}}>content</Layout>)
    cy.contains('content')
  })

  it('renders skiplinks according to MakerUIOptions', () => {
    mount(<Layout options={{}}>First layout</Layout>)
    cy.get('.skiplinks')
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
    cy.contains('Skip to test content')
  })

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

  it('adds an Emotion theme provider to the layout', () => {
    mount(
      <Layout options={{}} theme={{ width: 100 }}>
        <Div css={{ ...({ width: t => t.width } as object) }}>test</Div>
      </Layout>
    )
    cy.contains('test').should('have.css', 'width', '100px')
  })
})
