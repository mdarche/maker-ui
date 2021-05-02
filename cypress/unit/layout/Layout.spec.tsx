import * as React from 'react'
import { Layout, Div, MakerUIOptions } from 'maker-ui'
import { mount } from '@cypress/react'

import { defaultOptions } from '../options'
import { Wrapper } from '../setup'

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

  it('renders custom skiplinks via `skiplinks` prop', () => {
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

  it('supports custom css variables via `options.variables`', () => {
    mount(
      <Layout options={{ variables: { height: 200 } }}>
        <Div id="test-div" css={{ height: 'var(--height)' }}>
          test
        </Div>
      </Layout>
    )
    cy.get('#test-div').should('have.css', 'height', '200px')
  })

  it('removes the default Maker UI css colors via `options.useDefaultColors`', () => {
    // Default behavior
    mount(
      <Layout options={{}}>
        <Div id="test-div" css={{ backgroundColor: 'var(--color-text)' }}>
          test
        </Div>
      </Layout>
    )
    cy.get('#test-div').should(
      'have.backgroundColor',
      defaultOptions.colors.light.text
    )
    // Modified behavior with useDefaultColors
    mount(
      <Layout options={{ useColorDefaults: false }}>
        <Div id="next-div" css={{ backgroundColor: 'var(--color-text)' }}>
          test
        </Div>
      </Layout>
    )
    cy.get('#next-div').should(
      'not.have.css',
      'backgroundColor',
      defaultOptions.colors.light.text
    )
  })

  it('updates Layout and Options context when `options` prop changes', () => {
    const DynamicLayout = () => {
      const [opts, setOpts] = React.useState({})

      return (
        <Wrapper header isContent footer options={opts}>
          <button id="options-1" onClick={() => setOpts(opt1)}>
            Options 1
          </button>
          <button id="options-2" onClick={() => setOpts(opt2)}>
            Options 2
          </button>
          <button id="options-3" onClick={() => setOpts(opt3)}>
            Options 3
          </button>
        </Wrapper>
      )
    }

    mount(<DynamicLayout />)
    cy.get('#options-1').click()
    cy.get('body').should('have.backgroundColor', '#dedede')
    cy.get('.nav-grid').should(
      'have.css',
      'grid-template-areas',
      '"logo menu nav"'
    )
    cy.get('#options-2').click()
    cy.get('body').should('have.backgroundColor', '#1fbec7')
    cy.get('.nav-grid').should(
      'have.css',
      'grid-template-areas',
      '"menu logo nav"'
    )
    cy.get('#options-3').click()
    cy.get('body').should('have.backgroundColor', '#611fc7')
    cy.get('.nav-grid').should('have.css', 'grid-template-areas', '"logo nav"')
  })
})

const opt1: MakerUIOptions = {
  header: {
    navType: 'basic-center',
    mobileNavType: 'logo-center',
  },
  colors: {
    light: {
      background: '#dedede',
    },
  },
}

const opt2: MakerUIOptions = {
  header: {
    navType: 'reverse',
    mobileNavType: 'basic-menu-left',
  },
  colors: {
    light: {
      background: '#1fbec7',
    },
  },
}

const opt3: MakerUIOptions = {
  header: {
    navType: 'minimal',
    mobileNavType: 'logo-center-alt',
  },
  colors: {
    light: {
      background: '#611fc7',
    },
  },
}
