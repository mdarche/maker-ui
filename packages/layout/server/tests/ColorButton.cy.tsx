import { ColorButton } from '@maker-ui/layout'
import { Wrapper } from './setup'

/**
 * @component
 * ColorButton
 *
 * @tests
 * - Renders with defaults
 * - Prop: `customButton` (string)
 * - Prop: `customButton` (callback)
 * - Behavior: cycles through color modes `onClick
 * - Behavior: does not render unless multiple color modes exist
 *
 * @notes
 * See `Navbar.cy.tsx` for integration tests relating to `options.header`
 */

describe('ColorButton component', () => {
  /* Renders with defaults */

  it('renders with default props', () => {
    cy.mount(
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

  /* Prop: `customButton` (string) */

  it('supports a custom button inner via props', () => {
    cy.mount(
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
    cy.mount(
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

  /* Prop: `customButton` (callback) */

  it('supports a custom button via prop callback', () => {
    cy.mount(
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

  /* Behavior: cycles through color modes `onClick`*/

  it('cycles through color modes onClick', () => {
    cy.mount(
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

  /* Behavior: does not render unless multiple color modes exist */

  it('does not render when MakerUIOptions only specify one mode or default colors', () => {
    cy.mount(
      <Wrapper>
        <ColorButton />
      </Wrapper>
    )
    cy.get('.color-button').should('not.exist')
  })
})
