import * as React from 'react'
import { ColorButton, Layout } from '../src'
import { LayoutWrapper } from './setup'

/**
 * @component
 * ColorButton
 *
 * @tests
 * - Renders with defaults
 * - Prop: `children` (string)
 * - Prop: `renderProps` (callback)
 * - Behavior: cycles through color modes `onClick`
 * - Behavior: does not render unless multiple color modes exist
 *
 * @notes
 * See `Navbar.cy.tsx` for integration tests relating to `options.header`
 */

describe('ColorButton component', () => {
  /* Renders with defaults */

  it('renders with default props', () => {
    cy.mount(
      <LayoutWrapper
        options={{
          colorThemes: ['light', 'dark', 'system'],
        }}>
        <Layout.Main>
          <ColorButton />
        </Layout.Main>
      </LayoutWrapper>
    )
    cy.get('.color-button')
  })

  /* Prop: `children` */

  it('supports a custom button inner via children', () => {
    cy.mount(
      <LayoutWrapper
        options={{
          colorThemes: ['light', 'dark', 'system'],
        }}>
        <Layout.Main>
          <ColorButton>Change Color</ColorButton>
        </Layout.Main>
      </LayoutWrapper>
    )
    cy.contains('Change Color').click()
    cy.get('body').should('have.backgroundColor', '#333')
    cy.mount(
      <LayoutWrapper
        options={{
          colorThemes: ['light', 'dark', 'system'],
        }}>
        <ColorButton>
          <div>Test-btn</div>
        </ColorButton>
      </LayoutWrapper>
    )
    cy.contains('Test-btn')
  })

  /* Prop: `customButton` (callback) */

  it('supports a custom button via prop callback', () => {
    cy.mount(
      <LayoutWrapper
        options={{
          colorThemes: ['light', 'dark', 'system'],
        }}>
        <Layout.Main>
          <ColorButton
            renderProps={(mode, atts) => (
              <button {...atts}>{mode}-button</button>
            )}
          />
        </Layout.Main>
      </LayoutWrapper>
    )
    cy.contains('light-button').click()
    cy.get('body').should('have.backgroundColor', '#333')
    cy.contains('dark-button')
  })

  /* Behavior: cycles through color modes `onClick`*/

  it('cycles through color modes onClick', () => {
    cy.mount(
      <LayoutWrapper
        options={{
          colorThemes: ['light', 'dark', 'system'],
        }}>
        <Layout.Main>
          <ColorButton />
        </Layout.Main>
      </LayoutWrapper>
    )
    cy.get('body').should('have.backgroundColor', '#e2e2e2')
    cy.contains('light').click()
    cy.get('body').should('have.backgroundColor', '#333')
    cy.contains('dark').click()
    cy.get('body').should('have.backgroundColor', '#777')
    cy.contains('gray').click()
    cy.get('body').should('have.backgroundColor', '#e2e2e2')
  })

  /* Behavior: does not render unless multiple color modes exist */

  it('does not render when themes are not present', () => {
    cy.mount(
      <LayoutWrapper>
        <Layout.Main>
          <ColorButton />
        </Layout.Main>
      </LayoutWrapper>
    )
    cy.get('button').should('not.exist')
  })
})
