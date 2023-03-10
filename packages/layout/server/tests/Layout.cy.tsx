import { useState } from 'react'
import { Div } from '@maker-ui/primitives'
import { Layout, type MakerUIOptions } from '@maker-ui/layout'
import { Wrapper, defaultOptions } from './setup'

/**
 * @component
 * Layout
 *
 * @tests
 * - Renders with defaults
 * - Option: `a11y.skiplinks`
 * - Option: `variables`
 * - Option: `useColorDefaults`
 * - Prop: `skiplinks`
 * - Prop: `styles`
 * - Prop: `theme`
 * - Behavior: re-renders layout when options prop changes
 */

describe('Layout', () => {
  /* Renders with defaults */

  it('mounts the Layout component', () => {
    cy.mount(<Layout options={{}}>content</Layout>)
    cy.contains('content')
  })

  /* Option: `a11y.skiplinks` */

  it('renders skiplinks according to MakerUIOptions', () => {
    cy.mount(<Layout options={{}}>First layout</Layout>)
    cy.get('.skiplinks')
    cy.mount(
      <Layout options={{ a11y: { skiplinks: false } }}>Second layout</Layout>
    )
    cy.get('.skiplinks').should('not.exist')
  })

  /* Option: `variables` */

  it('supports custom css variables via `options.variables`', () => {
    cy.mount(
      <Layout options={{ variables: { height: 200 } }}>
        <Div id="test-div" css={{ height: 'var(--height)' }}>
          test
        </Div>
      </Layout>
    )
    cy.get('#test-div').should('have.css', 'height', '200px')
  })

  /* Option: `useColorDefaults` */

  it('removes the default Maker UI css colors via `options.useDefaultColors`', () => {
    // Default behavior
    cy.mount(
      <Layout options={{}}>
        <Div id="test-div" css={{ backgroundColor: 'var(--color-text)' }}>
          test
        </Div>
      </Layout>
    )
    cy.get('#test-div').should(
      'have.backgroundColor',
      // @ts-ignore
      defaultOptions.colors.light.text
    )
    // Modified behavior with useDefaultColors
    cy.mount(
      <Layout options={{ useColorDefaults: false }}>
        <Div id="next-div" css={{ backgroundColor: 'var(--color-text)' }}>
          test
        </Div>
      </Layout>
    )
    cy.get('#next-div').should(
      'not.have.css',
      'backgroundColor',
      // @ts-ignore
      defaultOptions.colors.light.text
    )
  })

  /* Prop: `skiplinks` */

  it('renders custom skiplinks via `skiplinks` prop', () => {
    cy.mount(
      <Layout
        options={{}}
        skiplinks={[{ id: 'test', label: 'Skip to test content' }]}>
        First layout
      </Layout>
    )
    cy.contains('Skip to test content')
  })

  /* Prop: `styles` */

  it('adds user styles to the document head', () => {
    cy.mount(
      <Layout
        options={{}}
        styles={{ '.my-div': { color: 'rgb(251, 251, 251)' } }}>
        <div className="my-div">test</div>
      </Layout>
    )
    cy.get('.my-div').should('have.css', 'color', 'rgb(251, 251, 251)')
  })

  /* Prop: `theme` */

  it('adds an Emotion theme provider to the layout', () => {
    cy.mount(
      <Layout options={{}} theme={{ width: 100 }}>
        <Div css={{ ...({ width: (t) => t.width } as object) }}>test</Div>
      </Layout>
    )
    cy.contains('test').should('have.css', 'width', '100px')
  })

  /* Behavior: re-renders layout when options prop changes */

  it.only('updates Layout and Options context when `options` prop changes', () => {
    const DynamicLayout = () => {
      const [opts, setOpts] = useState({})

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

    cy.mount(<DynamicLayout />)
    cy.get('#options-1').click()
    cy.get('body').should('have.backgroundColor', '#dedede')
    cy.get('.nav-grid').should(
      'have.css',
      'grid-template-areas',
      '"logo menu widgets"'
    )
    cy.get('#options-2').click()
    cy.get('body').should('have.backgroundColor', '#1fbec7')
    cy.get('.nav-grid').should(
      'have.css',
      'grid-template-areas',
      '"menu logo widgets"'
    )
    cy.get('#options-3').click()
    cy.get('body').should('have.backgroundColor', '#611fc7')
    cy.get('.nav-grid').should(
      'have.css',
      'grid-template-areas',
      '"logo widgets"'
    )
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
